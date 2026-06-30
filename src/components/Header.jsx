import { PlusIcon } from './Icons';

export default function Header({ onAddClick, totalEmployees }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Employee List</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          {totalEmployees} employee{totalEmployees !== 1 ? 's' : ''} total
        </p>
      </div>
      <button
        onClick={onAddClick}
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
      >
        <PlusIcon className="w-4 h-4" />
        Add Employee
      </button>
    </div>
  );
}
