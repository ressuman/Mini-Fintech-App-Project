import { Button, Card, Input, Link } from "@nextui-org/react";
import { FaEyeSlash } from "react-icons/fa6";
import { TbEyeFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[url('https://images.pexels.com/photos/128878/the-last-shirt-dollar-bill-20-euro-folded-128878.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-no-repeat bg-cover">
      <Card className="bg-transparent px-5 py-16" isBlurred>
        <form onSubmit={""}>
          <h4 className="font-bold text-3xl text-white">Login</h4>
          <Input
            type="email"
            label="Email"
            className="mt-7 max-w-xl"
            ///
            errorMessage="Please enter your last name"
          />
          <Input
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                // onClick={toggleVisibility}
              >
                {/* {isVisible ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <TbEyeFilled className="text-2xl text-default-400 pointer-events-none" />
                )} */}
              </button>
            }
            //type={isVisible ? "text" : "password"}
            className="mt-7"
            ///
            errorMessage="Please enter your password"
          />
          <Button
            className="mt-7 w-full py-6"
            type="submit"
            color="primary"
            ///
          >
            Sign In
          </Button>
        </form>
        <div className="mt-10">
          <p className="text-white">
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
