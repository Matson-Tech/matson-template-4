import { ContactSection } from "@/components/ContactSection";
import { DetailsSection } from "@/components/DetailsSection";
import { GallerySection } from "@/components/GallerySection";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { JewellerSection } from "@/components/JewellerSection";
import Loading from "@/components/ui-custome/Loading/Loading";
import { MoreInfoSection } from "@/components/MoreInfoSection";
import { ScheduleSection } from "@/components/ScheduleSection";
import { StorySection } from "@/components/StorySection";
import { WishesSection } from "@/components/WishesSection";
import { useWedding } from "@/contexts/WeddingContext";

const Index = () => {
    const { globalIsLoading } = useWedding();

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-white snap-y snap-mandatory overflow-y-scroll">
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

export default Index;
