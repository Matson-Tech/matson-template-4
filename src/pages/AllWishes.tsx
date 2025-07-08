
import { useEffect, useState } from "react";
import { useWedding } from "@/contexts/WeddingContext";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft, MessageCircle } from "lucide-react";

const AllWishes = () => {
  const { weddingWishes, loadAllWeddingWishes, globalIsLoading } = useWedding();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWishes = async () => {
      await loadAllWeddingWishes();
      setIsLoading(false);
    };
    loadWishes();
  }, [loadAllWeddingWishes]);

  if (globalIsLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-gray-700">Loading wishes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-rose-200">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Button asChild variant="outline" className="mb-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Wedding Website
              </Link>
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              All Wedding Wishes
            </h1>
            <p className="text-lg text-gray-600">
              Beautiful messages from our loved ones ({weddingWishes.length} wishes)
            </p>
          </div>

          {/* Wishes Grid */}
          {weddingWishes.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No wishes yet</h3>
                <p className="text-gray-600 mb-6">Be the first to send your beautiful wishes!</p>
                <Button asChild className="bg-pink-500 hover:bg-pink-600">
                  <Link to="/#wishes">Send a Wish</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {weddingWishes.map((wish, index) => (
                <Card key={wish.id || index} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Heart className="h-5 w-5 text-pink-500" />
                      <span>{wish.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic leading-relaxed">"{wish.message}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllWishes;
