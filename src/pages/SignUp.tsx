import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

const signUpSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Name is required." }),
  lastName: z.string().trim().min(1, { message: "Name is required." }),
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignUpSchemaType = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });

  async function handleSignUp(formData: SignUpSchemaType) {
    const { firstName, lastName, email, password } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    console.log("DATA", data);
    console.log("ERROR", error?.message);
  }

  return (
    <>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col">
        <label htmlFor="firstName">
          <input
            {...register("firstName")}
            type="firstName"
            id="firstName"
            placeholder="First name"
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
        </label>

        <label htmlFor="lastName">
          <input
            {...register("lastName")}
            type="lastName"
            id="lastName"
            placeholder="Last name"
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
        </label>

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
          Sign Up
        </button>
      </form>

      <p>
        Already have an account? <Link to="/">Click here to sign in!</Link>
      </p>
    </>
  );
}
