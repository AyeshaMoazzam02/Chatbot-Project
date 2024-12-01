import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { resetPassword } from "@/services/authServices";
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

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await resetPassword(token!, newPassword);
      setSuccess(true);
    } catch (err: any) {
      setError("Failed to reset password. Please try again.");
      console.error("Error resetting password:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="mx-auto w-full max-w-sm p-4 bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center">
              <p className="text-green-500 mb-4">Your password has been reset successfully!</p>
              <Link to="/" className="underline text-blue-600">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={handleResetPassword}>
              <div className="grid gap-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center mt-2">*{error}</p>
              )}
              <Button type="submit" className="w-full bg-[#426592] text-white">
                Reset Password
              </Button>
            </form>
          )}
          <div className="mt-4 text-center text-sm">
            Remembered your password?{" "}
            <Link to="/" className="underline text-blue-600">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
