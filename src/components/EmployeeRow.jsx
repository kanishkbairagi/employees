import { Link } from 'react-router-dom';
import { EditIcon, DeleteIcon } from './Icons';
import { formatSalary } from '../utils/formatSalary';

export default function EmployeeRow({ employee, onEdit, onDelete }) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors border-b border-slate-100 last:border-b-0">
      <td className="px-4 py-4 text-sm text-slate-500 font-mono">
        {employee.id.slice(0, 6).toUpperCase()}
      </td>
      <td className="px-4 py-4 text-sm">
        <Link
          to={`/employee/${employee.id}`}
          className="font-medium text-slate-800 hover:text-blue-600 transition-colors"
        >
          {employee.name}
        </Link>
      </td>
      <td className="px-4 py-4 text-sm text-slate-600">{employee.department}</td>
      <td className="px-4 py-4 text-sm text-slate-800 font-medium">
        {formatSalary(employee.salary)}
      </td>
      <td className="px-4 py-4 text-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(employee)}
            title="Edit employee"
            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <EditIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            title="Delete employee"
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <DeleteIcon className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
