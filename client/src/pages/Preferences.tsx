import { useForm } from "react-hook-form";
import { useStudents } from "../hooks/useStudents";
import { useCourses } from "../hooks/useCourses";
import { useCreatePreference } from "../hooks/useCreatePreference";
import { getPreferences } from "../services/preference.service";
import { useUpdatePreference } from "../hooks/useUpdatePreference";
import Card from "../components/Card";
import PageHeader from "../components/PageHeader";

type PreferenceForm = {
  studentId: number;
  priority1: number;
  priority2: number;
  priority3: number;
};

export default function Preferences() {
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: courses, isLoading: coursesLoading } = useCourses();

  const createPreferenceMutation = useCreatePreference();
  const updatePreferenceMutation = useUpdatePreference();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<PreferenceForm>();

  const onSubmit = async (data: PreferenceForm) => {
  const payload = {
    preferences: [
      {
        courseId: data.priority1,
        priority: 1,
      },
      {
        courseId: data.priority2,
        priority: 2,
      },
      {
        courseId: data.priority3,
        priority: 3,
      },
    ],
  };

  try {
    // Check existing preferences FIRST
    const existing = await getPreferences(data.studentId);

    if (existing.length > 0) {
      await updatePreferenceMutation.mutateAsync({
        studentId: data.studentId,
        data: payload,
      });

      alert("Preferences Updated");
    } else {
      await createPreferenceMutation.mutateAsync({
        studentId: data.studentId,
        data: payload,
      });

      alert("Preferences Created");
    }

    reset();
  } catch (error) {
    console.error(error);
    alert("Failed");
  }
};

  if (studentsLoading || coursesLoading) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="space-y-8">

    <PageHeader
      title="Preferences"
      subtitle="Manage student course preferences"
    />

    <Card>

      <h2 className="text-xl font-semibold mb-6">
        Student Preferences
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >

        {/* Student */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Student
          </label>

          <select
            defaultValue=""
            {...register("studentId", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Student</option>

            {students?.map((student: any) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* Priority 1 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Priority 1
          </label>

          <select
            defaultValue=""
            {...register("priority1", {
              required: true,
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

        {/* Priority 2 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Priority 2
          </label>

          <select
            defaultValue=""
            {...register("priority2", {
              required: true,
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

        {/* Priority 3 */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Priority 3
          </label>

          <select
            defaultValue=""
            {...register("priority3", {
              required: true,
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

        <button
          type="submit"
          disabled={
            createPreferenceMutation.isPending ||
            updatePreferenceMutation.isPending
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition disabled:bg-gray-400"
        >
          {createPreferenceMutation.isPending ||
          updatePreferenceMutation.isPending
            ? "Saving..."
            : "Save Preferences"}
        </button>

      </form>

    </Card>

  </div>
);
}