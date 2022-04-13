import { Outlet } from 'react-router-dom';
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import useAlertMessage from '../../hooks/useAlertMessage';
import AlertMessage from '../../components/AlertMessage';
// ----------------------------------------------------------------------

export default function MainLayout() {
  const { severity } = useAlertMessage();

  return (
    <>
      <MainNavbar />
      <div>
        <Outlet />
      </div>
      <MainFooter />
      {severity && <AlertMessage />}
    </>
  );
}
