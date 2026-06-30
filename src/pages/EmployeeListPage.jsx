import { useState, useMemo } from 'react';
import { useEmployees } from '../context/EmployeeContext';
import Header from '../components/Header';
import Filters from '../components/Filters';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';

export default function EmployeeListPage() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [salarySort, setSalarySort] = useState('none');

  const filteredEmployees = useMemo(() => {
    let result = [...employees];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (emp) =>
          emp.name.toLowerCase().includes(query) ||
          emp.department.toLowerCase().includes(query) ||
          (emp.email && emp.email.toLowerCase().includes(query))
      );
    }

    if (departmentFilter) {
      result = result.filter((emp) => emp.department === departmentFilter);
    }

    if (salarySort === 'asc') {
      result.sort((a, b) => a.salary - b.salary);
    } else if (salarySort === 'desc') {
      result.sort((a, b) => b.salary - a.salary);
    }

    return result;
  }, [employees, searchQuery, departmentFilter, salarySort]);

  const handleAddClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleFormSubmit = (data) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, data);
    } else {
      addEmployee(data);
    }
    handleCloseForm();
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
      if (editingEmployee?.id === id) {
        handleCloseForm();
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Header onAddClick={handleAddClick} totalEmployees={employees.length} />

        <Filters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          departmentFilter={departmentFilter}
          onDepartmentFilterChange={setDepartmentFilter}
          salarySort={salarySort}
          onSalarySortChange={setSalarySort}
        />

        <EmployeeList
          employees={filteredEmployees}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />

        <EmployeeForm
          employee={editingEmployee}
          isOpen={showForm}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      </div>
    </div>
  );
}
