import {
  ExpressIcon,
  FirebaseIcon,
  JavaScriptIcon,
  MongoIcon,
  NextIcon,
  NodeIcon,
  ReactIcon,
  TailwindIcon,
} from "../homeComponents/Icons";
import SkillCard from "../../ui/card/SkillCard";

const SkillsSection = () => {
  return (
    <section className="bg-[#120b20] rounded-lg p-6 ">
      <h2 className="text-textPrimary text-2xl font-bold mb-4">
        Programming Skills
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SkillCard icon={<TailwindIcon />} name="Tailwind CSS" />
        <SkillCard icon={<JavaScriptIcon />} name="Javascript" />
        <SkillCard icon={<ReactIcon />} name="React Js" />
        <SkillCard icon={<ExpressIcon />} name="Express Js" />
        <SkillCard icon={<NodeIcon />} name="Node js" />
        <SkillCard icon={<MongoIcon />} name="Mongo DB" />
        <SkillCard icon={<NextIcon />} name="Next JS" />
        <SkillCard icon={<FirebaseIcon />} name="Firebase" />
      </div>
    </section>
  );
};

export default SkillsSection;
