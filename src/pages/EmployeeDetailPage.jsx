import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEmployees } from '../context/EmployeeContext';
import { ArrowLeftIcon, EditIcon, DeleteIcon, UserIcon } from '../components/Icons';
import { formatSalary } from '../utils/formatSalary';
import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmployeeById, updateEmployee, deleteEmployee } = useEmployees();
  const employee = getEmployeeById(id);
  const [showForm, setShowForm] = useState(false);

  if (!employee) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Employee not found.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <ArrowLeftIcon />
            Back to Employee List
          </Link>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employee.id);
      navigate('/');
    }
  };

  const handleFormSubmit = (data) => {
    updateEmployee(employee.id, data);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors"
        >
          <ArrowLeftIcon />
          Back to Employee List
        </button>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white">
                <UserIcon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{employee.name}</h1>
                <p className="text-blue-100 text-sm mt-0.5">{employee.department}</p>
              </div>
            </div>
          </div>

          <div className="px-6 py-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Employee Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-slate-400 mb-1">Employee ID</p>
                <p className="text-sm font-medium text-slate-800 font-mono">
                  {employee.id.slice(0, 6).toUpperCase()}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Full Name</p>
                <p className="text-sm font-medium text-slate-800">{employee.name}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <p className="text-sm font-medium text-slate-800">
                  {employee.email || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Contact No</p>
                <p className="text-sm font-medium text-slate-800">
                  {employee.contact || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Department</p>
                <p className="text-sm font-medium text-slate-800">{employee.department}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Salary</p>
                <p className="text-sm font-medium text-slate-800">
                  {formatSalary(employee.salary)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <EditIcon className="w-4 h-4" />
                Edit Employee
              </button>
              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-red-600 text-sm font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
              >
                <DeleteIcon className="w-4 h-4" />
                Delete Employee
              </button>
            </div>
          </div>
        </div>

        <EmployeeForm
          employee={employee}
          isOpen={showForm}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      </div>
    </div>
  );
}
