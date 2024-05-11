import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
const createIssueSchema = z.object({
  title: z.string().min(1, "tittle is require").max(255),
  description: z.string().min(1, "description is require"),
});
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
