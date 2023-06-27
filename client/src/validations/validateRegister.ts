
const validateForm = (username:string, email:string, password:string, confirmPassword:string) => {
    const errorMessages = {
        usernameError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: ""
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*+-]{8,20}$/;
    const isValidPassword = passwordPattern.test(password);
    if (!email) {
        errorMessages.emailError = "Email field cannot be empty";
    }
    if(!isValidPassword) {
        errorMessages.passwordError = "Password must be 8-20 characters long, and contain one uppercase and one lowercase character.";
    }
    if(!username) {
        errorMessages.usernameError = "Username field cannot be empty"
    }
    if (!confirmPassword) {
        errorMessages.confirmPasswordError = "Confirm password field cannot be empty";
    } else if (password !== confirmPassword) {
        errorMessages.confirmPasswordError = "Those passwords didn't match. Try again.";
    }
    let isValid = true;
    if(
        errorMessages.usernameError 
        || errorMessages.passwordError 
        || errorMessages.confirmPasswordError 
        || errorMessages.emailError
    ) isValid = false;
    return {
        isValid,
        errorMessages
    };
}
export default validateForm;