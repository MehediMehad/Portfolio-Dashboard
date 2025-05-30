import { X } from "lucide-react";

interface SuccessMessageProps {
  message: string;
  onClose: () => void;
}

export default function SuccessMessage({
  message,
  onClose,
}: SuccessMessageProps) {
  return (
    <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-400 rounded-lg flex justify-between items-center">
      <p>{message}</p>
      <button onClick={onClose} className="text-green-400 hover:text-green-300">
        <X size={18} />
      </button>
    </div>
  );
}
