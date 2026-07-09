import { useEffect } from "react";

import { useAllocations } from "../hooks/useAllocations";
import { useProcessAllocation } from "../hooks/useProcessAllocation";

import PageHeader from "../components/PageHeader";
import Card from "../components/Card";
import TableContainer from "../components/TableContainer";

export default function Allocation() {
  const { data, isLoading } = useAllocations();

  const processMutation = useProcessAllocation();

  useEffect(() => {
    if (processMutation.isSuccess) {
      alert("Allocation completed successfully!");
    }
  }, [processMutation.isSuccess]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <div className="space-y-8">

      <PageHeader
        title="Allocation"
        subtitle="Run seat allocation and view allocation results"
      />

      <Card>

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold">
              Seat Allocation
            </h2>

            <p className="text-gray-500 mt-1">
              Allocate students based on marks, preferences and reservation.
            </p>

          </div>

          <button
            onClick={() => processMutation.mutate()}
            disabled={processMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition disabled:bg-gray-400"
          >
            {processMutation.isPending
              ? "Processing..."
              : "Run Allocation"}
          </button>

        </div>

      </Card>

      <TableContainer>

        <div className="flex items-center justify-between p-6 border-b">

          <h2 className="text-xl font-semibold">
            Allocation Results
          </h2>

          <span className="text-gray-500">
            Total: {data?.length ?? 0}
          </span>

        </div>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Student
              </th>

              <th className="text-left p-4">
                Course
              </th>

              <th className="text-left p-4">
                Priority
              </th>

              <th className="text-left p-4">
                Marks
              </th>

              <th className="text-left p-4">
                Category
              </th>

            </tr>

          </thead>

          <tbody>

            {data?.map((allocation: any) => (

              <tr
                key={allocation.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium">
                  {allocation.student.name}
                </td>

                <td className="p-4">
                  {allocation.course.courseName}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                    Priority {allocation.allocatedPriority}
                  </span>
                </td>

                <td className="p-4">
                  {allocation.student.marks}
                </td>

                <td className="p-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {allocation.student.category}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </TableContainer>

    </div>
  );
}