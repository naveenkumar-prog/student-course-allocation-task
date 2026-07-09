import prisma from "../config/prisma";

export const getDashboard = async () => {
  const totalStudents = await prisma.student.count();

  const totalCourses = await prisma.course.count();

  const allocatedStudents =
    await prisma.allocation.count();

  const pendingStudents =
    totalStudents - allocatedStudents;

  return {
    totalStudents,
    totalCourses,
    allocatedStudents,
    pendingStudents,
  };
};

export const getCourseStats = async () => {
  const result = await prisma.allocation.groupBy({
    by: ["courseId"],
    _count: {
      courseId: true,
    },
  });

  const data = await Promise.all(
    result.map(async (item) => {
      const course = await prisma.course.findUnique({
        where: {
          id: item.courseId,
        },
      });

      return {
        courseName: course?.courseName,
        students: item._count.courseId,
      };
    })
  );

  return data;
};