import { prisma } from "@/lib/prisma";
async function test() {
  const admin = await prisma.admin.create({
    data: {
      email: "admin@gmail.com",
      password: "123",
      name: "Admin",
    },
  });
  console.log("Admin Created:", admin);
}

test()
  .then(() => console.log("Query Successful"))
  .catch((err) => {
    console.error("Query Failed");
    console.error(err);
  });
