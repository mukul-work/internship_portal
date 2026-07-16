"use client";

import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";

import { internshipPOST } from "@/types/internships/internship.POST";
import { postInternshipForStudentACTION } from "@/app/actions/internships.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddInternshipForm() {
  const router = useRouter();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<internshipPOST>();

  const stipend = watch("stipend");
  const ppo = watch("ppo");

  async function onSubmit(values: internshipPOST) {
    const payload = {
      ...values,
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
    };
    console.log("Payload: ", payload);
    const response = await postInternshipForStudentACTION(payload);
    console.log("Response: ", response);
    if (response.success) {
      toast.success("Internship submitted successfully");
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
          <CardTitle>Add Internship</CardTitle>

          <CardDescription>
            Fill in the details of your internship.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Source */}
              <div className="space-y-2">
                <Label>Source of Internship</Label>

                <Controller
                  control={control}
                  name="sourceOfInternship"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="SELF">Self</SelectItem>
                        <SelectItem value="IIPC">IIPC</SelectItem>
                        <SelectItem value="DEPT">Department</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Internship Type */}
              <div className="space-y-2">
                <Label>Internship Type</Label>

                <Input
                  placeholder="Full Time / Part Time / Remote"
                  {...register("internshipType")}
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label>Role</Label>

                <Input placeholder="Frontend Developer" {...register("role")} />
              </div>

              {/* Organisation */}
              <div className="space-y-2">
                <Label>Organisation Name</Label>

                <Input
                  placeholder="Company Name"
                  {...register("organisationName")}
                />
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label>Organisation Address</Label>

                <Input
                  placeholder="Company Address"
                  {...register("organisationAddress")}
                />
              </div>

              {/* Start Date */}
              <div className="space-y-2">
                <Label>Start Date</Label>

                <Input
                  type="date"
                  {...register("startDate", {
                    valueAsDate: true,
                  })}
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label>End Date</Label>

                <Input
                  type="date"
                  {...register("endDate", {
                    valueAsDate: true,
                  })}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>

                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="ONGOING">Ongoing</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Stipend */}
              <div className="flex items-center space-x-3 pt-8">
                <Controller
                  control={control}
                  name="stipend"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <Label>Received Stipend</Label>
              </div>

              {stipend && (
                <div className="space-y-2">
                  <Label>Stipend Amount</Label>

                  <Input placeholder="₹10000" {...register("stipendAmount")} />
                </div>
              )}

              {/* PPO */}
              <div className="flex items-center space-x-3">
                <Controller
                  control={control}
                  name="ppo"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />

                <Label>Received PPO</Label>
              </div>

              {ppo && (
                <div className="space-y-2">
                  <Label>PPO Proof URL</Label>

                  <Input placeholder="https://..." {...register("ppoProof")} />
                </div>
              )}

              {/* Completion Proof */}
              <div className="space-y-2 md:col-span-2">
                <Label>Completion Proof URL</Label>

                <Input
                  placeholder="https://..."
                  {...register("completionProof")}
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
                {isSubmitting ? "Submitting..." : "Submit Internship"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
