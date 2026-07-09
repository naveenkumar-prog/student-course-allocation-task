import { useState } from "react";
import CourseForm from "../components/CourseForm";
import { useCourses } from "../hooks/useCourses";
import { useDeleteCourse } from "../hooks/useDeleteCourse";
import type { Course } from "../types/course";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import TableContainer from "../components/TableContainer";


export default function Courses() {

  const { data, isLoading, error } = useCourses();

  const deleteMutation = useDeleteCourse();

  const [selectedCourse, setSelectedCourse] =
    useState<Course | null>(null);

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error...</h2>;

  return (
  <div className="space-y-8">

    <PageHeader
      title="Courses"
      subtitle="Manage available courses"
    />

    <Card>

      <h2 className="text-xl font-semibold mb-6">
        {selectedCourse ? "Update Course" : "Add Course"}
      </h2>

      <CourseForm
        course={selectedCourse}
        onSuccess={() => setSelectedCourse(null)}
      />

    </Card>

    <TableContainer>

      <div className="flex items-center justify-between p-6 border-b">

        <h2 className="text-xl font-semibold text-gray-800">
          Course List
        </h2>

        <span className="text-gray-500">
          Total: {data?.length ?? 0}
        </span>

      </div>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="text-left p-4">ID</th>

            <th className="text-left p-4">Course Code</th>

            <th className="text-left p-4">Course Name</th>

            <th className="text-left p-4">Total Seats</th>

            <th className="text-center p-4">Actions</th>

          </tr>

        </thead>

        <tbody>

          {data?.map((course: any) => (

            <tr
              key={course.id}
              className="border-t hover:bg-gray-50 transition"
            >

              <td className="p-4">
                {course.id}
              </td>

              <td className="p-4 font-medium">
                {course.courseCode}
              </td>

              <td className="p-4">
                {course.courseName}
              </td>

              <td className="p-4">
                {course.totalSeats}
              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteMutation.mutate(course.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </TableContainer>

  </div>
);
}