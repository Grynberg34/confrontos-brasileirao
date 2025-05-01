"use client";

import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname(); 

  return (
    <div className='header'>
      {pathname !== "/" && (
        <Link className="header__home" href="/">
          <HomeIcon className="header__home__icon" />
        </Link>
      )}

      <Link className="header__link" href="/">
        <h1 className="header__title">Confrontos Corridos</h1>
        <h2 className="header__subtitle">Brasileirão 2003-2025</h2>
      </Link>
    </div>
  );
};

export default Header;