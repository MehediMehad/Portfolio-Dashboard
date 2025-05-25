"use client";
import { Plus } from "lucide-react";
import SkillItem from "@/components/Dashboard/SkillItem";
import { TSkill } from "@/types";
import { useState } from "react";
import AddSkillModal from "./add-skill-modal";

type SkillsSectionProps = {
  skills: TSkill[];
  setSkills: React.Dispatch<React.SetStateAction<TSkill[]>>;
  handleAddSkill: () => void;
  handleDeleteSkill: (id: string) => void;
  handleUpdateSkill: (
    id: string,
    data: { name: string; level: string; icon: string }
  ) => void;
};

export default function SkillsSection({
  skills,
  setSkills,
  handleDeleteSkill,
  handleUpdateSkill,
}: SkillsSectionProps) {
  const [isAddSkillModalOpen, setIsAddSkillModalOpen] = useState(false);

  // Add new skill from modal
  const handleAddSkillFromModal = (skillData: {
    name: string;
    level: string;
    icon: string;
  }) => {
    const newId = Date.now().toString();
    const newSkill = {
      id: newId,
      ...skillData,
      isNew: false,
    };
    setSkills((prev) => [...prev, newSkill]);
  };

  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-bold">Skills</h2>
        <button
          onClick={() => setIsAddSkillModalOpen(true)}
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
            id={skill.id ?? ""}
            name={skill.name ?? ""}
            level={skill.level ?? ""}
            icon={skill.icon ?? ""}
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
      {/* Add Skill Modal */}
      <AddSkillModal
        isOpen={isAddSkillModalOpen}
        onClose={() => setIsAddSkillModalOpen(false)}
        onAdd={handleAddSkillFromModal}
      />
    </div>
  );
}
