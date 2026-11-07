import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-ui-canvas text-stone-950 dark:text-stone-100">
      <AppHeader />
      <Outlet />
      <AppFooter />
    </div>
  );
}
