import React, { useState } from 'react'
import { register } from '../api/authApi'
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false);





    const handleRegister = async (e) => {
        e.preventDefault() // esse page reload nhi hota .... 

        if (password !== confirmPassword) {
            console.log("Password Does Not Match .....")
            return
        }

        try {

            setLoading(true);
            const response = await register({ name, email, password })
            console.log("Registration Successfully ", response.data)

            // 4. Clear form
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // After Successfully Registration 
            console.log("Registration successful");
            navigate("/login");

        } catch (error) {
            console.error("Register Error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    }



    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">

            <form
                onSubmit={handleRegister}
                className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col"
            >

                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Create Account
                </h2>

                <p className="text-sm text-gray-500 text-center mb-8">
                    Join TeamTask Pro today
                </p>

                <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                </label>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    required
                    className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                </label>

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-2">
                    Password
                </label>

                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <label htmlFor="confirmpassword" className="text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                </label>

                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirm your password"
                    required
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>

            </form>
        </div>

    )
}

export default RegisterPage