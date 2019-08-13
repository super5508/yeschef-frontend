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

export default {
    checkEmailValid,
}