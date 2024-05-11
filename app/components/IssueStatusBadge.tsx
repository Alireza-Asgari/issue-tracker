import React from "react";
import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
const statusMap: Record<
  Status,
  { lable: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { lable: "Open", color: "red" },
  IN_PROGRESS: { lable: "In progress", color: "violet" },
  CLOSED: { lable: "Closed", color: "green" },
};
const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].lable}</Badge>
  );
};

export default IssueStatusBadge;
