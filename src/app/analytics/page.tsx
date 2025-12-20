'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Employee {
  id: string;
  name: string;
}

interface MonthlyStats {
  employeeName: string;
  totalExpectedHours: number;
  totalWorkedHours: number;
  leavesUsed: number;
  productivityPercentage: number;
  dailyBreakdown: Array<{
    date: Date;
    inTime: Date | null;
    outTime: Date | null;
    workedHours: number;
    expectedHours: number;
    isLeave: boolean;
  }>;
}

export default function AnalyticsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [analytics, setAnalytics] = useState<MonthlyStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
      });
      const employeeData = await response.json();
      setEmployees(employeeData);
    } catch (err) {
      setError('Failed to load employees');
    }
  };

  const loadAnalytics = async () => {
    if (!selectedEmployee) {
      setError('Please select an employee');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        employee: selectedEmployee,
        month: selectedMonth.toString(),
        year: selectedYear.toString(),
      });

      const response = await fetch(`/api/analytics?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load analytics');
      }

      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '--';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analytics Dashboard
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 underline">
            ← Back to Upload
          </Link>
        </header>

        <div className="max-w-6xl mx-auto">
          {/* Instructions */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">📋 How to Use Analytics Dashboard</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <span className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">1</span>
                Select individual employee or "All Employees" for combined report
              </div>
              <div className="flex items-center">
                <span className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">2</span>
                Choose month and year for analysis
              </div>
              <div className="flex items-center">
                <span className="bg-white bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">3</span>
                Click "Analyze" to view productivity report
              </div>
            </div>
            <div className="mt-4 p-3 bg-white bg-opacity-10 rounded-lg">
              <p className="text-sm">💡 <strong>Tip:</strong> Use "👥 All Employees" to see combined metrics and side-by-side comparison of all team members!</p>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              📊 Select Employee & Period
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="employee" className="block text-sm font-bold text-gray-700 mb-2">
                  👤 Employee
                </label>
                <select
                  id="employee"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                >
                  <option value="">Choose Employee...</option>
                  <option value="ALL_EMPLOYEES" className="font-bold bg-blue-50">
                    👥 All Employees (Combined Report)
                  </option>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.name}>
                      {emp.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="month" className="block text-sm font-bold text-gray-700 mb-2">
                  📅 Month
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="year" className="block text-sm font-bold text-gray-700 mb-2">
                  📆 Year
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                >
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={loadAnalytics}
                  disabled={loading || !selectedEmployee}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-lg transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    '🔍 Analyze'
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">❌ {error}</p>
              </div>
            )}

            {employees.length === 0 && !error && (
              <div className="p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-8 h-8 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-yellow-800 font-semibold text-lg">No Employees Found</p>
                    <p className="text-yellow-700">Please upload attendance data first, or check if the database is connected.</p>
                    <Link href="/" className="text-yellow-600 hover:text-yellow-800 underline font-medium">
                      ← Go back to upload data
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Analytics Results */}
          {analytics && (
            <>
              {/* Summary Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        {analytics.employeeName === 'All Employees' ? 'Total Expected Hours' : 'Expected Hours'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analytics.totalExpectedHours.toFixed(1)}h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        {analytics.employeeName === 'All Employees' ? 'Total Actual Hours' : 'Actual Hours'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analytics.totalWorkedHours.toFixed(1)}h
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="p-3 bg-orange-100 rounded-full">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        {analytics.employeeName === 'All Employees' ? 'Total Leaves Used' : 'Leaves Used'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analytics.leavesUsed}{analytics.employeeName === 'All Employees' ? '' : ' / 2'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">
                        {analytics.employeeName === 'All Employees' ? 'Average Productivity' : 'Productivity'}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {analytics.productivityPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Breakdown */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {analytics.employeeName === 'All Employees' ? 'Combined Daily Breakdown' : 'Daily Breakdown'}
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {analytics.employeeName === 'All Employees' && (
                          <th className="text-left p-3 text-sm font-semibold text-gray-600">Employee</th>
                        )}
                        <th className="text-left p-3 text-sm font-semibold text-gray-600">Date</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-600">In Time</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-600">Out Time</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-600">Worked</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-600">Expected</th>
                        <th className="text-left p-3 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.dailyBreakdown.map((day, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          {analytics.employeeName === 'All Employees' && (
                            <td className="p-3 text-sm text-gray-900 font-medium">
                              {(day as any).employee}
                            </td>
                          )}
                          <td className="p-3 text-sm text-gray-900">
                            {formatDate(day.date.toString())}
                          </td>
                          <td className="p-3 text-sm text-gray-900">
                            {formatTime(day.inTime?.toString() || null)}
                          </td>
                          <td className="p-3 text-sm text-gray-900">
                            {formatTime(day.outTime?.toString() || null)}
                          </td>
                          <td className="p-3 text-sm text-gray-900">
                            {day.workedHours.toFixed(1)}h
                          </td>
                          <td className="p-3 text-sm text-gray-900">
                            {day.expectedHours.toFixed(1)}h
                          </td>
                          <td className="p-3 text-sm">
                            {day.isLeave ? (
                              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                                Leave
                              </span>
                            ) : day.expectedHours === 0 ? (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                Off Day
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                Present
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}