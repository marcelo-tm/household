import { Outlet } from "react-router-dom";

export default function SignedOffLayout() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        <h1>Household</h1>

        <Outlet />
      </div>
    </div>
  );
}
