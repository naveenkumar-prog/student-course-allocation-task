import prisma from "../config/prisma";

interface Preference {
  courseId: number;
  priority: number;
}

export const createPreferences = async (
  studentId: number,
  preferences: Preference[]
) => {

  return await prisma.studentPreference.createMany({
    data: preferences.map((preference) => ({
      studentId,
      courseId: preference.courseId,
      priority: preference.priority,
    })),
  });

};

export const getPreferences = async (studentId:number)=>{

    return await prisma.studentPreference.findMany({

        where:{
            studentId
        },

        include:{
            course:true
        },

        orderBy:{
            priority:"asc"
        }

    })

}



export const updatePreferences = async (
  studentId: number,
  preferences: Preference[]
) => {
  return await prisma.$transaction(async (tx) => {

    // Delete old preferences
    await tx.studentPreference.deleteMany({
      where: {
        studentId,
      },
    });

    // Insert new preferences
    await tx.studentPreference.createMany({
      data: preferences.map((preference) => ({
        studentId,
        courseId: preference.courseId,
        priority: preference.priority,
      })),
    });

    // Return updated preferences
    return await tx.studentPreference.findMany({
      where: {
        studentId,
      },
      include: {
        course: true,
      },
      orderBy: {
        priority: "asc",
      },
    });
  });
};

export const deletePreferences = async (studentId: number) => {
  return await prisma.studentPreference.deleteMany({
    where: {
      studentId,
    },
  });
};