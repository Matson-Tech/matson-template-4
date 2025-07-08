
import { useState } from "react";
import { useWedding } from "@/contexts/WeddingContext";
import { WeddingSection } from "./WeddingSection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Camera, Upload, X } from "lucide-react";

export const GallerySection = () => {
  const { weddingData, updateGalleryImage, isLoggedIn } = useWedding();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file && isLoggedIn) {
      setUploadingIndex(index);
      await updateGalleryImage(file, weddingData.gallery[index]?.caption || null, index);
      setUploadingIndex(null);
    }
  };

  const displayImages = weddingData.gallery.slice(0, 6);

  return (
    <WeddingSection id="gallery" className="bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="space-y-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif mb-4">
            Our Gallery
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Capturing the beautiful moments of our journey together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((image, index) => (
            <div
              key={image.id}
              className="relative group aspect-square bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={image.url}
                alt={image.caption || `Gallery image ${index + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setSelectedImage(image.url)}
              />
              
              {/* Upload overlay for logged in users */}
              {isLoggedIn && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, index)}
                      className="hidden"
                      disabled={uploadingIndex === index}
                    />
                    <div className="bg-white rounded-full p-3 hover:bg-gray-100 transition-colors">
                      {uploadingIndex === index ? (
                        <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload className="h-6 w-6 text-gray-700" />
                      )}
                    </div>
                  </label>
                </div>
              )}

              {/* Image caption */}
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                  <p className="text-sm">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
            <Link to="/gallery">
              <Camera className="h-5 w-5 mr-2" />
              View All Photos
            </Link>
          </Button>
        </div>

        {/* Image preview modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-full p-0">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Gallery preview"
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </WeddingSection>
  );
};
