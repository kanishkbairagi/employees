import { useState, useEffect } from 'react';
import { CloseIcon } from './Icons';

const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
];

const EMPTY_FORM = { name: '', department: '', salary: '', email: '', contact: '' };

const NAME_REGEX = /^[A-Za-z\s]+$/;
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const CONTACT_REGEX = /^[0-9]{10}$/;
const SALARY_REGEX = /^[0-9]+$/;

export default function EmployeeForm({ employee, isOpen, onSubmit, onClose }) {
  const isEditing = Boolean(employee);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setForm({
        name: employee.name,
        department: employee.department,
        salary: String(employee.salary),
        email: employee.email || '',
        contact: employee.contact || '',
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    const trimmedName = form.name.trim();

    if (!trimmedName) {
      newErrors.name = 'Employee name is required';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!NAME_REGEX.test(trimmedName)) {
      newErrors.name = 'Name can only contain letters (no numbers or symbols)';
    }

    if (!form.department) {
      newErrors.department = 'Department is required';
    }

    const salaryStr = form.salary.toString().trim();
    if (!salaryStr) {
      newErrors.salary = 'Salary is required';
    } else if (!SALARY_REGEX.test(salaryStr)) {
      newErrors.salary = 'Salary must contain only numbers';
    } else if (parseInt(salaryStr, 10) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    const trimmedEmail = form.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Email is required';
    } else if (trimmedEmail !== trimmedEmail.toLowerCase()) {
      newErrors.email = 'Email must be in lowercase letters only';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const trimmedContact = form.contact.trim();
    if (!trimmedContact) {
      newErrors.contact = 'Contact number is required';
    } else if (!CONTACT_REGEX.test(trimmedContact)) {
      newErrors.contact = 'Contact must be exactly 10 digits (numbers only)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitized = value;

    if (name === 'name') {
      sanitized = value.replace(/[^A-Za-z\s]/g, '');
    } else if (name === 'email') {
      sanitized = value.toLowerCase().replace(/[^a-z0-9@._%+-]/g, '');
    } else if (name === 'contact') {
      sanitized = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'salary') {
      sanitized = value.replace(/\D/g, '');
    }

    setForm((prev) => ({ ...prev, [name]: sanitized }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      name: form.name.trim(),
      department: form.department,
      salary: parseInt(form.salary, 10),
      email: form.email.trim().toLowerCase(),
      contact: form.contact.trim(),
    });

    if (!isEditing) {
      setForm(EMPTY_FORM);
      setErrors({});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <form
        onSubmit={handleSubmit}
        className="relative bg-white rounded-xl shadow-xl w-full max-w-lg border border-slate-200 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-slate-800">
            {isEditing ? 'Edit Employee' : 'Add Employee'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Employee Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="kanishk"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="kanishk@example.com"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-slate-700 mb-1.5">
              Contact No
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              inputMode="numeric"
              value={form.contact}
              onChange={handleChange}
              placeholder="9876543210"
              maxLength={10}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.contact ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.contact && (
              <p className="mt-1 text-xs text-red-500">{errors.contact}</p>
            )}
          </div>

          <div>
            <label htmlFor="department" className="block text-sm font-medium text-slate-700 mb-1.5">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={form.department}
              onChange={handleChange}
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                errors.department ? 'border-red-400' : 'border-slate-200'
              }`}
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            {errors.department && (
              <p className="mt-1 text-xs text-red-500">{errors.department}</p>
            )}
          </div>

          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-slate-700 mb-1.5">
              Salary
            </label>
            <input
              id="salary"
              name="salary"
              type="text"
              inputMode="numeric"
              value={form.salary}
              onChange={handleChange}
              placeholder="50000"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.salary ? 'border-red-400' : 'border-slate-200'
              }`}
            />
            {errors.salary && (
              <p className="mt-1 text-xs text-red-500">{errors.salary}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl sticky bottom-0">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isEditing ? 'Update Employee' : 'Add Employee'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-white text-slate-700 text-sm font-medium rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
