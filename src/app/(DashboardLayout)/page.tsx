import { getMyInfo } from "@/actions/MyInfo";
import { getAllSkills } from "@/actions/Skils";
import Dashboard from "@/components/Dashboard/Dashboard";
import { TMyInfo, TSkill } from "@/types";

const DashboardPage = async () => {
  const data = await getMyInfo();
  const skillData = await getAllSkills();
  const myInfo: TMyInfo = data.data;
  return (
    <>
      <Dashboard myInfo={myInfo} skillData={skillData.data} />
    </>
  );
};

export default DashboardPage;
