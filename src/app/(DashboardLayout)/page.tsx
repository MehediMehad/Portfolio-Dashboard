"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { User, Mail, Phone, MapPin, Plus, Save, Upload, RefreshCw } from "lucide-react"
import SkillItem from "@/components/Dashboard/SkillItem"
import SocialLinkItem from "@/components/Dashboard/SocialLinkItem"

export default function Dashboard() {
  // Profile state
  const [profile, setProfile] = useState({
    name: "Mehedi Mehad",
    designation: "React Developer",
    email: "jionkhan0@gmail.com",
    phone: "+880 123 456 7890",
    location: "Dhaka, Bangladesh",
    about:
      "As a front-end developer, I'm creating dynamic and responsive web experiences with HTML, CSS, Tailwind CSS, JavaScript, and React. My back-end skills include Node.js, Express.js, and MongoDB, along with strong version control expertise in Git and GitHub.",
    avatar: "/placeholder.svg?height=160&width=160",
  })

  // Skills state
  const [skills, setSkills] = useState([
    { id: "1", name: "Tailwind CSS", level: "Expert", icon: "/icons/tailwind.svg" },
    { id: "2", name: "JavaScript", level: "Expert", icon: "/icons/javascript.svg" },
    { id: "3", name: "React", level: "Intermediate", icon: "/icons/react.svg" },
    { id: "4", name: "Node.js", level: "Beginner", icon: "/icons/nodejs.svg" },
  ])

  // Social links state
  const [socialLinks, setSocialLinks] = useState([
    { id: "1", platform: "GitHub", url: "https://github.com/username", icon: "/icons/github.svg" },
    { id: "2", platform: "LinkedIn", url: "https://linkedin.com/in/username", icon: "/icons/linkedin.svg" },
    { id: "3", platform: "Twitter", url: "https://twitter.com/username", icon: "/icons/twitter.svg" },
  ])

  // Form state
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Handle profile changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle skill deletion
  const handleDeleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id))
  }

  // Handle skill update
  const handleUpdateSkill = (id: string, data: { name: string; level: string; icon: string }) => {
    setSkills((prev) =>
      prev.map((skill) => {
        if (skill.id === id) {
          return { ...skill, ...data }
        }
        return skill
      }),
    )
  }

  // Add new skill
  const handleAddSkill = () => {
    const newId = Date.now().toString()
    setSkills((prev) => [...prev, { id: newId, name: "New Skill", level: "Beginner", icon: "" }])
  }

  // Handle social link deletion
  const handleDeleteSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id))
  }

  // Handle social link update
  const handleUpdateSocialLink = (id: string, data: { platform: string; url: string; icon: string }) => {
    setSocialLinks((prev) =>
      prev.map((link) => {
        if (link.id === id) {
          return { ...link, ...data }
        }
        return link
      }),
    )
  }

  // Add new social link
  const handleAddSocialLink = () => {
    const newId = Date.now().toString()
    setSocialLinks((prev) => [...prev, { id: newId, platform: "GitHub", url: "https://github.com/", icon: "" }])
  }

  // Save all changes
  const handleSaveChanges = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show success message
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    } catch (error) {
      console.error("Error saving changes:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-white text-2xl font-bold">Profile Settings</h1>
        <button
          onClick={handleSaveChanges}
          disabled={isLoading}
          className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-4 py-2 rounded-lg transition-colors"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {isSaved && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500 text-green-400 rounded-lg">
          Changes saved successfully!
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Profile Image */}
        <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden relative">
              <Image
                src={profile.avatar || "/placeholder.svg"}
                alt="Profile"
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#a855f7] rounded-full p-2 text-white hover:bg-[#9333ea] transition-colors">
              <Upload size={16} />
            </button>
          </div>
          <h2 className="text-white text-xl font-bold">{profile.name}</h2>
          <p className="text-[#a855f7] mt-1">{profile.designation}</p>
        </div>

        {/* Basic Information */}
        <div className="md:col-span-2 bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6">
          <h2 className="text-white text-xl font-bold mb-6">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="designation" className="block text-gray-400 mb-2">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={profile.designation}
                onChange={handleProfileChange}
                className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-400 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-gray-400 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={profile.location}
                  onChange={handleProfileChange}
                  className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
        <h2 className="text-white text-xl font-bold mb-6">About Me</h2>
        <textarea
          id="about"
          name="about"
          value={profile.about}
          onChange={handleProfileChange}
          rows={5}
          className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors resize-none"
        ></textarea>
      </div>

      {/* Skills */}
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
              <p>No skills added yet. Click the "Add Skill" button to add your first skill.</p>
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-[#120b20] border border-[#2d1b4d] rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Social Media Links</h2>
          <button
            onClick={handleAddSocialLink}
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
              platform={link.platform}
              url={link.url}
              icon={link.icon}
              onDelete={handleDeleteSocialLink}
              onUpdate={handleUpdateSocialLink}
            />
          ))}

          {socialLinks.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No social links added yet. Click the "Add Link" button to add your first social media link.</p>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveChanges}
          disabled={isLoading}
          className="flex items-center gap-2 bg-[#a855f7] hover:bg-[#9333ea] text-white px-6 py-3 rounded-lg transition-colors"
        >
          {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {isLoading ? "Saving Changes..." : "Save All Changes"}
        </button>
      </div>
    </div>
  )
}
