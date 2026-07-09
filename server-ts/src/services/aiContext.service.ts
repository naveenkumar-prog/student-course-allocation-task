import prisma from "../config/prisma";

export const buildContext = async () => {
  const students = await prisma.student.findMany({
    include: {
      allocation: {
        include: {
          course: true,
        },
      },
      preferences: {
        include: {
          course: true,
        },
        orderBy: {
          priority: "asc",
        },
      },
    },
  });

  const courses = await prisma.course.findMany({
    include: {
      reservations: true,
      allocations: true,
    },
  });

  return {
    students,
    courses,
  };
};