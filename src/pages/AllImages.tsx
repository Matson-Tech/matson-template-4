
import { useState } from "react";
import { useWedding } from "@/contexts/WeddingContext";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ArrowLeft, Upload, X, Camera } from "lucide-react";

const AllImages = () => {
  const { weddingData, updateGalleryImage, isLoggedIn, globalIsLoading } = useWedding();
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

  // Create a grid that shows existing images and empty slots for new uploads
  const maxImages = 12;
  const allSlots = Array.from({ length: maxImages }, (_, index) => {
    return weddingData.gallery[index] || {
      id: `empty-${index}`,
      url: "",
      caption: null
    };
  });

  if (globalIsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-gray-700">Loading gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <Button asChild variant="outline" className="mb-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Wedding Website
              </Link>
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              Wedding Gallery
            </h1>
            <p className="text-lg text-gray-600">
              Our beautiful moments captured in time
            </p>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allSlots.map((image, index) => (
              <div
                key={image.id}
                className="relative group aspect-square bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {image.url ? (
                  <>
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
                              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Upload className="h-6 w-6 text-gray-700" />
                            )}
                          </div>
                        </label>
                      </div>
                    )}

                    {/* Image caption */}
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                        <p className="text-xs">{image.caption}</p>
                      </div>
                    )}
                  </>
                ) : (
                  // Empty slot
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                    {isLoggedIn ? (
                      <label className="cursor-pointer flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 transition-colors rounded-lg">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, index)}
                          className="hidden"
                          disabled={uploadingIndex === index}
                        />
                        {uploadingIndex === index ? (
                          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <Camera className="h-8 w-8 text-gray-400" />
                            <span className="text-sm text-gray-500 text-center">Upload Photo</span>
                          </>
                        )}
                      </label>
                    ) : (
                      <div className="flex flex-col items-center space-y-2 text-gray-400">
                        <Camera className="h-8 w-8" />
                        <span className="text-sm">Photo Slot</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
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
  );
};

export default AllImages;
