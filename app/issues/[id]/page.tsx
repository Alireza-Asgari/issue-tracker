import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";
interface Props {
  params: { id: string };
}
const IssueDetails = async ({ params }: Props) => {
  const issue = await prisma.isssue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gapY={"5"}>
      <Box>
        <Heading as="h2">{issue.title}</Heading>
        <Flex gap="3" my={"2"}>
          <IssueStatusBadge status={issue.state} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>

        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>edit issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetails;
