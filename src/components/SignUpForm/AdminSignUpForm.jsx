import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { adminSignUp } from "../../services/authServices";
import { UserContext } from "../../contexts/UserContext";

const AdminSignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { email, password, confirmPassword } = formData;

  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    
    try {
    
      const newAdmin = await adminSignUp(formData);
      setUser(newAdmin);
      navigate("/admin");
    } catch (err) {
      setMessage(err.message);
      setIsLoading(false);
    }
  };

  const isFormInvalid = () => {
    return !(email && password && confirmPassword);
  };

  return (
    <main className="pt-20">
      <div className="flex justify-center">
        <section className="w-96">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-3xl font-bold text-center mb-8">Sign Up</h1>
            <p className="text-red-500 text-center">{message}</p>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                name="name"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
                disabled={isLoading}
              />
            </div>
            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirm"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-4 border-gray-300 focus:outline-none focus:ring-0"
                disabled={isLoading}
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                className="btn bg-[#5EBB2B] text-white border-[#4eaa0c]"
                disabled={isFormInvalid() || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin mr-2"></span>
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
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

export default AdminSignUpForm;
