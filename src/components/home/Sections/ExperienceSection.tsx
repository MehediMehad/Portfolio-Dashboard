import ExperienceCard from "@/components/ui/card/ExperienceCard";
import { experiences } from "@/lib/mock/experiences";

const ExperienceSection = () => {
  return (
    <div className="container mx-auto mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[#a855f7] text-3xl font-bold">Experience</h2>
        <div className="h-1 bg-gradient-to-r from-[#a855f7] to-transparent flex-grow ml-4 rounded-full"></div>
      </div>
      <div className="space-y-6">
        {experiences.map((experience) => (
          <ExperienceCard key={experience.id} experience={experience} />
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;
