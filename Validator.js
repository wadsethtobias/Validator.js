/**
 * * Deep Merging taken from https://stackoverflow.com/a/34749873
 * To be able to merge nested objects
 */

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
  
  /**
   * Deep merge two objects.
   * @param target
   * @param ...sources
   */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();
  
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
  
    return mergeDeep(target, ...sources);
}

//* End Deep Merging code

/**
 * Form Validation
 * TODO: Password confirmation, Refactoring, Documentation
 * @param {Object} obj 
 */

const validate = (obj) => {

    'use strict';

    const DEFAULT = {
        username: {
            minLength: 5,
            maxLength: 32
        },
        password: {
            minLength: 8,
            include: ['lowercase', 'uppercase', 'number', 'special', 'length']
        },
        errors: {
            qualifications: 'show',
            errors: 'show',
            messages: {
                username: 'Username has to be between %minLength and %maxLength characters long',
                email: 'Please enter a valid E-Mail address',
                password: {
                    title: 'The password must:',
                    lowercase: 'Contain a lowercase letter',
                    uppercase: 'Contain an uppercase letter',
                    number: 'Contain a number',
                    special: 'Contain a special character',
                    length: 'Be at least %minLength characters long'
                }
            }
        }
    };

    let parameter = obj;

    const argument = mergeDeep(DEFAULT, parameter);

    const passwordParameters = (param) => {
        if (param === 'lowercase') {
            if (/[a-z]/.test(password.value.replace(/ /g, ''))) {
                return true;
            }
        }
        if (param === 'uppercase') {
            if (/[A-Z]/.test(password.value.replace(/ /g, ''))) {
                return true;
            }
        }
        if (param === 'number') {
            if (/[0-9]/.test(password.value.replace(/ /g, ''))) {
                return true;
            }
        }
        if (param === 'special') {
            if (/[\W]/.test(password.value.replace(/ /g, ''))) {
                return true;
            }
        }
        if (param === 'length') {
            if (/[\w\W]{8,}/.test(password.value.replace(/ /g, ''))) {
                return true;
            }
        }
        return false;
    };

    let confirmPassword = () => {
        if (password.value.replace(/ /g, '') === 'aA1!5678') {
            alert(true);
        }
    }

    let errorEls = document.querySelectorAll('[data-error]');
    let form = document.querySelector("[data-validate='form']");
    let username = document.querySelector("[data-validate='username']");
    let email = document.querySelector("[data-validate='email']");
    let password = document.querySelector("[data-validate='password']");
    let usernameError = argument.errors.messages.username.replace("%minLength", argument.username.minLength).replace("%maxLength", argument.username.maxLength);
    let emailError = argument.errors.messages.email;

    let passwordError = () => {
        if (argument.password.include === undefined || argument.password.include.length === 0) {
            return '';
        } else {
            let error = '';
            error += `${argument.errors.messages.password.title}<ul>`;
            if (argument.password.include.includes('lowercase')) {
                error += `<li data-error-status="${passwordParameters('lowercase')}">${argument.errors.messages.password.lowercase}</li>`;
            }
            if (argument.password.include.includes('uppercase')) {
                error += `<li data-error-status="${passwordParameters('uppercase')}">${argument.errors.messages.password.uppercase}</li>`;
            }
            if (argument.password.include.includes('number')) {
                error += `<li data-error-status="${passwordParameters('number')}">${argument.errors.messages.password.number}</li>`;
            }
            if (argument.password.include.includes('special')) {
                error += `<li data-error-status="${passwordParameters('special')}">${argument.errors.messages.password.special}</li>`;
            }
            if (argument.password.include.includes('length')) {
                error += `<li data-error-status="${passwordParameters('length')}">${argument.errors.messages.password.length.replace("%minLength", argument.password.minLength)}</li>`;
            }
            error += `</ul>`;

            return error;
        }
    };

    if (argument.errors.qualifications === 'show') {
        errorEls.forEach(error => {
            if (error.getAttribute('data-error') === '*') {
                error.innerHTML = '';
                if (username) {
                    error.innerHTML += `<span data-error-block="username">${usernameError}</span>`;
                    if (email || (password && !(passwordError() === ''))) {
                        error.innerHTML += "<br>";
                    }
                }
                if (email) {
                    error.innerHTML += `<span data-error-block="email">${emailError}</span>`;
                    if (password && !(passwordError() === '')) {
                        error.innerHTML += "<br>";
                    }
                }
                if (password && !(passwordError() === '')) {
                    error.innerHTML += `<span data-error-block="password">${passwordError()}</span>`;
                }
            }
        });
    }

    form.addEventListener('input', () => {
        if (argument.errors.errors === 'show') {
            if (username) {
                if (username.value.length < argument.username. minLength || username.value.length > argument.username.maxLength) {
                    errorEls.forEach(error => {
                        if (error.getAttribute('data-error') === 'username') {
                            error.innerText = `Username has to be between ${argument.username.minLength} and ${argument.username.maxLength} characters long`;
                        }
                        if (error.getAttribute('data-error') === '*') {

                        }
                    });
                } else {
                    errorEls.forEach(error => {
                        if (error.getAttribute('data-error') === 'username') {
                            error.innerText = '';
                        }
                    });
                }
            }
            
            if (email) {
                if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))) {
                    errorEls.forEach(error => {
                        if (error.getAttribute('data-error') === 'email') {
                            error.innerText = `Please enter a valid E-Mail`;
                        }
                    });
                } else {
                    errorEls.forEach(error => {
                        if (error.getAttribute('data-error') === 'email') {
                            error.innerText = '';
                        }
                    });
                }
            }
            
            if (password) {
                let passwordCheck = 0;
                argument.password.include.forEach(check => {
                    passwordCheck += passwordParameters(check) ? 1 : 0;
                });
                if (passwordCheck < argument.password.include.length) {
                    errorEls.forEach(error => {
                        if (error.getAttribute('data-error') === 'password') {
                            error.innerHTML = passwordError();
                        }
                    });
                } else {
                    errorEls.forEach(error => {
                        if (error.getAttribute('data-error') === 'password') {
                            error.innerText = '';
                        }
                    });
                }
            }

            confirmPassword();

            // TODO: Add validator for confirm password
        }

        if (argument.errors.qualifications === 'show') {
            errorEls.forEach(error => {
                if (error.getAttribute('data-error') === '*') {
                    error.innerHTML = '';
                    if (username) {
                        error.innerHTML += `<span data-error-block="username">${usernameError}</span>`;
                        if (email || password) {
                            error.innerHTML += "<br>";
                        }
                    }
                    if (email) {
                        error.innerHTML += `<span data-error-block="email">${emailError}</span>`;
                        if (password) {
                            error.innerHTML += "<br>";
                        }
                    }
                    if (password) {
                        error.innerHTML += `<span data-error-block="password">${passwordError()}</span>`;
                        console.log(passwordError());
                    }
                }
            });
        }
    });

};

validate();