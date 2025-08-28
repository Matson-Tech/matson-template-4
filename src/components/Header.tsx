import { Heart, Menu, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useWedding from "@/hooks/useWedding";
import { cn } from "@/lib/utils";
import scrollToElement from "@/utils/scrollTo";

interface HeaderProps {
    Fixed?: boolean;
}

type NavIds =
    | "home"
    | "story"
    | "details"
    | "schedule"
    | "gallery"
    | "wishes"
    | "contact"
    | "info"
    | "jewellery";

type NavItems = {
    name: string;
    id: NavIds;
    disabled: boolean;
};

export const Header: React.FC<HeaderProps> = ({ Fixed }) => {
    const { isLoggedIn, logout, weddingData, user } = useWedding();
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
        if (location.pathname !== `/${user?.username}`) {
            navigate(`/${user?.username}`, { state: { scrollTo: sectionId } });
            return;
        }
        scrollToElement(sectionId);
    };

    const handleLogout = async () => {
        await logout();
    };

    const navItems: NavItems[] = useMemo(
        () => [
            { name: "Home", id: "home", disabled: false },
            {
                name: "Our Story",
                id: "story",
                disabled: weddingData.story.disabled,
            },
            {
                name: "Wedding Details",
                id: "details",
                disabled: weddingData.weddingDetails.disabled,
            },
            { name: "Schedule", id: "schedule", disabled: false },
            { name: "Gallery", id: "gallery", disabled: false },
            {
                name: "Wishes",
                id: "wishes",
                disabled: weddingData.wishDisabled,
            },
            {
                name: "Contact",
                id: "contact",
                disabled: weddingData.contact.disabled,
            },
            {
                name: "Info",
                id: "info",
                disabled: true,
            },
            {
                name: "Jeweller",
                id: "jewellery",
                disabled: true,
            },
        ],
        [weddingData],
    );

    return (
        <header
            className={cn(
                "fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-opacity duration-300",
                isScrolled || Fixed || isMenuOpen ? "opacity-100" : "opacity-0",
            )}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Heart className="h-6 w-6 text-pink-500" />
                        <Link
                            to={`/${user?.username}`}
                            className="text-xl font-normal text-gray-800 font-serif"
                        >
                            {weddingData.couple.groomName[0]} &{" "}
                            {weddingData.couple.brideName[0]} Wedding
                        </Link>
                        <Heart className="h-6 w-6 text-pink-500" />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {navItems
                            .filter((item) => !item.disabled)
                            .map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-gray-600 hover:text-pink-500 transition-colors"
                                    type="button"
                                >
                                    {item.name}
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
            </div>
            {/* Mobile Menu */}
            <div
                className={cn(
                    "md:hidden transition-all mt-4 p-4",
                    isMenuOpen
                        ? "opacity-100 border-t h-screen"
                        : "opacity-0 -mt-4 p-2",
                )}
            >
                <nav
                    className={cn(
                        "flex flex-col space-y-3 mt-4",
                        !isMenuOpen && "hidden",
                    )}
                >
                    {navItems
                        .filter((item) => !item.disabled)
                        .map((item, index) => (
                            <>
                                {index !== 0 && <Separator decorative />}
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className="text-gray-600 hover:text-pink-500 transition-colors font-serif"
                                    type="button"
                                >
                                    {item.name}
                                </button>
                            </>
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
        </header>
    );
};
