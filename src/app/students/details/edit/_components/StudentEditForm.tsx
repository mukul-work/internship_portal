"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { studentProfilePATCH } from "@/types/students/student.PATCH";

import { patchStudentProfileForStudentACTION } from "@/app/actions/students.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  initialData?: studentProfilePATCH;
}

export default function StudentEditForm({ initialData }: Props) {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<studentProfilePATCH>({
    defaultValues: initialData,
  });

  async function onSubmit(values: studentProfilePATCH) {
    console.log("payload: ", values);
    const response = await patchStudentProfileForStudentACTION(values);

    if (response.success) {
      toast.success("Profile updated successfully");
      router.push("/students/details");
      router.refresh();
      return;
    }

    toast.error(response.message);
  }

  return (
    <div className="container mx-auto max-w-5xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Edit Student Profile</CardTitle>
          <CardDescription>
            Update your personal and academic information.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="studentName">Full Name</Label>
                <Input id="studentName" {...register("studentName")} />
                {errors.studentName && (
                  <p className="text-sm text-destructive">
                    {errors.studentName.message}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div className="space-y-2">
                <Label htmlFor="studentContact">Contact Number</Label>
                <Input id="studentContact" {...register("studentContact")} />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="studentEmail">Email</Label>
                <Input
                  id="studentEmail"
                  {...register("studentEmail")}
                  disabled
                />
              </div>

              {/* Roll Number */}
              <div className="space-y-2">
                <Label htmlFor="studentUniversityRollNo">
                  University Roll No.
                </Label>
                <Input
                  id="studentUniversityRollNo"
                  {...register("studentUniversityRollNo")}
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label>Gender</Label>

                <Controller
                  control={control}
                  name="studentGender"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Section */}
              <div className="space-y-2">
                <Label>Section</Label>

                <Controller
                  control={control}
                  name="studentSection"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Section" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="E">E</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Semester */}
              <div className="space-y-2">
                <Label>Semester</Label>

                <Controller
                  control={control}
                  name="studentSemester"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Semester" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="6">6</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Session */}
              <div className="space-y-2">
                <Label>Session</Label>

                <Controller
                  control={control}
                  name="studentSession"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Session" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="2027">2027</SelectItem>
                        <SelectItem value="2028">2028</SelectItem>
                        <SelectItem value="2029">2029</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
