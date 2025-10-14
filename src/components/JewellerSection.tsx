import { ExternalLink, Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useWedding from "@/hooks/useWedding";
import FadeIn from "./animations/FadeIn";
import { WeddingSection } from "./WeddingSection";

export const JewellerSection = () => {
    const { weddingAd } = useWedding();
    console.log("Wedding Ad:", weddingAd);
    // Provide default values if weddingAd is null/undefined
    const safeWeddingAd = weddingAd || {
        Ad_section: {
            title: 'Our Trusted Jeweler',
            image: '/jeweller/ad-1.jpg',
            description: 'Discover our exclusive collection of fine jewelry and wedding rings.',
            shopName: 'Luxury Jewelers',
            website: '#',
            disabled: false
        }
    };
    if (safeWeddingAd.Ad_section.disabled) {
        return null;
    }


    return (
        <WeddingSection
            id={"jeweller"}
            className="bg-gradient-to-br from-yellow-100 to-amber-200"
        >
            <div className="max-w-2xl mx-auto">
                <FadeIn delay={100}>
                    <Card className="bg-white/90 backdrop-blur-sm shadow-xl border-2 border-yellow-300">
                        <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-amber-400 text-white">
                            <CardTitle className="flex items-center justify-center space-x-2 text-2xl md:text-3xl font-bold">
                                <Gem className="h-8 w-8" />
                                <span>{safeWeddingAd.Ad_section.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <img src={safeWeddingAd.Ad_section.image} alt="jewellery" />
                        <CardContent className="p-8 text-center space-y-6">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {safeWeddingAd.Ad_section.description}
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {safeWeddingAd.Ad_section.shopName}
                                </h3>
                                <FadeIn delay={200}>
                                    <Button
                                        onClick={() =>
                                            window.open(
                                                safeWeddingAd.Ad_section.website,
                                                "_blank",
                                            )
                                        }
                                        className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white px-8 py-3 text-lg"
                                    >
                                        <ExternalLink className="h-5 w-5 mr-2" />
                                        Visit Our Store
                                    </Button>
                                </FadeIn>
                            </div>

                            {/* Decorative elements */}
                            <div className="flex justify-center space-x-4 pt-4">
                                <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
                                <div className="w-4 h-4 bg-amber-400 rounded-full opacity-60"></div>
                                <div className="w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
                            </div>
                        </CardContent>
                    </Card>
                </FadeIn>
            </div>
        </WeddingSection>
    );
};
