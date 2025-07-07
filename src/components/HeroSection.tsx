
import { useWedding } from "@/contexts/WeddingContext";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  const { weddingData } = useWedding();

  const scrollToRSVP = () => {
    const element = document.getElementById('wishes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <WeddingSection 
      id="hero" 
      className="bg-gradient-to-br from-pink-100 to-rose-200 min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Decorative border pattern */}
      <div className="absolute inset-0 border-8 border-pink-300 border-dashed opacity-20 m-8 rounded-lg"></div>
      
      <div className="text-center z-10 space-y-8">
        {/* Wedding Quote */}
        <EditableText
          value={weddingData.couple.weddingQuote}
          path="couple.weddingQuote"
          multiline
          className="text-lg md:text-xl text-gray-700 italic max-w-2xl mx-auto leading-relaxed"
        />

        {/* Couple Names */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <EditableText
              value={weddingData.couple.groomName}
              path="couple.groomName"
              className="text-4xl md:text-6xl font-bold text-gray-800 font-serif"
            />
            <span className="text-3xl md:text-5xl text-pink-500">&</span>
            <EditableText
              value={weddingData.couple.brideName}
              path="couple.brideName"
              className="text-4xl md:text-6xl font-bold text-gray-800 font-serif"
            />
          </div>
        </div>

        {/* Wedding Date and Venue */}
        <div className="space-y-2">
          <EditableText
            value={weddingData.weddingDetails.event1.date}
            path="weddingDetails.event1.date"
            className="text-xl md:text-2xl text-gray-700 font-medium"
          />
          <EditableText
            value={`${weddingData.weddingDetails.event1.time} at ${weddingData.weddingDetails.event1.venue}`}
            path="weddingDetails.event1.venue"
            className="text-lg md:text-xl text-gray-600"
          />
        </div>

        {/* RSVP Button */}
        <Button 
          onClick={scrollToRSVP}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Send Your Wishes
        </Button>

        {/* Decorative illustration placeholder */}
        <div className="absolute bottom-10 left-10 opacity-30">
          <div className="w-20 h-20 border-2 border-pink-400 rounded-full flex items-center justify-center">
            <span className="text-pink-400 text-2xl">💐</span>
          </div>
        </div>
        <div className="absolute top-20 right-10 opacity-30">
          <div className="w-16 h-16 border-2 border-pink-400 rounded-full flex items-center justify-center">
            <span className="text-pink-400 text-xl">💍</span>
          </div>
        </div>
      </div>
    </WeddingSection>
  );
};
