import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
interface Props {
  params: { id: string };
}
const IssueDetails = async ({ params }: Props) => {
  const issue = await prisma.isssue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.state}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetails;
