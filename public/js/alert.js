function showAlert(message, callback) {
    const alert = document.createElement('div');
    alert.setAttribute('role', 'alert');
    alert.className = `alert w-auto fixed bottom-5 mx-3 z-50`;
    alert.innerHTML = `
            <i class="fa-duotone fa-circle-exclamation"></i>
            <span>${message}</span>
            <div>
                <button class="btn btn-sm btn-primary confirm-btn">Yes</button>
                <button class="btn btn-sm cancel-btn">No</button>
            </div>
            `;

    document.body.appendChild(alert);

    alert.querySelector('.confirm-btn').addEventListener('click', () => {
        callback(true);
        document.body.removeChild(alert);
    });
    alert.querySelector('.cancel-btn').addEventListener('click', () => {
        callback(false);
        document.body.removeChild(alert);
    });
}

function alertSuccess(message) {
    const alert = document.createElement('div');
    alert.setAttribute('role', 'alert');
    alert.className = `alert alert-success w-auto fixed bottom-5 mx-3 z-50`;
    alert.innerHTML = `
            <i class="fa-duotone fa-circle-check"></i>
            <span>${message}</span>
            `;
    document.body.appendChild(alert);
    setTimeout(() => {
        document.body.removeChild(alert);
    }, 5000);
}

function alertError(message) {
    const alert = document.createElement('div');
    alert.setAttribute('role', 'alert');
    alert.className = `alert alert-error w-auto fixed bottom-5 mx-3 z-50`;
    alert.innerHTML = `
            <i class="fa-duotone fa-circle-xmark"></i>
            <span>${message}</span>
            `;
    document.body.appendChild(alert);
    setTimeout(() => {
        document.body.removeChild(alert);
    }, 5000);
}
