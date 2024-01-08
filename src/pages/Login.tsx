import { useForm } from "react-hook-form";
import { z } from "zod";

import { supabase } from "../lib/supabaseClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

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

  async function handleSignInWithEmail(formData: SignInSchemaType) {
    const { email, password } = formData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("DATA", data);
    console.log("ERROR", error?.message);
  }

  return (
    <>
      <h1>Login</h1>

      <form
        onSubmit={handleSubmit(handleSignInWithEmail)}
        className="flex flex-col"
      >
        <label htmlFor="email">
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Email"
          />
          {errors.email && <span>{errors.email.message}</span>}
        </label>

        <label htmlFor="password">
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Password"
          />
          {errors.password && <span>{errors.password.message}</span>}
        </label>

        <button type="submit" disabled={isSubmitting}>
          Sign In
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/signup">Click here to create!</Link>
      </p>
    </>
  );
}
