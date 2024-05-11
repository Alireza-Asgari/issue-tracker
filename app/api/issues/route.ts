import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validton = createIssueSchema.safeParse(body);
  if (!validton.success) {
    return NextResponse.json(validton.error.format(), { status: 400 });
  }
  const newIssue = await prisma.isssue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
