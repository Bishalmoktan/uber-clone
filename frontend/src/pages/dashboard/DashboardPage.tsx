import RiderDashboard from "./RiderDashboard";
import UserDashboard from "./UserDashboard";

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");

  const isUser = user.vehicle ? false : true;
  return <div>{isUser ? <UserDashboard /> : <RiderDashboard />}</div>;
};

export default DashboardPage;
