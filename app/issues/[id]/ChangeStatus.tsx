"use client";
import { Isssue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ChangeStatus = ({ issue }: { issue: Isssue }) => {
  const router = useRouter();
  return (
    <Select.Root
      defaultValue={issue.state || ""}
      onValueChange={(status) => {
        axios
          .patch("/api/issues/" + issue.id, {
            status,
          })
          .catch(() => toast.error("change could not be saved."));
        router.refresh();
      }}
    >
      <Select.Trigger placeholder="Statuses" />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
const statuses: { label: string; value: Status }[] = [
  {
    label: "open",
    value: "OPEN",
  },
  {
    label: "closed",
    value: "CLOSED",
  },
  {
    label: "in progress",
    value: "IN_PROGRESS",
  },
];
export default ChangeStatus;
