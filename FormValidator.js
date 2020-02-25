const validate = (argument) => {
    let errors = document.querySelectorAll('[data-error]');
    console.log(errors);
    let form = document.querySelector("[data-validate='form']");
    let username = document.querySelector("[data-validate='username']");
    let email = document.querySelector("[data-validate='email']");
    let password = document.querySelector("[data-validate='password']");
    form.addEventListener('input', () => {
        if (username) {
            if (username.value.length < argument.usernameMinLength || username.value.length > argument.usernameMaxLength) {
                errors.forEach(error => {
                    // console.log(error.getAttribute('data-error'));
                    if (error.getAttribute('data-error') == 'username') {
                        error.innerText = `Username has to be between ${argument.usernameMinLength} and ${argument.usernameMaxLength} characters long`;
                    }
                });
            } else {
                errors.forEach(error => {
                    // console.log(error.getAttribute('data-error'));
                    if (error.getAttribute('data-error') == 'username') {
                        error.innerText = '';
                    }
                });
            }
        }
        
        if (email) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
                errors.forEach(error => {
                    // console.log(error.getAttribute('data-error'));
                    if (error.getAttribute('data-error') == 'email') {
                        error.innerText = `Please enter a valid E-Mail`;
                    }
                });
            } else {
                errors.forEach(error => {
                    // console.log(error.getAttribute('data-error'));
                    if (error.getAttribute('data-error') == 'email') {
                        error.innerText = '';
                    }
                });
            }
        }
        
        // TODO: Add validator for password
    });
}

validate(5, 64);