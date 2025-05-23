import { Plus } from "lucide-react";
import SkillItem from "@/components/Dashboard/SkillItem";

type SkillsSectionProps = {
  skills: any[];
  handleAddSkill: () => void;
  handleDeleteSkill: (id: string) => void;
  handleUpdateSkill: (
    id: string,
    data: { name: string; level: string; icon: string }
  ) => void;
};

export default function SkillsSection({
  skills,
  handleAddSkill,
  handleDeleteSkill,
  handleUpdateSkill,
}: SkillsSectionProps) {
  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-bold">Skills</h2>
        <button
          onClick={handleAddSkill}
          className="flex items-center gap-2 bg-[#2d1b4d] hover:bg-[#3d2b5d] text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
        >
          <Plus size={16} />
          Add Skill
        </button>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillItem
            key={skill.id}
            id={skill.id}
            name={skill.name}
            level={skill.level}
            icon={skill.icon}
            onDelete={handleDeleteSkill}
            onUpdate={handleUpdateSkill}
          />
        ))}
        {skills.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No skills added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
