import Image from "next/image";
import Link from "next/link";

import "./Header.css";

const Header = () => (
  <header className="header">
    <Link href="/">
      <span className="logoTitle">Carpool</span>
    </Link>

    <Image src="/logo.png" alt="Yoann Moise Logo" width={50} height={50} />

  </header>
);

export default Header;
