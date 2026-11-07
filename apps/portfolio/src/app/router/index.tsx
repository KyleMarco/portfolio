import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, NotFoundPage } from '../../routes';
import AppLayout from '../layout/AppLayout';

function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
