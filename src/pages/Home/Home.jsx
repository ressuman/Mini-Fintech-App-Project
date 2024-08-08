import { Link } from "@nextui-org/react";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-x-4 bg-[url('https://images.pexels.com/photos/6348118/pexels-photo-6348118.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-no-repeat bg-cover object-cover before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:opacity-70 top-0 right-0 -z-30">
      <h1 className="text-7xl text-white font-extrabold relative uppercase text-center">
        Ressuman Mini Fintech Bank App
      </h1>
      <h3 className="my-10 relative text-white text-2xl">
        Send , receive and view transactions
      </h3>
      <div className="flex gap-x-10 relative">
        <Link
          href="/signup"
          className="text-white border border-white px-4 py-2 rounded-md"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="text-white border border-white px-4 py-2 rounded-md"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};
