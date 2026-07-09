import prisma from "../config/prisma";

export const processAllocation = async () => {
  // Remove previous allocation results
  await prisma.allocation.deleteMany();

  // Fetch students with their preferences
  const students = await prisma.student.findMany({
    include: {
      preferences: {
        include: {
          course: true,
        },
        orderBy: {
          priority: "asc",
        },
      },
    },
    orderBy: [
      {
        marks: "desc",
      },
      {
        applicationDate: "asc",
      },
    ],
  });

  // Fetch all reservation seat details
  const reservations = await prisma.courseReservation.findMany();

  // Create an in-memory seat map
  const seatMap = new Map<string, number>();

  reservations.forEach((reservation) => {
    const key = `${reservation.courseId}_${reservation.category}`;
    seatMap.set(key, reservation.seats);
  });

  // Allocate each student
  for (const student of students) {
    // Skip students with no preferences
    if (student.preferences.length === 0) {
      console.log(`${student.name} has no preferences`);
      continue;
    }

    for (const preference of student.preferences) {
      const key = `${preference.courseId}_${student.category}`;

      const availableSeats = seatMap.get(key) ?? 0;

      if (availableSeats > 0) {
        // Save allocation
        await prisma.allocation.create({
          data: {
            studentId: student.id,
            courseId: preference.courseId,
            allocatedPriority: preference.priority,
          },
        });

        // Reduce seat count
        seatMap.set(key, availableSeats - 1);

        console.log(
          `${student.name} allocated to ${preference.course.courseName}`
        );

        break;
      }
    }
  }

  // Return allocation results
  return await prisma.allocation.findMany({
    include: {
      student: true,
      course: true,
    },
    orderBy: {
      studentId: "asc",
    },
  });
};

export const getAllocations = async () => {
  return await prisma.allocation.findMany({
    include: {
      student: true,
      course: true,
    },
    orderBy: {
      allocatedAt: "desc",
    },
  });
};