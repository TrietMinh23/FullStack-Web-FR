import React, { useEffect, useState } from 'react'
import LoadingIcon from '../../components/ui/LoadingIcon'
import { useParams, Link } from 'react-router-dom'
import { resetPassword } from '../../api/login'
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import deleteAllCookies from '../../utils/deleteCookie';


export default function ResetPassword() {
    const [password, setPassword] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);

    const { id } = useParams()
    console.log(id)

    useEffect(() => {
        localStorage.clear()
        deleteAllCookies()
    }, [])

    const handleResetPassword = async () => {
        if (password.length < 6 || password.length > 20) {
            setPasswordError("Password must contain 6-20 characters");
            return;
        }

        setPasswordError(""); // Clear any previous error
        setLoading(true);

        try {
            const response = await resetPassword({ password, token: id });
            console.log(response);
            setPasswordSuccess(true);
        } catch (error) {
            console.error("Error resetting password:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="absolute top-0 left-0 bottom-0 right-0  bg-white flex flex-col items-center py-8 z-50">
            <div className="flex flex-col gap-4">
                <label htmlFor='password'>New password</label>
                <input
                    type='text'
                    id='password'
                    name='password'
                    className='w-[800px] pb-2 border-b outline-none placeholder:test-sm'
                    placeholder='Type here'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div className={`alert-box-inner alert-container mb-4 flex font-semibold text-red-600 ${passwordError ? "block" : "hidden"}`}>
                    <PriorityHighIcon className="icon-alert"></PriorityHighIcon>
                    <div className="alert-content text-xs ml-2">
                        <p>{passwordError}</p>
                    </div>
                </div>
                <div className={`alert-box-inner alert-container mb-4 flex font-semibold text-green-600 ${passwordSuccess ? "block" : "hidden"}`}>
                    <div className="alert-content text-xs ml-2">
                        <p>Password changed successfully</p>

                    </div>
                </div>
                <div className="flex items-center justify-end w-full gap-4">
                    {!passwordSuccess ?
                        <button
                            disabled={isLoading}
                            onClick={handleResetPassword}
                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-sheen hover:bg-emerald border border-transparent rounded-md font-semibold capitalize text-white focus:outline-none disabled:opacity-25 transition"
                        >
                            {isLoading ? <LoadingIcon /> : "Reset password"}
                        </button>
                        :
                        <Link to="/login" onClick={() => localStorage.clear()} className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-100 hover:bg-blue-200 border border-transparent rounded-md font-semibold capitalize focus:outline-none">
                            <span className="text-blue-600">Go to login page</span>
                        </Link>
                    }
                </div>
            </div>
        </div>
    )
}