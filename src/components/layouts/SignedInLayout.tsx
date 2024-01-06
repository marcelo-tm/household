import { Outlet } from "react-router-dom";

export default function SignedInLayout() {
  return (
    <>
      <h1>Signed In Layout</h1>

      <Outlet />
    </>
  );
}
