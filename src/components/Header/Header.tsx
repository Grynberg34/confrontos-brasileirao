"use client";

import Link from "next/link";
import HomeIcon from '@mui/icons-material/Home';
import { usePathname } from "next/navigation";

interface HeaderProps {
  alternate?: boolean; // Prop to toggle alternate styles
}

const Header: React.FC<HeaderProps> = ({ alternate = false }) => {
  const pathname = usePathname();

  return (
    <div className={`header ${alternate ? 'header--alternate' : ''}`}>
      {pathname !== "/" && (
        <Link className="header__home" href="/" title="home">
          <HomeIcon className="header__home__icon" />
        </Link>
      )}

      <Link className="header__link" href="/">
        <h1 className="header__title">Confrontos Corridos</h1>
        <h2 className="header__subtitle">Brasileirão 2003-2026</h2>
      </Link>
    </div>
  );
};

export default Header;