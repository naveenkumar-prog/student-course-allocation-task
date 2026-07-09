import { useStudents } from "../hooks/useStudents";
import StudentForm from "../components/StudentForm";
import { useDeleteStudent } from "../hooks/useDeleteStudent";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import TableContainer from "../components/TableContainer";

export default function Students() {
  const { data, isLoading, error } = useStudents();
  const deleteMutation = useDeleteStudent();
  const [selectedStudent,setSelectedStudent]= useState<any>();

  if (isLoading) return <h2>Loading...</h2>;

  if (error) return <h2>Error loading students</h2>;

  return (
    <div className="space-y-8">

    <PageHeader
        title="Students"
        subtitle="Manage student records"
    />

    <Card>

        <h2 className="text-xl font-semibold mb-6">
            Add Student
        </h2>

        <StudentForm

          student={selectedStudent}

          onFinish={()=>setSelectedStudent(undefined)}

          />

    </Card>

    <TableContainer>

  <div className="flex items-center justify-between p-6 border-b">

    <h2 className="text-xl font-semibold text-gray-800">
      Student List
    </h2>

    <span className="text-gray-500">
      Total: {data.length}
    </span>

  </div>

  <table className="w-full">

    <thead className="bg-gray-100">

      <tr>

        <th className="text-left p-4">ID</th>

        <th className="text-left p-4">Student ID</th>

        <th className="text-left p-4">Name</th>

        <th className="text-left p-4">Marks</th>

        <th className="text-left p-4">Category</th>

        <th className="text-center p-4">Actions</th>

      </tr>

    </thead>

    <tbody>

      {data.map((student: any) => (

        <tr
          key={student.id}
          className="border-t hover:bg-gray-50 transition"
        >

          <td className="p-4">{student.id}</td>

          <td className="p-4 font-medium">
            {student.studentId}
          </td>

          <td className="p-4">
            {student.name}
          </td>

          <td className="p-4">
            {student.marks}
          </td>

          <td className="p-4">

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {student.category}
            </span>

          </td>

          <td className="p-4">

            <div className="flex justify-center gap-2">

              <button
                onClick={() => setSelectedStudent(student)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteMutation.mutate(student.id)}
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

