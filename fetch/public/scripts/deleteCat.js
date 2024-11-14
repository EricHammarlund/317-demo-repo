document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    const buttons = container.querySelectorAll('button');

    for (let button of buttons) {
        button.addEventListener("click", (event) => {
            let catId = button.id.split("-")[1]; // split after "-" and take second element (index 1)
            console.log(catId);

            fetch(
                `/api/cats/${catId}`, // backticks to embed variable
                {
                    method: 'DELETE'
                }
            ).then(response => {
                return response.json();
            }).then(data => {
                console.log(data);
                window.location.reload();
            }).catch(error => {
                console.error('error:', error);
            }) 
        });
    }

});