import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function SignedInLayout() {
  const navigate = useNavigate();

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return console.log(error);
    }

    return navigate("/");
  }

  return (
    <>
      <h1>Signed In Layout</h1>

      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>

      <Outlet />
    </>
  );
}
