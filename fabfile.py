#!/usr/bin/python3
'''contains functions for deploying the api
to run the script or function:
    "fab -H hostname -u username function"
replace the hostname and username with the your machine's hostname and your
username and replace function with any of the functions within
'''


from fabric.api import local, run, sudo, env, put, cd, prefix
from datetime import datetime


def create_archive():
    '''create a tar archive of all files in the api and models directory'''
    current_time = datetime.utcnow().strftime("%Y_%m_%d_%H-%M-%S")
    archive_name1 = 'api_files_{}.tar.gz'.format(current_time)
    archive_name2 = 'models_files_{}.tar.gz'.format(current_time)
    archive_dir = 'api_versions'

    local("mkdir -p {}".format(archive_dir))  # create achive directory
    print("Starting the archiving process at: {}".format(current_time))

    api_files = local("tar -czvf {}/{} -C api .".format(archive_dir,
                      archive_name1))
    models_files = local("tar -czvf {}/{} -C models .".format(archive_dir,
                         archive_name2))
    if api_files.succeeded and models_files.succeeded:
        print("Archive created successfully in {}".format(archive_dir))
        api = '{}/{}'.format(archive_dir, archive_name1)
        models = '{}/{}'.format(archive_dir, archive_name2)
        return [api, models]


def copy_and_unpack_archive():
    '''copy the archive files to the remote machine and unpack it'''
    api_path, models_path = create_archive()
    run("mkdir -p cms_api/api cms_api/models")

    archive_name1 = api_path.split('/')[-1]
    archive_name2 = models_path.split('/')[-1]

    remote_archive_path1 = "cms_api/api/{}".format(archive_name1)
    remote_archive_path2 = "cms_api/api/{}".format(archive_name2)

    send1 = put(api_path, remote_archive_path1)
    send2 = put(models_path, remote_archive_path2)
    if send1.succeeded and send2.succeeded:
        print("Archive files copied to the remote machine")

    # Unpack the archive on the remote machine
    unpack1 = run("tar -xzvf {} -C cms_api/api".
                  format(remote_archive_path1))
    unpack2 = run("tar -xzvf {} -C cms_api/models".
                  format(remote_archive_path2))
    if unpack1.succeeded and unpack2.succeeded:
        print("Archives unpacked successfully on the remote machine")
        run("rm {} {}".format(remote_archive_path1, remote_archive_path2))


def install_dependencies():
    '''install dependencies required to run the Flask API
    if not already installed'''
    required_packages = ['sqlalchemy', 'mysqlclient', 'flask', 'flask_cors',
                         'gunicorn']
    for package in required_packages:
        # Check if the package is already installed
        check = run("pip show {} | grep Version".format(package),
                    warn_only=True)
        if check.failed:
            print("{} is not installed. Installing...".format(package))
            if package is "mysqlclient":
                run("sudo apt-get install -y libmysqlclient-dev")
            run("pip install {}".format(package))
        else:
            print("{} is already installed.".format(package))


def set_up_remote_db():
    '''sets up CMS_DB for the project'''
    put("cms_db_user_setup.sql", "cms_api/cms_db_user_setup.sql")
    with cd("cms_api"):
        set_up = run("sudo mysql --user=root -h {} < cms_db_user_setup.sql".
                     format(env.CMS_MYSQL_HOST))
        if set_up.succeeded:
            print("CMS DATABASE SET UP COMPLETED")


def deploy_api():
    '''starts flask api'''
    copy_and_unpack_archive()
    install_dependencies()
    upload_service_script()


def upload_service_script():
    '''sends the flask_api service script to the server'''
    put('flask-api.service', '/etc/systemd/system/flask-api.service',
        use_sudo=True)
    sudo('systemctl enable flask-api.service')
    sudo('systemctl start flask-api.service')