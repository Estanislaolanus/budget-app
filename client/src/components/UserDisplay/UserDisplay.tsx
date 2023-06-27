import {useState} from 'react'
import useUser from '../../hooks/useUser';
import './UserDisplay.css'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function UserDisplay() {
    const userContext = useUser();
    const authContext = useAuth();
    const [displayUser, setDisplayUser] = useState<Boolean>(false);
    const navigate = useNavigate()
    function onLogout (){
        localStorage.clear();
        authContext?.setAuth(false);
        userContext?.setUser({username: "", email: ""});
        navigate("/login");
    }
    return (
        <>
            <div onClick={() => setDisplayUser(() => !displayUser)} className='user'>{userContext?.user.username[0]}</div>
            {displayUser &&
                <div className='user-display'>
                    <div>{userContext?.user.username}</div>
                    <div>{userContext?.user.email}</div>
                    <button onClick={() => onLogout()} className="logout"><img src="./assets/logout.png" alt="" />Log out</button>
                </div>}
        </>
    )
}
