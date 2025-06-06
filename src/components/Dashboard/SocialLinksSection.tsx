"use client";

import { Plus } from "lucide-react";
import SocialLinkItem from "@/components/Dashboard/SocialLinkItem";
import { TSocialMedia } from "@/types";
import { useState } from "react";
import AddSocialLinkModal from "./add-social-link-modal";

type SocialLinksSectionProps = {
  socialLinks: any[];
  setSocialLinks: React.Dispatch<React.SetStateAction<TSocialMedia[]>>;
  handleAddSocialLink: () => void;
  handleDeleteSocialLink: (id: string) => void;
  handleUpdateSocialLink: (
    id: string,
    data: { platformName: string; url: string; icon: string }
  ) => void;
};

export default function SocialLinksSection({
  socialLinks,
  setSocialLinks,
  handleDeleteSocialLink,
  handleUpdateSocialLink,
}: SocialLinksSectionProps) {
  const [isAddSocialLinksModalOpen, setIsAddSocialLinksModalOpen] =
    useState(false);
  // Add new skill from modal
  const handleAddSocialLinksFromModal = (socialLinksData: {
    platformName: string;
    url: string;
    icon: string;
  }) => {
    const newId = Date.now().toString();
    const newSocialLinksData = {
      id: newId,
      ...socialLinksData,
      isNew: false,
    };
    setSocialLinks((prev) => [...prev, newSocialLinksData]);
  };

  return (
    <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-white text-xl font-bold">Social Media Links</h2>
        <button
          onClick={() => setIsAddSocialLinksModalOpen(true)}
          className="flex items-center gap-2 bg-[#2d1b4d] hover:bg-[#3d2b5d] text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
        >
          <Plus size={16} />
          Add Link
        </button>
      </div>
      <div className="space-y-4">
        {socialLinks.map((link) => (
          <SocialLinkItem
            key={link.id}
            id={link.id}
            platformName={link.platformName}
            url={link.url}
            icon={link.icon}
            onDelete={handleDeleteSocialLink}
            onUpdate={handleUpdateSocialLink}
          />
        ))}
        {socialLinks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No social links added yet.</p>
          </div>
        )}
      </div>

      {/* Add SocialLink Modal */}
      <AddSocialLinkModal
        isOpen={isAddSocialLinksModalOpen}
        onClose={() => setIsAddSocialLinksModalOpen(false)}
        onAdd={handleAddSocialLinksFromModal}
      />
    </div>
  );
}
