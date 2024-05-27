import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "tittle is require").max(255),
  description: z.string().min(1, "description is require"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "tittle is require").max(255).optional(),
  description: z
    .string()
    .min(1, "description is require")
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is require")
    .max(255)
    .optional()
    .nullable(),
  status: z.string().optional(),
});
