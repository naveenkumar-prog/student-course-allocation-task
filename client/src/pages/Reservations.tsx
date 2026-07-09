import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useCourses } from "../hooks/useCourses";
import { getReservations } from "../services/reservation.service";
import { useUpdateReservation } from "../hooks/useUpdateReservation";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";

type ReservationForm = {
  courseId: number;
  GENERAL: number;
  OBC: number;
  SC: number;
  ST: number;
};

export default function Reservations() {
  const { data: courses, isLoading } = useCourses();

  const updateReservationMutation = useUpdateReservation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm<ReservationForm>();

  const selectedCourse = watch("courseId");

  useEffect(() => {
    if (!selectedCourse) return;

    loadReservations();
  }, [selectedCourse]);

  const loadReservations = async () => {
    try {
      const data = await getReservations(Number(selectedCourse));

      reset({
        courseId: selectedCourse,
        GENERAL:
          data.find((r: any) => r.category === "GENERAL")?.seats ?? 0,
        OBC:
          data.find((r: any) => r.category === "OBC")?.seats ?? 0,
        SC:
          data.find((r: any) => r.category === "SC")?.seats ?? 0,
        ST:
          data.find((r: any) => r.category === "ST")?.seats ?? 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: ReservationForm) => {
    try {
      const payload = {
        reservations: [
          {
            category: "GENERAL",
            seats: data.GENERAL,
          },
          {
            category: "OBC",
            seats: data.OBC,
          },
          {
            category: "SC",
            seats: data.SC,
          },
          {
            category: "ST",
            seats: data.ST,
          },
        ],
      };

      await updateReservationMutation.mutateAsync({
        courseId: data.courseId,
        data: payload,
      });

      alert("Reservations Updated Successfully");
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.message || "Update Failed");
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="space-y-8">

    <PageHeader
      title="Reservations"
      subtitle="Manage course reservation seats"
    />

    <Card>

      <h2 className="text-xl font-semibold mb-6">
        Course Reservations
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* Course */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Course
          </label>

          <select
            defaultValue=""
            {...register("courseId", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Course</option>

            {courses?.map((course: any) => (
              <option
                key={course.id}
                value={course.id}
              >
                {course.courseName}
              </option>
            ))}

          </select>
        </div>

        {/* GENERAL */}

        <div>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            GENERAL Seats
          </label>

          <input
            type="number"
            {...register("GENERAL", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

        </div>

        {/* OBC */}

        <div>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            OBC Seats
          </label>

          <input
            type="number"
            {...register("OBC", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

        </div>

        {/* SC */}

        <div>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            SC Seats
          </label>

          <input
            type="number"
            {...register("SC", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

        </div>

        {/* ST */}

        <div>

          <label className="block mb-2 text-sm font-medium text-gray-700">
            ST Seats
          </label>

          <input
            type="number"
            {...register("ST", {
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

        </div>

        <button
          type="submit"
          disabled={updateReservationMutation.isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition disabled:bg-gray-400"
        >
          {updateReservationMutation.isPending
            ? "Saving..."
            : "Save Reservations"}
        </button>

      </form>

    </Card>

  </div>
);
}