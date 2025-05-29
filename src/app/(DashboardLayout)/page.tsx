import { getMyInfo } from "@/actions/MyInfo";
import { getAllSkills } from "@/actions/Skils";
import { getAllSocialMedias } from "@/actions/SocialMedia";
import Dashboard from "@/components/Dashboard/Dashboard";
import { TMyInfo } from "@/types";

const DashboardPage = async () => {
  const data = await getMyInfo();
  const skillData = await getAllSkills();
  const socialMediaData = await getAllSocialMedias();
  const myInfo: TMyInfo = data.data;
  return (
    <>
      <Dashboard
        myInfo={myInfo}
        skillData={skillData.data}
        socialMediaData={socialMediaData.data}
      />
    </>
  );
};

export default DashboardPage;
