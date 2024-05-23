import prisma from "@/prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssue from "./LatestIssue";
import IssueChart from "./IssueChart";

export default async function Home() {
  const open = await prisma.isssue.count({ where: { state: "OPEN" } });
  const inProgress = await prisma.isssue.count({
    where: { state: "IN_PROGRESS" },
  });
  const closed = await prisma.isssue.count({ where: { state: "CLOSED" } });
  return <IssueChart open={open} inProgress={inProgress} closed={closed} />;
}
