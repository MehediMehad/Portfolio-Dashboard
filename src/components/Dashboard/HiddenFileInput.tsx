type HiddenFileInputProps = {
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function HiddenFileInput({
  fileInputRef,
  handleImageChange,
}: HiddenFileInputProps) {
  return (
    <input
      type="file"
      ref={fileInputRef}
      className="hidden"
      accept="image/*"
      onChange={handleImageChange}
    />
  );
}
