type TSkillCardProps = {
  icon: React.ReactNode;
  name: string;
  className?: string;
};

const SkillCard = ({ icon, name, className = "" }: TSkillCardProps) => {
  return (
    <div
      className={`border border-borderPrimary rounded-lg p-4 flex items-center overflow-hidden hover:shadow-lg hover:shadow-[#a855f7]/10 transition-all duration-300 ${className}`}
    >
      <div className="mr-3">{icon}</div>
      <div>
        <p className="text-white">{name}</p>
      </div>
    </div>
  );
};

export default SkillCard