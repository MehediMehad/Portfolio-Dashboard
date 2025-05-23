import { User, Mail, Phone, MapPin } from "lucide-react";

type BasicInfoFormProps = {
  profile: {
    name: string;
    designation: string;
    email: string;
    phone: string;
    address: string;
    aboutMe: string;
  };
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function BasicInfoForm({
  profile,
  handleProfileChange,
}: BasicInfoFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="name" className="block text-gray-400 mb-2">
          Full Name
        </label>
        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
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
          <Mail
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="email"
            id="email"
            name="email"
            disabled={true}
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
          <Phone
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
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
          <MapPin
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            id="location"
            name="address"
            value={profile.address}
            onChange={handleProfileChange}
            className="w-full bg-[#1a1025] border border-[#2d1b4d] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#a855f7] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
