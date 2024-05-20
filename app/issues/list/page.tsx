import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Link, IssueStatusBadge } from "@/app/components";
const IssuesPage = async () => {
  const issues = await prisma.isssue.findMany();
  return (
    <div>
      <div>
        <IssueActions />
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`} children={issue.title} />
                <div className="block md:hidden">
                  {" "}
                  <IssueStatusBadge status={issue.state} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.state} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
