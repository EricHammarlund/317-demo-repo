document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const buttons = container.querySelectorAll('button');
    for (let button of buttons) {
        button.addEventListener('click', function(event) {
            let catId = button.id.split("-")[1];
            fetch(`/api/cats/${catId}`, {
                method: 'DELETE',
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .catch(error => {
                console.error('error:', error);
            });

        });
    }
});