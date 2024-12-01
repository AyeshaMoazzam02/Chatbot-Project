import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/services/authServices";
import { AuthContext } from "@/context/authContext";

export const description =
  "A sign up form with first name, last name, email, and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account.";

const SignUpPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate("/files-upload");
    }
  }, []);
  
  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signup(name, email, password);
      setSuccess("Account created successfully! Redirecting to sign in...");
      setError(null);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      console.error(
        "Error creating account:",
        error.response?.data?.errors || error.message
      );
      setError(
        error.response?.data?.errors[0]?.message ||
          "Failed to create an account"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="mx-auto w-full max-w-sm p-4 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <p className="text-center text-green-500 mb-4">{success}</p>
          ) : (
            <form className="grid gap-4" onSubmit={handleSignUp}>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>{" "}
                  {/* Changed label to "name" */}
                  <Input
                    id="name"
                    placeholder="Enter Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <Button type="submit" className="w-full bg-[#426592] text-white">
                Create an account
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
