import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
interface Props {
  params: { id: string };
}
const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.isssue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gapY={"5"}>
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailsPage;
