import "./VerifyEmail.css";
import useUser from "../../hooks/useUser";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../api/Axios";

export default function VerifyEmail() {
    const user = useUser();
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.user.isEmailVerified) navigate("/");
    }, []);
    async function resendEmailVerification() {
        const res = await Axios.post("/verify/sendNewToken", {
            email: user?.user.email
        }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        });
        const data = res.data;
        if (!data.success) return toast("Something went wrong");
        toast("Email verification sent");
    }
    return (
        <>
            <div className="verify-email-container">
                <h3>Verify Your Email Address</h3>
                <p>To continue using budget app, please verify your email:</p>
                <h4>{user?.user.email}</h4>
                <p>Haven't received the email?</p>
                <button onClick={() => resendEmailVerification()}>Send verification email</button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
