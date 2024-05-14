import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validton = issueSchema.safeParse(body);
  if (!validton.success) {
    return NextResponse.json(validton.error.format(), { status: 400 });
  }
  const newIssue = await prisma.isssue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
