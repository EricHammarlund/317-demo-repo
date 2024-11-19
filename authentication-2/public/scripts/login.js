document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('#createAccount');
    button.addEventListener('click', function(event) {
        const user = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch(`/auth/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password}),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('error:', error);
        });

    });


    const form = document.querySelector('#loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const user = document.getElementById('username').value;
        const password = document.getElementById('password').value;
       
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password}),
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('error:', error);
        });

    });
});