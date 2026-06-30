export default function Summary({ totalEmployees, filteredCount }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-md p-5 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold">Employee Directory</h2>
          <p className="text-blue-100 text-sm mt-0.5">
            Manage your team members efficiently
          </p>
        </div>
        <div className="flex gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold">{totalEmployees}</p>
            <p className="text-blue-100 text-xs">Total Employees</p>
          </div>
          {filteredCount !== totalEmployees && (
            <div className="text-center">
              <p className="text-2xl font-bold">{filteredCount}</p>
              <p className="text-blue-100 text-xs">Showing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
