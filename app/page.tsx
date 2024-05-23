import prisma from "@/prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssue from "./LatestIssue";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

async function Home() {
  const open = await prisma.isssue.count({ where: { state: "OPEN" } });
  const inProgress = await prisma.isssue.count({
    where: { state: "IN_PROGRESS" },
  });
  const closed = await prisma.isssue.count({ where: { state: "CLOSED" } });
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummery open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}
export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summery of project issues",
};
export default Home;
