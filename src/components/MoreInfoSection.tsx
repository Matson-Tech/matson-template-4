
import { useWedding } from "@/contexts/WeddingContext";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export const MoreInfoSection = () => {
  const { weddingData } = useWedding();

  return (
    <WeddingSection id="info" className="bg-gradient-to-br from-green-100 to-teal-200">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-2xl md:text-3xl font-bold text-gray-800 font-serif">
              <Info className="h-6 w-6 text-teal-600" />
              <EditableText
                value={weddingData.moreInfo.title}
                path="moreInfo.title"
              />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <EditableText
              value={weddingData.moreInfo.content}
              path="moreInfo.content"
              multiline
              className="text-lg text-gray-700 leading-relaxed text-center"
            />
          </CardContent>
        </Card>
      </div>
    </WeddingSection>
  );
};
