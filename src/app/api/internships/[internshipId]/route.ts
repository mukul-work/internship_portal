import { NextResponse } from "next/server";
import { validateSession } from "@/lib/validations/sessionValidation";
import { prisma } from "@/lib/prisma";
import { validateInternshipRequest } from "@/lib/internship-input/validateInternshipRequest";
import { Prisma } from "@/generated/prisma/client";
import { validateInternship } from "@/lib/validations/internshipValidation";


export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ internshipId: string }> },
) {

    try {
        // Session validation
        const sessionValidationResult = await validateSession();

        if (!sessionValidationResult.data) {
            return NextResponse.json(
                { message: sessionValidationResult.message },
                { status: sessionValidationResult.status },
            );
        }

        // Internship Validation
        const { internshipId } = await params;
        const id = Number(internshipId)
        const internshipValidationResult = await validateInternship(id, sessionValidationResult.data.studentId)

        if (!internshipValidationResult.success) {
            return NextResponse.json({
                message: internshipValidationResult.message
            }, {
                status: internshipValidationResult.status
            })
        }

        // Request Validation
        const result = await validateInternshipRequest(request);

        if (!result.success) {
            return NextResponse.json(
                { message: result.message },
                { status: result.status },
            );
        }

        // Update Internship
        const updated = await prisma.internship.update({
            where: {
                internshipId: id,
            },
            data: result.data,
        });

        return NextResponse.json(
            { message: "Intenrship updated successfully", data: updated },
            { status: 200 },
        );

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400,
                },
            );
        }

        console.error(error);

        return NextResponse.json(
            {
                message: "Internal Server Error",
            },
            {
                status: 500,
            },
        );
    }
}

