import Link from "next/link";

import Image from "next/image";

import "./Header.css";

const Header = () => (
  <header className="header">
    <Link href="/">
      <span className="logoTitle">Carpool</span>
    </Link>
  </header>
);

export default Header;
