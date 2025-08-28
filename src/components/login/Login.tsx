import { Heart, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useWedding from "@/hooks/useWedding";

const Login = () => {
    const { login, isLoggedIn, user } = useWedding();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "user@gmail.com",
        password: "password",
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn) {
            navigate(`/${user?.username}`);
            return;
        }
    }, [isLoggedIn, user?.username, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await login(formData.email, formData.password);
            if (error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Welcome back!");
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoggedIn) {
        return;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
                    <CardHeader className="text-center space-y-4">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center">
                                <Heart className="h-8 w-8" />
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800">
                            Wedding Admin Login
                        </CardTitle>
                        <p className="text-gray-600">
                            Sign in to edit your wedding website
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="login-email"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id={"login-email"}
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your email"
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="login-password"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        id={"login-password"}
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your password"
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                            >
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link
                                to={`/${user?.username}`}
                                className="text-pink-600 hover:text-pink-700 text-sm"
                            >
                                ← Back to Wedding Website
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;
