
import { useState } from "react";
import { useWedding } from "@/contexts/WeddingContext";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";

export const Header = () => {
  const { isLoggedIn, logout } = useWedding();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Our Story', id: 'story' },
    { label: 'Details', id: 'details' },
    { label: 'Schedule', id: 'schedule' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Wishes', id: 'wishes' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-semibold text-gray-800">A & Z</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 hover:text-pink-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/wishes" className="text-gray-600 hover:text-pink-500">
              All Wishes
            </Link>
            <Link to="/gallery" className="text-gray-600 hover:text-pink-500">
              All Images
            </Link>
            {isLoggedIn ? (
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <nav className="flex flex-col space-y-3 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-600 hover:text-pink-500 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <Link 
                to="/wishes" 
                className="text-gray-600 hover:text-pink-500"
                onClick={() => setIsMenuOpen(false)}
              >
                All Wishes
              </Link>
              <Link 
                to="/gallery" 
                className="text-gray-600 hover:text-pink-500"
                onClick={() => setIsMenuOpen(false)}
              >
                All Images
              </Link>
              {isLoggedIn ? (
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-fit">
                  Logout
                </Button>
              ) : (
                <Button asChild size="sm" className="w-fit">
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
