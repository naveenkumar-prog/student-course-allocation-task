import { useForm } from "react-hook-form";
import { createStudent } from "../services/student.service";
import { useQueryClient } from "@tanstack/react-query";
import type { Student } from "../types/student";
import { useEffect } from "react";
import { useUpdateStudent } from "../hooks/useUpdateStudents";

type StudentFormData = {
  studentId: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
  applicationDate: string;
};

interface Props{

    student?:Student;

    onFinish?:()=>void;

}



export default function StudentForm({ student, onFinish }: Props) {
  const queryClient = useQueryClient();

  const {

    register,

    handleSubmit,

    reset

    }=useForm<StudentFormData>({

    defaultValues:student

    });

    const updateMutation=useUpdateStudent();


  const onSubmit = async (data: StudentFormData) => {
    try {

        if(student){

    await updateMutation.mutateAsync({

        id:student.id,

        data

    });

}else{

    await createStudent(data);

}

      alert("Student Added Successfully");

      queryClient.invalidateQueries({
        queryKey: ["students"],
      });

      reset();
    } catch (error) {
      console.log(error);
      alert("Failed to create student");
    }
  };

  useEffect(()=>{

        if(student){

            reset(student);

        }

    },[student]);

    return (
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

    {/* Student ID */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Student ID
      </label>

      <input
        placeholder="Enter Student ID"
        {...register("studentId")}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Student Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Student Name
      </label>

      <input
        placeholder="Enter Student Name"
        {...register("name")}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Marks */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Marks
      </label>

      <input
        type="number"
        placeholder="Enter Marks"
        {...register("marks", {
          valueAsNumber: true,
        })}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>

      <select
        {...register("category")}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="GENERAL">GENERAL</option>
        <option value="OBC">OBC</option>
        <option value="SC">SC</option>
        <option value="ST">ST</option>
      </select>
    </div>

    {/* Application Date */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Application Date
      </label>

      <input
        type="datetime-local"
        {...register("applicationDate")}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Submit Button */}
    <div className="pt-2">
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-3 rounded-lg shadow"
      >
        {student ? "Update Student" : "Add Student"}
      </button>
    </div>

  </form>
);
}