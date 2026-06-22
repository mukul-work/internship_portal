import {prisma} from "../lib/prisma"
async function test(){
    const st = await prisma.student.create({
        data:{
             name: "Mukul",
             universityRollNo: "202401100200205",
             email: "mukul.kashyap.work@gmail.com",
             contact: "9520856100",
             gender: "Male",
             session: "2028",
             semester: "4",
             section: "C",
        }
    })
    console.log("Created Student:", st)
}

test()
  .then(() => console.log("Query Successful"))
  .catch((err) => {
    console.error("Query Failed");
    console.error(err);
  });