import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeDetailPage from './pages/EmployeeDetailPage';

export default function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route path="/employee/:id" element={<EmployeeDetailPage />} />
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  );
}
