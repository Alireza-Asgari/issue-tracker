import React from "react";
import { Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import IssueActions from "./IssueActions";
import { Link, IssueStatusBadge } from "@/app/components";
import { Isssue, Status } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "@/app/components/Pagination";
interface Props {
  searchParams: { status: Status; orderBy: keyof Isssue; page: string };
}
const IssuesPage = async ({ searchParams }: Props) => {
  const columns: { label: string; vlaue: keyof Isssue; className?: string }[] =
    [
      {
        label: "Issue",
        vlaue: "title",
      },
      {
        label: "Status",
        vlaue: "state",
        className: "hidden md:table-cell",
      },
      {
        label: "Created",
        vlaue: "createdAt",
        className: "hidden md:table-cell",
      },
    ];
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { state: status };
  const orderBy = columns
    .map((column) => column.vlaue)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const issues = await prisma.isssue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const issueCount = await prisma.isssue.count({
    where,
  });
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface" mb="2">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                className={column.className}
                key={column.vlaue}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.vlaue,
                    },
                  }}
                >
                  {column.label}
                  {column.vlaue == searchParams.orderBy && (
                    <ArrowUpIcon className="inline" />
                  )}
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
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
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </div>
  );
};

export default IssuesPage;
