import Image from "next/image";
import { Upload } from "lucide-react";

interface ImageInputProps {
  image: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageInput({ image, onChange }: ImageInputProps) {
  return (
    <div className="mb-6">
      <label htmlFor="image" className="block text-gray-400 mb-2">
        Featured Image
      </label>
      <div className="flex items-start gap-4">
        <div className="relative w-32 h-24 bg-[#1a1025] border border-[#2d1b4d] rounded-lg overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt="Blog preview"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            id="image"
            name="image"
            value={image}
            onChange={onChange}
            className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
            placeholder="/path/to/image.jpg"
          />
          <p className="text-gray-500 text-sm mt-1">
            Enter image URL or upload an image (upload functionality coming
            soon)
          </p>
          <button className="mt-2 flex items-center gap-2 bg-[#2d1b4d] hover:bg-[#3d2b5d] text-white px-3 py-1.5 rounded text-sm transition-colors">
            <Upload size={14} />
            Upload Image
          </button>
        </div>
      </div>
    </div>
  );
}
