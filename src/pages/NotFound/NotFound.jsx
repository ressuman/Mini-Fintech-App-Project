import { Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <p>Page not Found.</p>
      <p>
        go back to home page{" "}
        <Link href="/dashboard" className="underline">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
