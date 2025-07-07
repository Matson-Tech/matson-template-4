
import { useWedding } from "@/contexts/WeddingContext";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";

export const StorySection = () => {
  const { weddingData } = useWedding();

  return (
    <WeddingSection 
      id="story" 
      className="bg-gradient-to-br from-blue-100 to-teal-200 relative"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Story Content */}
        <div className="space-y-6">
          <EditableText
            value={weddingData.story.title}
            path="story.title"
            className="text-3xl md:text-4xl font-bold text-gray-800 font-serif"
          />
          
          <EditableText
            value={weddingData.story.content}
            path="story.content"
            multiline
            className="text-lg text-gray-700 leading-relaxed"
          />

          {/* Decorative rings */}
          <div className="flex justify-center space-x-4 pt-6">
            <div className="w-8 h-8 border-3 border-yellow-400 rounded-full"></div>
            <div className="w-8 h-8 border-3 border-yellow-400 rounded-full"></div>
          </div>
        </div>

        {/* Couple Photo */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={weddingData.story.image}
                alt="Couple"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full opacity-60"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
          </div>
        </div>
      </div>
    </WeddingSection>
  );
};
