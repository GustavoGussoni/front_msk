import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Link href={"/"} className="flex justify-center shadow-sm">
        <h1 className="text-pink-500 text-2xl font-semibold mb-6 hover:cursor-pointer  hover:border-blue-400">
          Gussoni<span>Music</span>
        </h1>
      </Link>
    </div>
  );
};

export default Header;
