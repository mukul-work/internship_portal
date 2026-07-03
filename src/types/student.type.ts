import { Internship } from "./internship.type";

export interface Student {
  id: number;
  name: string;
  universityRollNo: string;
  email: string;
  contact: string;
  gender: string;
  session: string;
  semester: string;
  section: string;
  internship: Internship[];
}
