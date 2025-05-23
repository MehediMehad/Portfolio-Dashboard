type AboutMeSectionProps = {
  about: string;
  handleProfileChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function AboutMeSection({
  about,
  handleProfileChange,
}: AboutMeSectionProps) {
  return (
    <div>
      <h2 className="text-white text-xl font-bold mb-6">About Me</h2>
      <textarea
        id="aboutMe"
        name="aboutMe"
        value={about}
        onChange={handleProfileChange}
        rows={5}
        className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors resize-none"
      ></textarea>
    </div>
  );
}
