"use client";

import { useState } from "react";
import { Trash2, GripVertical } from "lucide-react";
import Image from "next/image";

interface SocialLinkItemProps {
  id: string;
  platformName: string;
  url: string;
  icon: string;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: { platformName: string; url: string; icon: string }
  ) => void;
}

export default function SocialLinkItem({
  id,
  platformName,
  url,
  icon,
  onDelete,
  onUpdate,
}: SocialLinkItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [socialPlatform, setSocialPlatform] = useState(platformName);
  const [socialUrl, setSocialUrl] = useState(url);
  const [socialIcon, setSocialIcon] = useState(icon);

  const handleSave = () => {
    onUpdate(id, {
      platformName: socialPlatform,
      url: socialUrl,
      icon: socialIcon,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-[#1a1025] border border-[#2d1b4d] rounded-lg p-4 flex items-center gap-3">
      <div className="cursor-move text-gray-500">
        <GripVertical size={20} />
      </div>

      {isEditing ? (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor={`platform-${id}`}
              className="block text-gray-400 text-sm mb-1"
            >
              Platform
            </label>
            <select
              id={`platform-${id}`}
              value={socialPlatform}
              onChange={(e) => setSocialPlatform(e.target.value)}
              className="w-full bg-[#120b20] border border-[#2d1b4d] rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
            >
              <option value="GitHub">GitHub</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Twitter">Twitter</option>
              <option value="Facebook">Facebook</option>
              <option value="Instagram">Instagram</option>
              <option value="Dribbble">Dribbble</option>
              <option value="Behance">Behance</option>
              <option value="YouTube">YouTube</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor={`url-${id}`}
              className="block text-gray-400 text-sm mb-1"
            >
              URL
            </label>
            <input
              id={`url-${id}`}
              type="url"
              value={socialUrl}
              onChange={(e) => setSocialUrl(e.target.value)}
              className="w-full bg-[#120b20] border border-[#2d1b4d] rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
              placeholder="https://..."
            />
          </div>

          <div>
            <label
              htmlFor={`icon-${id}`}
              className="block text-gray-400 text-sm mb-1"
            >
              Icon
            </label>
            <input
              id={`icon-${id}`}
              type="text"
              value={socialIcon}
              onChange={(e) => setSocialIcon(e.target.value)}
              className="w-full bg-[#120b20] border border-[#2d1b4d] rounded px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-[#a855f7]"
              placeholder="Icon name or URL"
            />
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#120b20] rounded-full flex items-center justify-center text-[#a855f7] mr-3">
              {socialIcon ? (
                <Image
                  width={16}
                  height={16}
                  src={socialIcon || "/placeholder.svg"}
                  alt={socialPlatform}
                  className="w-4 h-4"
                />
              ) : (
                <div className="w-4 h-4 bg-[#a855f7] rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="text-white font-medium">{socialPlatform}</h3>
              <a
                href={socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#a855f7] hover:underline truncate block max-w-xs"
              >
                {socialUrl}
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-[#a855f7] text-white text-sm rounded hover:bg-[#9333ea] transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-[#2d1b4d] text-white text-sm rounded hover:bg-[#3d2b5d] transition-colors"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 bg-[#2d1b4d] text-white text-sm rounded hover:bg-[#3d2b5d] transition-colors"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete social link"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
