import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardPage = () => {
  const isUser = true;
  return <div>{isUser ? <UserDashboard /> : <RiderDashboard />}</div>;
};

export default DashboardPage;
