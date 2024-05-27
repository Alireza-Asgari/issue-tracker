import { Link, IssueStatusBadge } from "@/app/components";
import { Status, Isssue } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";
export interface IssueQuery {
  status: Status;
  orderBy: keyof Isssue;
  page: string;
  sortOrder: string;
}
interface Props {
  searchParams: IssueQuery;
  issues: Isssue[];
}
const IssueTable = ({ searchParams, issues }: Props) => {
  const toggleOrder = () => {
    return !searchParams.sortOrder || searchParams.sortOrder === "desc"
      ? "asc"
      : "desc";
  };
  return (
    <Table.Root variant="surface">
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
                    sortOrder: toggleOrder(),
                  },
                }}
              >
                {column.label}
                {column.vlaue == searchParams.orderBy &&
                  (searchParams.sortOrder === "asc" ? (
                    <ArrowUpIcon className="inline" />
                  ) : (
                    <ArrowDownIcon className="inline" />
                  ))}
              </NextLink>
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
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
  );
};
const columns: { label: string; vlaue: keyof Isssue; className?: string }[] = [
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
export const columnNames = columns.map((columnName) => columnName.vlaue);
export default IssueTable;
