import "./VerifyEmail.css";
import useUser from "../../hooks/useUser";

export default function VerifyEmail() {
    const user = useUser();
    return (
        <div className="verify-email-container">
            <h3>Verify Your Email Address</h3>
            <p>To continue using budget app, please verify your email:</p>
            <h4>{user?.user.email}</h4>
            <p>Haven't received the email?</p>
            <button>Send verification email</button>
        </div>
    )
}
