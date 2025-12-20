'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CombinedAnalytics {
  totalExpectedHours: number;
  totalWorkedHours: number;
  leavesUsed: number;
  productivityPercentage: number;
  employeeCount: number;
  dailyBreakdown: Array<{
    date: string;
    totalWorkedHours: number;
    totalExpectedHours: number;
    employeesPresent: number;
    totalEmployees: number;
  }>;
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<CombinedAnalytics | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/analytics?month=${selectedMonth}&year=${selectedYear}&employee=ALL_EMPLOYEES`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
          <p className="text-lg text-gray-600 mb-6">View productivity analytics for all employees</p>
          <Link href="/" className="text-blue-600 hover:text-blue-700 underline font-medium">
            ← Back to Upload
          </Link>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-blue-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Select Analysis Period</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                  Month
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {new Date(0, month - 1).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
                  Year
                </label>
                <select
                  id="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <button
                  onClick={loadAnalytics}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
                >
                  {loading ? 'Analyzing...' : 'Analyze All Employees'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">⚠️ {error}</p>
              </div>
            )}
          </div>

          {analytics && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-blue-600 font-bold text-xl">👥</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Employees</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.employeeCount}</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-indigo-500">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-indigo-600 font-bold text-xl">⏰</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Expected Hours</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalExpectedHours?.toFixed(1)}h</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-green-600 font-bold text-xl">✓</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Actual Hours</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalWorkedHours?.toFixed(1)}h</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-500">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-yellow-600 font-bold text-xl">🏖️</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Total Leaves</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.leavesUsed}</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-purple-600 font-bold text-xl">📊</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Productivity</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.productivityPercentage?.toFixed(1)}%</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Use</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• Upload your Excel attendance file on the home page</li>
                  <li>• Select the month and year you want to analyze</li>
                  <li>• Click "Analyze All Employees" to see combined statistics</li>
                  <li>• View productivity metrics for all uploaded employee data</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}