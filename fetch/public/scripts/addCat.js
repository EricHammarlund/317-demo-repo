document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener("submit", (event) => {
        // typically do not want default form behavior; therefore we suppress this behavior
        event.preventDefault();

        const name =  document.getElementById('name').value;
        const color =  document.getElementById('color').value;
        const human =  document.getElementById('human').value;
        const image =  document.getElementById('image-url').value;

        fetch('/api/cats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                { name, color, human, image}
                /* same as:
                {
                    name: name,
                    color: color,
                    human: human,
                    image: image
                }*/
            ),
        }).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            window.location.href = `/cats/${data.id}`;
        }).catch(error => {
            console.error('error:', error);
        }) 

    });
});