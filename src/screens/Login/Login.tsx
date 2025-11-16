import { MailIcon, LockIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors({ ...errors, ...newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
        general: "",
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const success = login(formData.email, formData.password);

      if (success) {
        navigate('/');
      } else {
        setErrors({
          ...errors,
          general: "Invalid email or password",
        });
      }
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      <section className="relative w-full h-48 bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-2">Login</h1>
        <div className="flex items-center gap-2 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span>/</span>
          <span>Login</span>
        </div>
      </section>

      <main className="flex-1 py-16 px-4">
        <div className="max-w-md mx-auto">
          <div className="border rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-orange-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-auto py-3"
              >
                Sign In
              </Button>

              <Separator className="my-4" />

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-orange-500 hover:underline font-semibold">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>

          <div className="mt-8 text-center">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-left">
                <MailIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Secure Login</h3>
                  <p className="text-sm text-gray-600">
                    Your data is protected with industry-standard security
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-left">
                <LockIcon className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Privacy First</h3>
                  <p className="text-sm text-gray-600">
                    We never share your information with third parties
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
