const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const name = document.querySelector('#name-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
  
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        name,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/blog');
    } else {
      alert(response.statusText);
    }
  
  };
  //handle signup form
  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  //check if feilds are full before sending them back
    if (name !== '' && email !== '' && password !== '') {
      const response = await fetch('/api/users/', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  //go to /blog on login
      if (response.ok) {
        document.location.replace('/blog');
      } else {
        alert(response.statusText);
      }
    }
  };
  //button functionality
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
    document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  });