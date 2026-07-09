import prisma from "../config/prisma";

interface CreateCourseDto {
  courseCode: string;
  courseName: string;
  totalSeats: number;
}

export const createCourse = async (data: CreateCourseDto) => {
  return await prisma.course.create({
    data,
  });
};

export const getCourses = async () => {
  return await prisma.course.findMany({
    orderBy: {
      courseName: "asc",
    },
  });
};

export const getCourseById = async (id: number) => {
  return await prisma.course.findUnique({
    where: {
      id,
    },
  });
};

export const updateCourse = async (
  id: number,
  data: Partial<CreateCourseDto>
) => {
  return await prisma.course.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteCourse = async (id: number) => {
  return await prisma.course.delete({
    where: {
      id,
    },
  });
};