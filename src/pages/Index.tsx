
import { useWedding } from "@/contexts/WeddingContext";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { DetailsSection } from "@/components/DetailsSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { GallerySection } from "@/components/GallerySection";
import { WishesSection } from "@/components/WishesSection";
import { MoreInfoSection } from "@/components/MoreInfoSection";
import { ContactSection } from "@/components/ContactSection";
import { JewellerSection } from "@/components/JewellerSection";
import { WeddingProvider } from "@/contexts/WeddingProvider";

const IndexContent = () => {
  const { globalIsLoading } = useWedding();

  if (globalIsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-gray-700">Loading your beautiful wedding website...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <StorySection />
      <DetailsSection />
      <ScheduleSection />
      <GallerySection />
      <WishesSection />
      <MoreInfoSection />
      <ContactSection />
      <JewellerSection />
    </div>
  );
};

const Index = () => {
  return (
    <WeddingProvider>
      <IndexContent />
    </WeddingProvider>
  );
};

export default Index;
