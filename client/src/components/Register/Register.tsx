import { FormEvent, RefObject, ChangeEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import Axios from '../../api/Axios';
import "./Register.css";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import validateForm from "../../validations/validateRegister";
export default function Register({}) {
    const authContext = useAuth();
    const userContext = useUser();
    const usernameRef: RefObject<HTMLInputElement> = useRef(null);
    const emailRef: RefObject<HTMLInputElement> = useRef(null);
    const passwordRef: RefObject<HTMLInputElement> = useRef(null);
    const confirmPasswordRef: RefObject<HTMLInputElement> = useRef(null);
    
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
    const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<boolean>(false);
    const [usernameError, setUsernameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const navigate = useNavigate();
    Axios.defaults.withCredentials = true;
    async function register() {
        try {
            if(!usernameRef.current || !emailRef.current || !passwordRef.current) return;
            const user = {
                username: usernameRef.current.value, 
                email: emailRef.current.value, 
                password: passwordRef.current.value
            };
            const res = await Axios.post("/register", user);
            if(!res.data) return;
            localStorage.setItem("accessToken", res.data.accessToken);
            authContext?.setAuth(res.data.success);
            userContext?.setUser(() => {
                return { username: usernameRef.current?.value || "", email: emailRef.current?.value || "" };
            });
            navigate("/");
        } catch (err) {
            console.error(err)
        }
    }
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(
            !usernameRef.current ||
            !emailRef.current || 
            !passwordRef.current ||
            !confirmPasswordRef.current  
        )return;
        const areFieldsValid = validateForm(
            usernameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value,
            confirmPasswordRef.current.value
        );
        if(!areFieldsValid.isValid) {
            const { usernameError, emailError, passwordError, confirmPasswordError } = areFieldsValid.errorMessages;
            if(usernameError) {
                usernameRef.current.classList.add("invalid");
                setUsernameError(usernameError)
            }
            if(emailError) {
                emailRef.current.classList.add("invalid");
                setEmailError(emailError);
            }
            if(passwordError) {
                passwordRef.current.parentElement?.classList.add("invalid");
                setPasswordError(passwordError);
            }
            if(confirmPasswordError) {
                confirmPasswordRef.current.parentElement?.classList.add("invalid");
                setConfirmPasswordError(confirmPasswordError)
            }
            return;
        }
        await register();
    }
    function onType (e: ChangeEvent<HTMLInputElement>, type: string) {
        if(type === "password" || type === "confirmPassword") {
            e.currentTarget.parentElement?.classList.remove("invalid");
        } else {
            e.currentTarget.classList.remove("invalid");
        }
        switch(type) {
            case "username":
                setUsernameError("");
            break;
            case "email": 
                setEmailError("");
            break;
            case "password":
                setPasswordError("");
            break;
            case "confirmPassword":
                setConfirmPasswordError("");
        }
    }
    return (
        <div className="register">
            <h1 className="register-title">Create Account</h1>
            <form onSubmit={handleSubmit} className="register-form" action="" >
                <div className="input-container">
                    <label htmlFor="username">Username</label>
                    <input ref={usernameRef} onChange={e => onType(e, "username")} type="text" id="username" />
                </div>
                {usernameError && <div className="error-message">{usernameError}</div>}
                <div className="input-container">
                    <label htmlFor="email">Email</label>
                    <input ref={emailRef} onChange={e => onType(e, "email")} type="email" id="email" />
                </div>
                {emailError && <div className="error-message">{emailError}</div>}
                <div className="input-container">
                    <label htmlFor="password">Password</label>
                    <div className="input-password">
                        <input 
                        ref={passwordRef}
                        onChange={e => onType(e, "password")}
                        type={visiblePassword ? "text" : "password"} 
                        id="password" />
                        <span onClick={() => setVisiblePassword(visiblePassword ? false : true)} className="material-symbols-outlined show-password">
                        {visiblePassword ? "visibility":"visibility_off"}
                        </span>
                        
                    </div>
                </div>
                {passwordError && <div className="error-message">{passwordError}</div>}
                <div className="input-container">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className="input-password">
                        <input 
                        ref={confirmPasswordRef}
                        onChange={e => onType(e, "confirmPassword")}
                        type={visibleConfirmPassword ? "text" : "password"} id="confirm-password" />
                        <span 
                        onClick={() => setVisibleConfirmPassword(visibleConfirmPassword ? false : true)} 
                        className="material-symbols-outlined show-password">
                        {visibleConfirmPassword ? "visibility" : "visibility_off"}
                        </span>
                    </div>
                </div>
                {confirmPasswordError && <div className="error-message">{confirmPasswordError}</div>}
                <button type="submit">Create new account</button>

            </form>
            <div className="ask-to-login">Already have an account?<button onClick={() => navigate('/login')}>Login</button></div>
        </div>
    )
}
