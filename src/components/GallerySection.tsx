import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWedding } from "@/contexts/WeddingContext";
import EditableImage from "./Editable/EditableImage";
import { WeddingSection } from "./WeddingSection";
import FadeIn from "./animations/FadeIn";

export const GallerySection = () => {
    const { weddingData, updateGalleryImage } = useWedding();

    const displayImages = weddingData.gallery.slice(0, 6);

    return (
        <WeddingSection id="gallery" className="bg-[#e4c9f1]">
            <div className="space-y-12">
                <FadeIn delay={100}>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
                            Our Gallery
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Capturing the beautiful moments of our journey
                            together
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayImages.slice(0, 3).map((image, index) => (
                        <FadeIn
                            key={`fade-${image.id}`}
                            delay={(index + 1) * 100}
                        >
                            <EditableImage
                                onUpdate={updateGalleryImage}
                                key={`${image.id}-editable`}
                                index={index}
                                label={`Edit gallery image ${index + 1}`}
                                imageCaption={image.caption}
                                ImageCaptionAvailable
                                className="relative"
                            >
                                <div
                                    key={image.id}
                                    className="relative group aspect-square bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                                >
                                    <img
                                        src={image.url}
                                        alt={
                                            image.caption ||
                                            `Gallery image ${index + 1}`
                                        }
                                        className="w-full h-full object-cover cursor-pointer"
                                    />

                                    {/* Image caption */}
                                    {image.caption && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                                            <p className="text-sm">
                                                {image.caption}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </EditableImage>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={500} direction="up">
                    <div className="text-center">
                        <Button
                            asChild
                            className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3"
                        >
                            <Link to="/gallery">
                                <Camera className="h-5 w-5 mr-2" />
                                View All Photos
                            </Link>
                        </Button>
                    </div>
                </FadeIn>
            </div>
        </WeddingSection>
    );
};
