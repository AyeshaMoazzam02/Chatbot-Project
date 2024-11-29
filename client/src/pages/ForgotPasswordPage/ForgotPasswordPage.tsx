import React, { useState } from "react";
import { forgotPassword } from "@/services/authServices";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError("Failed to send reset email. Please try again.");
      console.error("Error sending reset email:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="mx-auto w-full max-w-sm p-4 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center">
              <p className="text-green-500 mb-4">
                Password reset link has been sent to your email.
              </p>
              <Link to="/signin" className="underline text-blue-600">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit}>
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
              {error && (
                <p className="text-red-500 text-sm text-center mt-2">*{error}</p>
              )}
              <Button type="submit" className="w-full bg-orange-600 text-white">
                Send Reset Link
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link to="/signin" className="underline text-blue-600">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
