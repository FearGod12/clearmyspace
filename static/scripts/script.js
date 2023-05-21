$(document).ready(function() {
    // Login Form Submit
    $('#login-form').submit(function(event) {
      event.preventDefault();
      
      var username = $('#login-form input[name="username"]').val();
      var password = $('#login-form input[name="password"]').val();
      
      $.get('http://0.0.0.0:5000/api/users', function(data) {
        var user = data.find(function(user) {
          return user.username === username && user.password === password;
        });
        
        if (user) {
          // User found, redirect to home page or perform necessary actions
          alert('Login Successful');
          // Redirect to home page or perform necessary actions
        } else {
          alert('User not found');
        }
      });
    });
    
    // Create Account Form Submit
    $('#create-account-form').submit(function(event) {
      event.preventDefault();
      
      var firstName = $('#create-account-form input[name="firstName"]').val();
      var lastName = $('#create-account-form input[name="lastName"]').val();
      var username = $('#create-account-form input[name="username"]').val();
      var email = $('#create-account-form input[name="email"]').val();
      var password = $('#create-account-form input[name="password"]').val();
      
      var userData = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password
      };
      
      $.post('http://0.0.0.0:5000/api/users', userData, function(response) {
        alert('Account created successfully');
        // Redirect to home page or perform necessary actions
      });
    });
  });