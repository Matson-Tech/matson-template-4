import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WeddingProvider } from "./contexts/WeddingProvider";
import AllImages from "./pages/AllImages";
import AllWishes from "./pages/AllWishes";
import Index from "./pages/Index";
import Login from "./components/login/Login";
import NotFound from "./pages/NotFound";
import LoginRouter from "./pages/LoginRouter";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <WeddingProvider>
                    <Routes>
                        <Route path="/login" element={<LoginRouter />} />
                        <Route
                            path="/wishes/:username"
                            element={<AllWishes />}
                        />
                        <Route
                            path="/gallery/:username"
                            element={<AllImages />}
                        />
                        <Route path="/:username" element={<Index />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </WeddingProvider>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
