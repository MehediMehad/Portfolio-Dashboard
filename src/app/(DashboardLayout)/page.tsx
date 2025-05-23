import { getMyInfo } from "@/actions/MyInfo";
import Dashboard from "@/components/Dashboard/Dashboard";
import { TMyInfo } from "@/types";

const DashboardPage = async () => {
  const data = await getMyInfo();
  const myInfo: TMyInfo = data.data;
  return (
    <>
      <Dashboard myInfo={myInfo} />
    </>
  );
};

export default DashboardPage;
