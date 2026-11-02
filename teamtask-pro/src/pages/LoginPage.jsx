import React from 'react'
import { useState } from 'react'
import { login } from '../api/authApi'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setLoading(true);

            const response = await login({ email, password })

            console.log("Login Successfully", response.data)
            const token = response.data.token;
            console.log("Token ", token)

            /// Storing in Local Storage Here .......
            localStorage.setItem("token", token);
            console.log("Saved Token:", localStorage.getItem("token"));

            // Clear form
            setEmail("");
            setPassword("");

            // After Loging Successfully 
            console.log("Login Sucessfully")
         navigate("/projects");
        } catch (error) {
            console.error(
                "Login Error:",
                error.response?.data || error.message
            )
        } finally {
            setLoading(false);


        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col"
            >

                <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Welcome Back
                </h2>

                <p className="text-sm text-gray-500 text-center mb-8">
                    Login to your TeamTask Pro account
                </p>

                <label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700 mb-2"
                >
                    Email Address
                </label>

                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 mb-5 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <label
                    htmlFor="password"
                    className="text-sm font-semibold text-gray-700 mb-2"
                >
                    Password
                </label>

                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="text-center mt-4 text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                        Register
                    </Link>
                </p>

            </form>
        </div>
    )
}

export default LoginPage