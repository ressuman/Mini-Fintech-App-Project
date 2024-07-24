import { Link } from "@nextui-org/react";

export const Home = () => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center gap-x-4">
        <Link href="/signup">Sign Up</Link>
        <Link href="/login">Log In</Link>
      </div>
    </div>
  );
};
