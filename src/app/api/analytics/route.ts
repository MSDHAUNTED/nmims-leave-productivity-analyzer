import { NextRequest, NextResponse } from 'next/server';

// Mock data for combined analytics only
const mockAllEmployeesAnalytics = {
  employeeName: 'All Employees',
  totalExpectedHours: 340.0,
  totalWorkedHours: 315.8,
  leavesUsed: 3,
  productivityPercentage: 92.9,
  dailyBreakdown: [
    {
      employee: 'Employee 1',
      date: new Date('2024-01-01'),
      inTime: new Date('2024-01-01T10:00:00'),
      outTime: new Date('2024-01-01T18:30:00'),
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false
    },
    {
      employee: 'Employee 2',
      date: new Date('2024-01-01'),
      inTime: new Date('2024-01-01T09:45:00'),
      outTime: new Date('2024-01-01T18:15:00'),
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false
    },
    {
      employee: 'Employee 1',
      date: new Date('2024-01-02'),
      inTime: new Date('2024-01-02T10:15:00'),
      outTime: new Date('2024-01-02T18:45:00'),
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false
    },
    {
      employee: 'Employee 2',
      date: new Date('2024-01-02'),
      inTime: new Date('2024-01-02T10:30:00'),
      outTime: new Date('2024-01-02T18:45:00'),
      workedHours: 8.25,
      expectedHours: 8.5,
      isLeave: false
    },
    {
      employee: 'Employee 1',
      date: new Date('2024-01-10'),
      inTime: null,
      outTime: null,
      workedHours: 0,
      expectedHours: 8.5,
      isLeave: true
    },
    {
      employee: 'Employee 2',
      date: new Date('2024-01-04'),
      inTime: null,
      outTime: null,
      workedHours: 0,
      expectedHours: 8.5,
      isLeave: true
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    // Only support "All Employees" analysis
    const allEmployeesAnalytics = {
      ...mockAllEmployeesAnalytics,
      employeeName: 'All Employees Combined Analytics'
    };
    return NextResponse.json(allEmployeesAnalytics);

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Return empty array - no individual employees, only combined analytics
    return NextResponse.json([]);

  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}