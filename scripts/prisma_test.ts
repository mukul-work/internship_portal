import { prisma } from "../lib/prisma";
async function test() {
  const st = await prisma.student.delete({
    where: {
      universityRollNo: "202401100200205",
    },
  });
  console.log("Student deleted:", st);
}

test()
  .then(() => console.log("Query Successful"))
  .catch((err) => {
    console.error("Query Failed");
    console.error(err);
  });
