import { ArrowLeft, Camera, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FadeIn from "@/components/animations/FadeIn";
import DeletableItem from "@/components/Editable/DeleteableItem";
import EditableImage from "@/components/Editable/EditableImage";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import Loading from "@/components/ui-custome/Loading/Loading";
import { useWedding } from "@/contexts/WeddingContext";
import deleteImage from "@/utils/deleteImage";
import messageOnUpdate, { useCase } from "@/utils/messageOnUpdate";
import scrollToElement from "@/utils/scrollTo";

const AllImages = () => {
    const {
        weddingData,
        updateGalleryImage,
        isLoggedIn,
        globalIsLoading,
        user,
        updateWeddingData,
    } = useWedding();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

    // Create a grid that shows existing images and empty slots for new uploads
    const maxImages = isLoggedIn
        ? import.meta.env.VITE_GALLERY_IMAGE_LIMIT || 12
        : weddingData.gallery.length;
    const allSlots = Array.from({ length: maxImages }, (_, index) => {
        return (
            weddingData.gallery[index] || {
                id: `empty-${index}`,
                url: "",
                caption: null,
            }
        );
    });

    useLayoutEffect(() => window.scrollTo(0, 0), []);

    const handleDelete = async (name: string, indexToRemove: number) => {
        const updatedGallery = [...weddingData.gallery];
        updatedGallery.splice(indexToRemove, 1);

        const updated = await deleteImage(user, name);

        if (!updated) {
            return;
        }

        const isUpdated = await updateWeddingData({ gallery: updatedGallery });
        messageOnUpdate(isUpdated, "photo", useCase.Delete);
    };

    const handleUpdate = async (
        newImage: File | null,
        imageCaption?: string,
        index?: number,
    ) => {
        setUploadingIndex(index);
        await updateGalleryImage(newImage, imageCaption, index);
        setUploadingIndex(null);
    };

    if (globalIsLoading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-purple-200">
            <Header Fixed />
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
                        <p className="sub-text">
                            Our beautiful moments captured in time
                        </p>
                    </div>

                    {/* Images Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {allSlots.map((image, index) => (
                            <FadeIn
                                key={`fade-${image.id}`}
                                delay={(index + 1) * 100}
                            >
                                <DeletableItem
                                    onDelete={() =>
                                        handleDelete(
                                            `gallery_image_${index}`,
                                            index,
                                        )
                                    }
                                    iconClassName={
                                        index >= weddingData.gallery.length &&
                                        "hidden"
                                    }
                                >
                                    <EditableImage
                                        onUpdate={handleUpdate}
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
                                            {image.url && (
                                                <img
                                                    src={image.url}
                                                    alt={
                                                        image.caption ||
                                                        `Gallery image ${index + 1}`
                                                    }
                                                    className="w-full h-full object-cover cursor-pointer"
                                                    onClick={() =>
                                                        setSelectedImage(
                                                            image.url,
                                                        )
                                                    }
                                                    onKeyDown={() =>
                                                        setSelectedImage(
                                                            image.url,
                                                        )
                                                    }
                                                />
                                            )}
                                            {/* Image caption */}
                                            {image.caption && (
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                                                    <p className="text-xs">
                                                        {image.caption}
                                                    </p>
                                                </div>
                                            )}
                                            {isLoggedIn && ( // Empty slot
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                                                    {isLoggedIn && (
                                                        <span className="cursor-pointer flex flex-col items-center space-y-2 p-4 hover:bg-gray-50 transition-colors rounded-lg">
                                                            {uploadingIndex ===
                                                            index ? (
                                                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <Camera className="h-8 w-8 text-gray-400" />
                                                                    <span className="text-sm text-gray-500 text-center">
                                                                        Upload
                                                                        Photo
                                                                    </span>
                                                                </>
                                                            )}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </EditableImage>
                                </DeletableItem>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
            {/* Image preview modal */}
            <Dialog
                open={!!selectedImage}
                onOpenChange={() => setSelectedImage(null)}
            >
                <DialogContent
                    className="md:max-w-4xl md:w-fit max-w-96 p-1 md:p-0 rounded-sm overflow-hidden"
                    closeButton={false}
                >
                    <DialogClose asChild>
                        <button
                            className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                            type="button"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </DialogClose>
                    <div className="relative">
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
            <Footer className="bg-purple-100 border-t-purple-300" />
        </div>
    );
};

export default AllImages;
