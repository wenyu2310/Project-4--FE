import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../../services/authServices";
import { UserContext } from "../../contexts/UserContext";

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (evt) => {
        setMessage("");
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setIsLoading(true);
        try {
            const signedInUser = await signIn(formData);
            setUser(signedInUser);
            navigate("/");
        } catch (err) {
            setMessage(err.message);
            setIsLoading(false);
        }
    };

    return (
        <main className="pt-20">
            <div className="flex justify-center">
                <section className="w-96"> {/* Removed box styling */}
                    <form autoComplete="off" onSubmit={handleSubmit} className="space-y-6"> {/* Increased space-y */}
                        <h1 className="text-3xl font-bold text-center mb-8">Log In</h1> {/* Increased heading size */}
                        <p className="text-red-500 text-center">{message}</p>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="text"
                                autoComplete="off"
                                id="email"
                                value={formData.email}
                                name="email"
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0" // Added border-b
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                            <input
                                type="password"
                                autoComplete="off"
                                id="password"
                                value={formData.password}
                                name="password"
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0" // Added border-b
                            />
                        </div>
                        <div className="flex justify-between mt-8"> {/* Added mt-8 for button spacing */}
                            <button 
                                className="btn bg-[#5EBB2B] text-white border-[#4eaa0c] relative"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="inline-block w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mr-2"></span>
                                        Logging in...
                                    </>
                                ) : (
                                    "Log In"
                                )}
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-ghost" 
                                onClick={() => navigate("/")}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
};

export default LoginForm;


