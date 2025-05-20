import EducationCard from "@/components/ui/card/EducationCard";
import { education } from "@/lib/mock/education";

const EducationSection = () => {
  return (
   <div className="container mx-auto mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#a855f7] text-3xl font-bold">Education</h2>
          <div className="h-1 bg-gradient-to-r from-[#a855f7] to-transparent flex-grow ml-4 rounded-full"></div>
        </div>
        <div className="space-y-6">
          {education.map((edu) => (
            <EducationCard key={edu.id} education={edu} />
          ))}
        </div>
      </div>
  );
};

export default EducationSection;