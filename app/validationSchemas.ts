import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "tittle is require").max(255),
  description: z.string().min(1, "description is require"),
});
