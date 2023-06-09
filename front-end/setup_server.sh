#!/bin/bash
# Sets up your web servers for the deployment

# Install nginx
apt update
apt -y install nginx

# Create Project directories
mkdir -p /data/cms/releases/test/

# create initial page for test
cat << EOF | tee /data/cms/releases/test/index.html
<html>
  <head>
  </head>
  <body>
    Welcome to Clear My Space.
  </body>
</html>
EOF

# create a symlink to test dir
ln -sf /data/cms/releases/test/ /data/cms/current

# manage permissions
chown -R ${USER}:${USER} /data/cms/