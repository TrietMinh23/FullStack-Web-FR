import SideBar from "./components/SideBar";
import { Outlet } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="profile-container">
      <div>
        <SideBar />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
