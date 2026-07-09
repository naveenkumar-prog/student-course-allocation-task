import Card from "../components/Card";
import TableContainer from "../components/TableContainer";
import { useCourseStats } from "../hooks/useCourseStats";
import { useDashboard } from "../hooks/useDashboard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function Dashboard() {
  const { data, isLoading, error } = useDashboard();
  const { data: courseStats } = useCourseStats();

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Failed to load dashboard.</h2>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Student Course Allocation Overview
        </p>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <Card>
          <h3 className="text-gray-500">
            Total Students
          </h3>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {data.totalStudents}
          </p>
        </Card>

        <Card>
          <h3 className="text-gray-500">
            Total Courses
          </h3>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {data.totalCourses}
          </p>
        </Card>

        <Card>
          <h3 className="text-gray-500">
            Allocated Students
          </h3>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            {data.allocatedStudents}
          </p>
        </Card>

        <Card>
          <h3 className="text-gray-500">
            Pending Students
          </h3>

          <p className="text-4xl font-bold text-red-500 mt-3">
            {data.pendingStudents}
          </p>
        </Card>

      </div>

      {/* Table */}

      <TableContainer>

  <h2 className="text-xl font-semibold mb-6">
    Students Allocated Per Course
  </h2>

  <div className="w-full h-96">

    <ResponsiveContainer width="100%" height={350}>
  <BarChart
    data={courseStats}
    margin={{
      top: 20,
      right: 30,
      left: 20,
      bottom: 20,
    }}
    barCategoryGap="40%"
  >
    <CartesianGrid strokeDasharray="3 3" />

    <XAxis
      dataKey="courseName"
      tick={{ fontSize: 14 }}
    />

    <YAxis allowDecimals={false} />

    <Tooltip />

    <Bar
      dataKey="students"
      fill="#3B82F6"
      radius={[6, 6, 0, 0]}
      maxBarSize={80}
    />
  </BarChart>
</ResponsiveContainer>
  </div>

</TableContainer>
</div>
  );
}