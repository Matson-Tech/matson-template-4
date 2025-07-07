
import { useWedding } from "@/contexts/WeddingContext";
import { EditableText } from "./EditableText";
import { WeddingSection } from "./WeddingSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Shirt, Gift, Music } from "lucide-react";

export const DetailsSection = () => {
  const { weddingData } = useWedding();

  const infoCards = [
    {
      icon: <Shirt className="h-6 w-6" />,
      title: weddingData.weddingDetails.toKnow2.title,
      description: weddingData.weddingDetails.toKnow2.description,
      path: "weddingDetails.toKnow2"
    },
    {
      icon: <Gift className="h-6 w-6" />,
      title: weddingData.weddingDetails.toKnow1.title,
      description: weddingData.weddingDetails.toKnow1.description,
      path: "weddingDetails.toKnow1"
    },
    {
      icon: <Music className="h-6 w-6" />,
      title: weddingData.weddingDetails.toKnow3.title,
      description: weddingData.weddingDetails.toKnow3.description,
      path: "weddingDetails.toKnow3"
    }
  ];

  return (
    <WeddingSection id="details" className="bg-white">
      <div className="space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 font-serif">
          The Basic Stuff
        </h2>

        {/* Event Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Ceremony */}
          <Card className="border-pink-200 shadow-lg">
            <CardHeader className="bg-pink-50">
              <CardTitle className="flex items-center space-x-2 text-pink-700">
                <MapPin className="h-5 w-5" />
                <EditableText
                  value={weddingData.weddingDetails.event1.title}
                  path="weddingDetails.event1.title"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <EditableText
                  value={`${weddingData.weddingDetails.event1.date} at ${weddingData.weddingDetails.event1.time}`}
                  path="weddingDetails.event1.date"
                />
              </div>
              <EditableText
                value={weddingData.weddingDetails.event1.venue}
                path="weddingDetails.event1.venue"
                className="font-medium text-gray-800"
              />
              <EditableText
                value={weddingData.weddingDetails.event1.address}
                path="weddingDetails.event1.address"
                className="text-gray-600 text-sm"
              />
            </CardContent>
          </Card>

          {/* Reception */}
          <Card className="border-blue-200 shadow-lg">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center space-x-2 text-blue-700">
                <MapPin className="h-5 w-5" />
                <EditableText
                  value={weddingData.weddingDetails.event2.title}
                  path="weddingDetails.event2.title"
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <EditableText
                  value={`${weddingData.weddingDetails.event2.date} at ${weddingData.weddingDetails.event2.time}`}
                  path="weddingDetails.event2.date"
                />
              </div>
              <EditableText
                value={weddingData.weddingDetails.event2.venue}
                path="weddingDetails.event2.venue"
                className="font-medium text-gray-800"
              />
              <EditableText
                value={weddingData.weddingDetails.event2.address}
                path="weddingDetails.event2.address"
                className="text-gray-600 text-sm"
              />
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {infoCards.map((card, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-2 text-pink-500">
                  {card.icon}
                </div>
                <CardTitle className="text-lg">
                  <EditableText
                    value={card.title}
                    path={`${card.path}.title`}
                  />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EditableText
                  value={card.description}
                  path={`${card.path}.description`}
                  multiline
                  className="text-gray-600 text-sm"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </WeddingSection>
  );
};
