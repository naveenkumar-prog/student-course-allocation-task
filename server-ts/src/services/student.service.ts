import prisma from "../config/prisma";

interface CreateStudentDto {
  studentId: string;
  name: string;
  marks: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
  applicationDate: string;
}

export const createStudent = async (data: CreateStudentDto) => {
  return await prisma.student.create({
    data: {
      ...data,
      applicationDate: new Date(data.applicationDate),
    },
  });
};

export const getStudents = async () => {
  return await prisma.student.findMany({
    orderBy: {
      marks: "desc",
    },
  });
};

export const getStudentById = async (id: number) => {
  return await prisma.student.findUnique({
    where: { id },
  });
};

export const updateStudent = async (
  id: number,
  data: any
) => {
  return await prisma.student.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteStudent = async (id: number) => {
  return await prisma.student.delete({
    where: {
      id,
    },
  });
};