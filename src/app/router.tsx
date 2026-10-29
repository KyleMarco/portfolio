import type { NavLinkRenderProps } from 'react-router-dom';
import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import AboutPage from '../pages/AboutPage/AboutPage';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import ShopPage from '../pages/ShopPage/ShopPage';

const navClass = ({ isActive }: NavLinkRenderProps) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive ? 'bg-blue-600 text-white' : 'bg-white/10 text-slate-100 hover:bg-white/20',
  ].join(' ');

export function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen bg-[#f1f5f9] text-[#0f172a]">
        <header className="border-b border-white/10 bg-[#0f172a] text-white shadow-lg shadow-slate-900/10">
          <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>
              <NavLink to="/demo" className={navClass}>
                Shop demo
              </NavLink>
              <NavLink to="/about" className={navClass}>
                About
              </NavLink>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<ShopPage />} />
          <Route path="/shop" element={<Navigate to="/demo" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
