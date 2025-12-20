import { NextRequest, NextResponse } from 'next/server';

// Mock data for testing without database
const mockEmployees = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Smith' }
];

const mockAnalytics = {
  employeeName: 'John Doe',
  totalExpectedHours: 170.0,
  totalWorkedHours: 158.5,
  leavesUsed: 1,
  productivityPercentage: 93.2,
  dailyBreakdown: [
    {
      date: new Date('2024-01-01'),
      inTime: new Date('2024-01-01T10:00:00'),
      outTime: new Date('2024-01-01T18:30:00'),
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false
    },
    {
      date: new Date('2024-01-02'),
      inTime: new Date('2024-01-02T10:15:00'),
      outTime: new Date('2024-01-02T18:45:00'),
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false
    },
    {
      date: new Date('2024-01-03'),
      inTime: new Date('2024-01-03T10:30:00'),
      outTime: new Date('2024-01-03T18:20:00'),
      workedHours: 7.8,
      expectedHours: 8.5,
      isLeave: false
    },
    {
      date: new Date('2024-01-10'),
      inTime: null,
      outTime: null,
      workedHours: 0,
      expectedHours: 8.5,
      isLeave: true
    }
  ]
};

const mockAllEmployeesAnalytics = {
  employeeName: 'All Employees',
  totalExpectedHours: 340.0,
  totalWorkedHours: 315.8,
  leavesUsed: 3,
  productivityPercentage: 92.9,
  employeeCount: 2,
  employeeRecords: [
    {
      employeeName: 'John Doe',
      date: '2024-01-01',
      inTime: '10:00 AM',
      outTime: '6:30 PM',
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false,
      productivity: 100.0
    },
    {
      employeeName: 'Jane Smith',
      date: '2024-01-01',
      inTime: '9:45 AM',
      outTime: '6:15 PM',
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false,
      productivity: 100.0
    },
    {
      employeeName: 'John Doe',
      date: '2024-01-02',
      inTime: '10:15 AM',
      outTime: '6:45 PM',
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false,
      productivity: 100.0
    },
    {
      employeeName: 'Jane Smith',
      date: '2024-01-02',
      inTime: '10:30 AM',
      outTime: '6:45 PM',
      workedHours: 8.25,
      expectedHours: 8.5,
      isLeave: false,
      productivity: 97.1
    },
    {
      employeeName: 'John Doe',
      date: '2024-01-03',
      inTime: '10:30 AM',
      outTime: '6:20 PM',
      workedHours: 7.8,
      expectedHours: 8.5,
      isLeave: false,
      productivity: 91.8
    },
    {
      employeeName: 'Jane Smith',
      date: '2024-01-03',
      inTime: '10:00 AM',
      outTime: '6:30 PM',
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false,
      productivity: 100.0
    },
    {
      employeeName: 'John Doe',
      date: '2024-01-04',
      inTime: null,
      outTime: null,
      workedHours: 0,
      expectedHours: 8.5,
      isLeave: true,
      productivity: 0
    },
    {
      employeeName: 'Jane Smith',
      date: '2024-01-05',
      inTime: null,
      outTime: null,
      workedHours: 0,
      expectedHours: 8.5,
      isLeave: true,
      productivity: 0
    },
    {
      employeeName: 'John Doe',
      date: '2024-01-05',
      inTime: '9:50 AM',
      outTime: '6:25 PM',
      workedHours: 8.6,
      expectedHours: 8.5,
      isLeave: false,
      productivity: 101.2
    },
    {
      employeeName: 'Jane Smith',
      date: '2024-01-08',
      inTime: '10:10 AM',
      outTime: '6:40 PM',
      workedHours: 8.5,
      expectedHours: 8.5,
      isLeave: false,
      productivity: 100.0
    }
  ],
  dailyBreakdown: [
    {
      date: '2024-01-01',
      totalWorkedHours: 17.0,
      totalExpectedHours: 17.0,
      employeesPresent: 2,
      totalEmployees: 2
    },
    {
      date: '2024-01-02',
      totalWorkedHours: 16.75,
      totalExpectedHours: 17.0,
      employeesPresent: 2,
      totalEmployees: 2
    },
    {
      date: '2024-01-03',
      totalWorkedHours: 16.3,
      totalExpectedHours: 17.0,
      employeesPresent: 2,
      totalEmployees: 2
    },
    {
      date: '2024-01-04',
      totalWorkedHours: 0,
      totalExpectedHours: 8.5,
      employeesPresent: 0,
      totalEmployees: 2
    },
    {
      date: '2024-01-05',
      totalWorkedHours: 8.6,
      totalExpectedHours: 17.0,
      employeesPresent: 1,
      totalEmployees: 2
    }
  ]
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeName = searchParams.get('employee');
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    if (!employeeName) {
      return NextResponse.json({ error: 'Employee name is required' }, { status: 400 });
    }

    // Handle "All Employees" option
    if (employeeName === 'ALL_EMPLOYEES') {
      const allEmployeesAnalytics = {
        ...mockAllEmployeesAnalytics,
        employeeName: 'All Employees',
        employeeCount: 2
      };
      return NextResponse.json(allEmployeesAnalytics);
    }

    // For individual employees, return mock analytics data
    // TODO: Replace with real database queries when MongoDB is configured
    const analytics = {
      ...mockAnalytics,
      employeeName: employeeName
    };

    return NextResponse.json(analytics);

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
    // Return mock employees for testing
    // TODO: Replace with real database query when MongoDB is configured
    return NextResponse.json(mockEmployees);

  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
}