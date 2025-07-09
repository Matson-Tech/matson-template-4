import { HeartIcon } from "lucide-react";
import type React from "react";
import { useWedding } from "@/contexts/WeddingContext";

const Footer: React.FC = () => {
    const { weddingData } = useWedding();

    return (
        <div className="flex flex-col items-center justify-between p-8 bg-gradient-to-br from-pink-100 to-rose-200 border-t-2 border-pink-600/20">
            <div className="flex flex-row gap-3 font-serif font-medium text-md mb-5 text-pink-600">
                <HeartIcon
                    className="text-pink-600"
                    strokeWidth={1}
                    size={25}
                />
                <p>
                    {`${weddingData.couple.groomName[0]} & ${weddingData.couple.brideName[0]}`}{" "}
                    Wedding
                </p>
                <HeartIcon
                    className="text-pink-600"
                    strokeWidth={1}
                    size={25}
                />
            </div>
            <p className="text-sm mb-5">
                Thank you for being a part of our wedding
            </p>
            <p className="text-xs text-gray-500">
                © {new Date(Date.now()).getFullYear()} Matson Wedding Websites
            </p>
        </div>
    );
};

export default Footer;
