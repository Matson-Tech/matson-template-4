import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWedding } from "@/contexts/WeddingContext";
import scrollToElement from "@/utils/scrollTo";
import { cn } from "@/lib/utils";

export const Header = () => {
    const { isLoggedIn, logout, weddingData } = useWedding();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: sectionId } });
            return;
        }
        scrollToElement(sectionId);
    };

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    const navItems = [
        { label: "Home", id: "hero" },
        { label: "Our Story", id: "story" },
        { label: "Details", id: "details" },
        { label: "Schedule", id: "schedule" },
        { label: "Gallery", id: "gallery" },
        { label: "Wishes", id: "wishes" },
        { label: "Contact", id: "contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-opacity duration-300",
                isScrolled ? "opacity-100" : "opacity-0",
            )}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-6 w-6 text-pink-500" />
                        <span className="text-xl font-normal text-gray-800 font-serif">
                            {weddingData.couple.groomName[0]} &{" "}
                            {weddingData.couple.brideName[0]} Wedding
                        </span>
                        <Heart className="h-6 w-6 text-pink-500" />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="text-gray-600 hover:text-pink-500 transition-colors"
                                type="button"
                            >
                                {item.label}
                            </button>
                        ))}
                        {isLoggedIn && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        type="button"
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
                                    type="button"
                                >
                                    {item.label}
                                </button>
                            ))}
                            {isLoggedIn && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="w-fit"
                                >
                                    Logout
                                </Button>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
