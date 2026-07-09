import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

import { createCourse, updateCourse } from "../services/course.service";
import type { Course } from "../types/course";

type CourseFormData = {
  courseCode: string;
  courseName: string;
  totalSeats: number;
};

interface CourseFormProps {
  course?: Course | null;
  onSuccess?: () => void;
}

export default function CourseForm({
  course,
  onSuccess,
}: CourseFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<CourseFormData>({
    defaultValues: course ?? undefined,
  });

  useEffect(() => {
    if (course) {
      reset(course);
    } else {
      reset({
        courseCode: "",
        courseName: "",
        totalSeats: 0,
      });
    }
  }, [course, reset]);

  const onSubmit = async (data: CourseFormData) => {
    try {
      if (course) {
        await updateCourse(course.id, data);
      } else {
        await createCourse(data);
      }

      queryClient.invalidateQueries({
        queryKey: ["courses"],
      });

      alert(course ? "Course Updated" : "Course Added");

      reset();

      onSuccess?.();

    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Course Code
        </label>

        <input
          placeholder="Enter Course Code"
          {...register("courseCode")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Course Name
        </label>

        <input
          placeholder="Enter Course Name"
          {...register("courseName")}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Total Seats
        </label>

        <input
          type="number"
          placeholder="Enter Total Seats"
          {...register("totalSeats", {
            valueAsNumber: true,
          })}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg font-medium shadow"
      >
        {course ? "Update Course" : "Add Course"}
      </button>
    </form>
  );
}