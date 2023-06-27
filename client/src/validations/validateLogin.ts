
const validateForm = (email:string, password:string) => {
    const errorMessages = {
        emailError: "",
        passwordError: ""
    }
    if (!email) {
        errorMessages.emailError = "Email field cannot be empty";
    }
    if(!password) {
        errorMessages.passwordError = "Password field cannot be empty";
    }
    let isValid = true;
    if(errorMessages.passwordError || errorMessages.emailError) isValid = false;
    return {
        isValid,
        errorMessages
    };
}
export default validateForm;