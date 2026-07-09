import prisma from "../config/prisma";

interface CreateReservationDto {
  courseId: number;
  category: "GENERAL" | "OBC" | "SC" | "ST";
  seats: number;
}

// =============================
// CRUD
// =============================

export const createReservation = async (
  data: CreateReservationDto
) => {
  const course = await prisma.course.findUnique({
    where: {
      id: data.courseId,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const reservations = await prisma.courseReservation.findMany({
    where: {
      courseId: data.courseId,
    },
  });

  const reservedSeats = reservations.reduce(
    (sum, reservation) => sum + reservation.seats,
    0
  );

  if (reservedSeats + data.seats > course.totalSeats) {
    throw new Error("Reserved seats exceed total course seats");
  }

  return prisma.courseReservation.create({
    data,
  });
};

export const getReservations = async () => {
  return prisma.courseReservation.findMany({
    include: {
      course: true,
    },
  });
};

export const getReservationById = async (id: number) => {
  return prisma.courseReservation.findUnique({
    where: {
      id,
    },
    include: {
      course: true,
    },
  });
};

export const updateReservation = async (
  id: number,
  data: Partial<CreateReservationDto>
) => {
  const reservation = await prisma.courseReservation.findUnique({
    where: {
      id,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  const course = await prisma.course.findUnique({
    where: {
      id: reservation.courseId,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const reservations = await prisma.courseReservation.findMany({
    where: {
      courseId: reservation.courseId,
    },
  });

  const reservedSeats = reservations.reduce((sum, item) => {
    if (item.id === reservation.id) return sum;
    return sum + item.seats;
  }, 0);

  const newSeats = data.seats ?? reservation.seats;

  if (reservedSeats + newSeats > course.totalSeats) {
    throw new Error("Reserved seats exceed total course seats");
  }

  return prisma.courseReservation.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteReservation = async (id: number) => {
  return prisma.courseReservation.delete({
    where: {
      id,
    },
  });
};

// =============================
// Course Reservation APIs
// =============================

export const getCourseReservations = async (
  courseId: number
) => {
  return prisma.courseReservation.findMany({
    where: {
      courseId,
    },
    orderBy: {
      category: "asc",
    },
  });
};

export const updateCourseReservations = async (
  courseId: number,
  reservations: CreateReservationDto[]
) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const totalReserved = reservations.reduce(
    (sum, reservation) => sum + reservation.seats,
    0
  );

  if (totalReserved > course.totalSeats) {
    throw new Error("Reserved seats exceed total course seats");
  }

  return prisma.$transaction(async (tx) => {
    await tx.courseReservation.deleteMany({
      where: {
        courseId,
      },
    });

    await tx.courseReservation.createMany({
      data: reservations.map((reservation) => ({
        courseId,
        category: reservation.category,
        seats: reservation.seats,
      })),
    });

    return tx.courseReservation.findMany({
      where: {
        courseId,
      },
      orderBy: {
        category: "asc",
      },
    });
  });
};