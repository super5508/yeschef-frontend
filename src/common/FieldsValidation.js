const checkEmailValid = (obj) => {
    let email;
    if (typeof obj === "string") {
        email = obj;
    } else {
        email = obj.target.value;
    }
    const email_patt = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let isValid = true;
    let emailError = '';

    if (!email) {
        isValid = false
        emailError = 'Email is required'
    }

    else if (!email_patt.test(email)) {
        isValid = false
        emailError = 'Please enter a valid email address'
    }
    return {
        isValid,
        emailError
    }
}


const checkPwdValid = (obj) => {
    let password;
    if (typeof obj === "string") {
        password = obj;
    } else {
        password = obj.target.value;
    }

    let isPwdValid = true;
    let pwdError = '';

    if (!password) {
        isPwdValid = false
        pwdError = 'Password is required'
    }

    return {
        isPwdValid,
        pwdError
    }
}

export default {
    checkEmailValid,
    checkPwdValid
}