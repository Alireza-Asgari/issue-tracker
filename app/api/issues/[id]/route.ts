import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  params: { id: string };
}
export async function PATCH(request: NextRequest, { params }: Params) {
  const body = await request.json();

  const validton = issueSchema.safeParse(body);

  if (!validton.success) {
    return NextResponse.json(validton.error.format(), { status: 400 });
  }

  const issue = await prisma.isssue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "invalid issue" }, { status: 400 });
  }

  const updatedIssue = await prisma.isssue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const issue = prisma.isssue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  await prisma.isssue.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({});
}