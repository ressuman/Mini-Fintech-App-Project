import { Button, Card, Input, Link } from "@nextui-org/react";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { FaEyeSlash } from "react-icons/fa6";
import { TbEyeFilled } from "react-icons/tb";

import { db, signUp } from "../../firebase/firebaseSDK/config";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const SignUp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;

      const res = await signUp(email, password);

      setDoc(doc(db, "users", res.user.uid), {
        ...data,
        balance: 0,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    reset();
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-[url('https://images.pexels.com/photos/128878/the-last-shirt-dollar-bill-20-euro-folded-128878.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-no-repeat bg-cover">
        <Card className="bg-transparent px-5 py-16" isBlurred>
          <form onSubmit={handleSubmit(submitHandler)}>
            <h4 className="font-bold text-3xl text-white">
              Sign Up for an account
            </h4>
            <div className="flex gap-x-4 mt-7">
              <Input
                type="text"
                label="First Name"
                {...register("firstName", { required: true })}
                isRequired
                isInvalid={!!errors.firstName}
                errorMessage="Please enter your first name"
              />
              <Input
                type="text"
                label="Last Name"
                {...register("lastName", { required: true })}
                isRequired
                isInvalid={!!errors.lastName}
                errorMessage="Please enter your last name"
              />
            </div>
            <Input
              type="email"
              label="Email"
              className="mt-7"
              {...register("email", { required: true })}
              isRequired
              isInvalid={!!errors.email}
              errorMessage="Please enter your last name"
            />
            <Input
              label="Password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="mt-7"
              {...register("password", { required: true })}
              isRequired
              isInvalid={!!errors.password}
              errorMessage="Please enter your password"
            />
            <Button
              className="mt-7 w-full py-6"
              type="submit"
              color="primary"
              isLoading={loading}
            >
              Sign In
            </Button>
          </form>
          <div className="mt-10">
            <p className="text-white">
              Have an account? <Link href="/login">Log In</Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
