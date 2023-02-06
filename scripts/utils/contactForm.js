const form = document.getElementById('form');

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

// fonction submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let form_data = new FormData(e.target);
    console.log(form_data.get('first'), '\n', form_data.get('last'), '\n', form_data.get('email'), '\n', form_data.get('message'))
});
