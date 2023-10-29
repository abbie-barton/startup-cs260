const displayAccountInfo = () => {
    const accountUser = document.getElementById('display-user');
    const accountDescription = document.getElementById('display-description');

    document.addEventListener('DOMContentLoaded', () => {
        if (localStorage.getItem('userDescription')) {
            accountUser.textContent = localStorage.getItem('userName');
            accountDescription.textContent = localStorage.getItem('userDescription')
        } else {
            accountUser.textContent = localStorage.getItem('userName');
        }
    })
}

const updateAccountInfo = () => {
    const titleField = document.getElementById('update-name');
    const descriptionField = document.getElementById('update-title');
    const accountUser = document.getElementById('display-user');
    const accountDescription = document.getElementById('display-description');
    if (titleField.value && descriptionField.value) {
        localStorage.setItem('userName', titleField.value);
        localStorage.setItem('userDescription', descriptionField.value);
        accountUser.textContent = localStorage.getItem('userName');
        accountDescription.textContent = localStorage.getItem('userDescription')
    }
    location.reload();
}

displayAccountInfo();