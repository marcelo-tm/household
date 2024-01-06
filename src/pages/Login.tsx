import { useForm } from "react-hook-form";
import { z } from "zod";

import { supabase } from "../lib/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInSchemaType = z.infer<typeof signInSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
  });

  async function signInWithEmail(formData: SignInSchemaType) {
    console.log(formData);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    console.log("DATA", data);
    console.log("ERROR", error?.message);
  }

  console.log("FORM ERRORS:", errors);

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(signInWithEmail)}>
        <label htmlFor="email">
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Email"
          />
        </label>

        <label htmlFor="password">
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Password"
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </>
  );
}
