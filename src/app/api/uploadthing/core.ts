import { validateFileUpload } from "@/lib/validations/file-upload/fileUploadValidation";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  proofUpload: f(
    {
      pdf: {
        maxFileSize: "1MB",
        maxFileCount: 1,
        contentDisposition: "attachment",
      },
    },
    {
      awaitServerData: true,
    },
  )
    .middleware(async () => {
      const user = await validateFileUpload();

      if (!user) throw new UploadThingError("Unauthorized");

      return user;
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { fileURL: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
