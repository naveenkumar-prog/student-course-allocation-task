import app from "./app";
import prisma from "./config/prisma";



const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


async function test() {
  await prisma.student.findMany();
  console.log("Prisma Connected");
}

test();
// testGemini();