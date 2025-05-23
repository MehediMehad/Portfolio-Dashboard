import { Save, RefreshCw } from "lucide-react";

type SaveButtonProps = {
  isLoading: boolean;
  isSaved: boolean;
  handleSaveChanges: () => void;
};

export default function SaveButton({
  isLoading,
  isSaved,
  handleSaveChanges,
}: SaveButtonProps) {
  return (
    <div className="">
      <div className="flex justify-end">
        <button
          onClick={handleSaveChanges}
          disabled={isLoading}
          className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-6 py-3 rounded-lg transition-colors"
        >
          {isLoading ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {isLoading ? "Saving Changes..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
