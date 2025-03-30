import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom"; 
import image1 from "../assets/image1.svg"; 


export function LoginForm({ className, ...props }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const endpoint = isSignUp
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Something went wrong");
  
      if (!isSignUp) {
        localStorage.setItem("token", data.token); // ✅ Store token in localStorage
        navigate("/dashboard"); // Redirect after login
      }
  
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Form Section */}
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">{isSignUp ? "Create an Account" : "Welcome back"}</h1>
                <p className="text-muted-foreground">{isSignUp ? "Sign up to get started" : "Login to your account"}</p>
              </div>

              {/* Show Error Message */}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              {/* Name Field (only for Signup) */}
              {isSignUp && (
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                </div>
              )}

              {/* Email Field */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="m@example.com" value={formData.email} onChange={handleChange} required />
              </div>

              {/* Password Field */}
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
              </Button>

              {/* Toggle Between Login and Signup */}
              <div className="text-center text-sm">
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <button type="button" className="underline underline-offset-4" onClick={() => setIsSignUp(false)}>
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <button type="button" className="underline underline-offset-4" onClick={() => setIsSignUp(true)}>
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </div>
          </form>

          {/* Image Section */}
          <div className="bg-muted relative hidden md:block">
            <img src={image1} alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
