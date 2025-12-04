import Logo from '../logo/logo';
import { useSidebar } from '@callmetric/ui';

const NavLogo = () => {
  const sidebar = useSidebar();
  return (
    <Logo
      size="md"
      fullLogo={sidebar.state !== 'collapsed' || sidebar.isMobile}
      className="p-2"
    />
  );
};

export default NavLogo;
