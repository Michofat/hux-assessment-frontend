import React from "react";
import { useForm } from "react-hook-form";

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

        <p className="mt-4 text-gray-500">
          For signing up, please provide a valid email address and a password
          containing at least 8 characters.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              id="email"
              {...register("email")}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
            />

            {errors.email && (
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </span>
            )}
          </div>

          {errors.email && (
            <p className="text-sm text-red-500">Invalid email</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type="password"
              id="password"
              {...register("password")}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />

            {errors.password && (
              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </span>
            )}
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">Invalid password</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?
            <a className="underline" href="#">
              Sign up
            </a>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
