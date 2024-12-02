import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import Header from "@/layouts/Header";
import { toast } from "react-toastify";
import {
  userProfile,
  updateUserProfile,
  uploadProfilePicture,
} from "@/services/authServices";

const UserProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const data = await userProfile(token);
      setUser(data.user);
      setName(data.user.name);
      setEmail(data.user.email);
      setProfilePictureUrl(data.user.profile_picture || "");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to fetch profile.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      setProfilePictureUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("userToken");

    try {
      let updatedProfilePictureUrl = user?.profile_picture;

      // Upload the profile picture if a new one is selected
      if (profilePicture) {
        const uploadResponse = await uploadProfilePicture(token, profilePicture);
        updatedProfilePictureUrl = uploadResponse.url;
      }

      const updateData = {
        name,
        email,
        ...(password && { password }),
        profile_picture: updatedProfilePictureUrl,
      };

      // Update the user profile
      const updatedUser = await updateUserProfile(token, updateData);

      // Update the local state to reflect changes
      setUser(updatedUser.user);
      setName(updatedUser.user.name);
      setEmail(updatedUser.user.email);
      setProfilePictureUrl(updatedUser.user.profile_picture || "");

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
};

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage
                src={profilePictureUrl}
                alt={name || "Profile Picture"}
              />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Password (optional)
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full"
            />
          </div>
          <div className="text-center">
            <Button
              type="submit"
              className="bg-[#426592] text-white w-full"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfilePage;
