import { Button, Card, Input, Link } from "@nextui-org/react";

export const SignUp = () => {
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-[url('https://images.pexels.com/photos/128878/the-last-shirt-dollar-bill-20-euro-folded-128878.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-no-repeat bg-cover">
        <Card className="bg-transparent px-5 py-16" isBlurred>
          <form onSubmit={""}>
            <h4 className="font-bold text-3xl text-white">
              Sign Up for an account
            </h4>
            <div className="flex gap-x-4 mt-7">
              <Input
                type="text"
                label="First Name"
                //
                isRequired
                //
                errorMessage="Please enter your first name"
              />
              <Input
                type="text"
                label="Last Name"
                //
                isRequired
                //
                errorMessage="Please enter your last name"
              />
            </div>
            <Input
              type="email"
              label="Email"
              className="mt-7"
              //
              isRequired
              //
              errorMessage="Please enter your last name"
            />
            <Input
              label="Password"
              endContent={
                <button className="focus:outline-none" type="button"></button>
              }
              className="mt-7"
              isRequired
              errorMessage="Please enter your password"
            />
            <Button className="mt-7 w-full py-6" type="submit" color="primary">
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
