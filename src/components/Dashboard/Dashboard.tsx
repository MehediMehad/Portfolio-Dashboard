"use client";

import ProfileImage from "./ProfileImage";
import BasicInfoForm from "./BasicInfoForm";
import SkillsSection from "./SkillsSection";
import SocialLinksSection from "./SocialLinksSection";
import SaveButton from "./SaveButton";
import AboutMeSection from "./AboutMe";
import HiddenFileInput from "./HiddenFileInput";
import { updateProfile } from "@/actions/MyInfo";
import { useState, useRef } from "react";
import { TMyInfo, TSkill, TSocialMedia } from "@/types";

type TDashboardprops = {
  myInfo: TMyInfo;
  skillData: TSkill[];
  socialMediaData: TSocialMedia[];
};

export default function Dashboard({
  myInfo,
  skillData,
  socialMediaData,
}: TDashboardprops) {
  // Profile state
  const [profile, setProfile] = useState({
    name: myInfo.name || "",
    designation: myInfo.designation || "",
    email: myInfo.email || "",
    phone: myInfo.contactNumber || "",
    address: myInfo.address || "",
    aboutMe: myInfo.aboutMe || "",
    profilePhoto: myInfo.profilePhoto || "",
  });

  // Skills state
  const [skills, setSkills] = useState(
    skillData || [
      {
        id: "1",
        name: "Tailwind CSS",
        level: "Expert",
        icon: "/icons/tailwind.svg",
      },
      {
        id: "2",
        name: "JavaScript",
        level: "Expert",
        icon: "/icons/javascript.svg",
      },
      {
        id: "3",
        name: "React",
        level: "Intermediate",
        icon: "/icons/react.svg",
      },
      {
        id: "4",
        name: "Node.js",
        level: "Beginner",
        icon: "/icons/nodejs.svg",
      },
    ]
  );

  // Social links state
  const [socialLinks, setSocialLinks] = useState(
    socialMediaData || [
      {
        id: "1",
        platformName: "GitHub",
        url: "https://github.com/username  ",
        icon: "/icons/github.svg",
      },
      {
        id: "2",
        platformName: "LinkedIn",
        url: "https://linkedin.com/in/username  ",
        icon: "/icons/linkedin.svg",
      },
      {
        id: "3",
        platformName: "Twitter",
        url: "https://twitter.com/username  ",
        icon: "/icons/twitter.svg",
      },
    ]
  );

  // Form state
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(
    myInfo?.profilePhoto
  );

  // File input reference
  const fileInputRef = useRef<HTMLInputElement>(
    null
  ) as React.RefObject<HTMLInputElement>;

  // Handle profile changes
  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle skill deletion
  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  // Handle skill update
  const handleUpdateSkill = (
    id: string,
    data: { name: string; level: string; icon: string }
  ) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id === id) {
          return { ...skill, ...data };
        }
        return skill;
      })
    );
  };

  // Add new skill
  const handleAddSkill = () => {
    const newSkill = {
      name: "New Skill",
      level: "Beginner",
      icon: "",
      isNew: true,
    };

    setSkills((prev) => [...prev, newSkill]);
  };

  // Handle social link deletion
  const handleDeleteSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  // Handle social link update
  const handleUpdateSocialLink = (
    id: string,
    data: { platformName: string; url: string; icon: string }
  ) => {
    setSocialLinks((prev) =>
      prev.map((link) => {
        if (link.id === id) {
          return { ...link, ...data };
        }
        return link;
      })
    );
  };

  // Add new social link
  const handleAddSocialLink = () => {
    const newSocialMedia = {
      id: Date.now().toString(),
      platformName: "New Platform",
      url: "",
      icon: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isNew: true,
    };

    setSocialLinks((prev) => [...prev, newSocialMedia]);
  };

  // Save all changes
  const handleSaveChanges = async () => {
    setIsLoading(true);
    const formData = new FormData();

    const profileData = {
      name: profile.name,
      designation: profile.designation,
      email: profile.email,
      address: profile.address,
      aboutMe: profile.aboutMe,
      contactNumber: profile.phone,
    };

    formData.append("data", JSON.stringify(profileData));

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      const res = await updateProfile(formData);
      if (res?.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        alert("Failed to save: " + (res.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Components */}
      <HiddenFileInput
        fileInputRef={fileInputRef}
        handleImageChange={handleImageChange}
      />
      {isSaved && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-400 rounded-lg w-full">
          Changes saved successfully!
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-bold">Profile Settings</h1>
        <SaveButton
          isLoading={isLoading}
          isSaved={isSaved}
          handleSaveChanges={handleSaveChanges}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Profile Card */}
        <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 flex flex-col items-center">
          <ProfileImage
            imagePreview={imagePreview}
            triggerFileInput={triggerFileInput}
          />
          <h2 className="text-white text-xl font-bold">{profile.name}</h2>
          <p className="text-[#a855f7] mt-1">{profile.designation}</p>
        </div>
        {/* Basic Information */}
        <div className="md:col-span-2 bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6">
          <h2 className="text-white text-xl font-bold mb-6">
            Basic Information
          </h2>
          <BasicInfoForm
            profile={{
              name: profile.name,
              designation: profile.designation,
              email: profile.email,
              phone: profile.phone,
              address: profile.address,
              aboutMe: profile.aboutMe,
            }}
            handleProfileChange={handleProfileChange}
          />
        </div>
      </div>

      <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
        <AboutMeSection
          about={profile.aboutMe}
          handleProfileChange={handleProfileChange}
        />
      </div>

      <SkillsSection
        setSkills={setSkills}
        skills={skills}
        handleAddSkill={handleAddSkill}
        handleDeleteSkill={handleDeleteSkill}
        handleUpdateSkill={handleUpdateSkill}
      />

      <SocialLinksSection
        socialLinks={socialLinks}
        setSocialLinks={setSocialLinks}
        handleAddSocialLink={handleAddSocialLink}
        handleDeleteSocialLink={handleDeleteSocialLink}
        handleUpdateSocialLink={handleUpdateSocialLink}
      />
    </>
  );
}
