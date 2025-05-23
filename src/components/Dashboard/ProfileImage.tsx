import Image from "next/image";
import { Upload } from "lucide-react";

type ProfileImageProps = {
  imagePreview: string;
  triggerFileInput: () => void;
};

export default function ProfileImage({
  imagePreview,
  triggerFileInput,
}: ProfileImageProps) {
  return (
    <div className="relative mb-4">
      <div className="w-32 h-32 rounded-full overflow-hidden relative">
        <Image
          src={imagePreview}
          alt="Profile"
          width={128}
          height={128}
          className="object-cover"
        />
      </div>
      <button
        type="button"
        onClick={triggerFileInput}
        className="absolute bottom-0 right-0 bg-[#a855f7] rounded-full p-2 text-white hover:bg-[#9333ea] transition-colors"
      >
        <Upload size={16} />
      </button>
    </div>
  );
}
