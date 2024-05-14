import { IssueStatusBadge } from "@/app/components";
import { Isssue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Isssue }) => {
  return (
    <>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gap="3" my={"2"}>
        <IssueStatusBadge status={issue.state} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>

      <Card className="prose">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
