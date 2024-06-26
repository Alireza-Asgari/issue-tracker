"use client";
import { Skeleton } from "@/app/components";
import { Isssue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
const AssigneeSelect = ({ issue }: { issue: Isssue }) => {
  const { data: users, error, isLoading } = useUsers();
  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={(userId) => {
          axios
            .patch("/api/issues/" + issue.id, {
              assignedToUserId: userId === "unassigned" ? null : userId,
              status: "IN_PROGRESS",
            })
            .catch(() => toast.error("change could not be saved."));
        }}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Sugestions</Select.Label>
            <Select.Item value="unassigned">Unaissgned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    retry: 3,
    staleTime: 60 * 1000,
  });
export default AssigneeSelect;
