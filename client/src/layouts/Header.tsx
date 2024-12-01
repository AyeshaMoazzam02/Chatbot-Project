import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/App.scss";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavList from "../components/NavList/NavList";
import { userProfile } from "@/services/authServices";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      try {
        const response = await userProfile(token);
        setUser(response.user);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/");
      }
    }
  };

  const navItems = [
    { label: "Home", href: "/files-upload" },
    { label: "Features", href: "/files-upload#features" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userProfile");
    setUser(null);
    navigate("/");
  };

  return (
    <header>
      <nav className="navbar">
        <div className="flex-class">
          <Link to="/">
            <img src="/full_logo.png" alt="Logo" />
          </Link>

          <div className={`navbar-nav ${isMenuOpen ? "active" : ""}`}>
            <div className="nav-list">
              <NavList items={navItems} />
            </div>

            <div className="button">
              <div className="user-menu">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <img
                      src={user?.profile_picture || "/default-avatar.jpg"}
                      className="user-avatar"
                      onClick={toggleMenu}
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <Link to="/profile">
                        <DropdownMenuItem>My Profile</DropdownMenuItem>
                      </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
