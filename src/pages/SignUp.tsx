import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: "example@email.com",
      password: "example-password",
      options: {
        emailRedirectTo: "https//example.com/welcome",
      },
    });

    console.log("DATA", data);
    console.log("ERROR", error?.message);
  }

  return (
    <>
      <h1>Sign Up</h1>

      <form>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="button" onClick={signUpNewUser}>
          Submit
        </button>
      </form>
    </>
  );
}
