"use client";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { Suspense } from "react";
import PageSizeDropDown from "./PageSizeDropDown";

const IssueActions = () => {
  return (
    <Flex justify={"between"}>
      <Flex gap="2">
        <Suspense>
          <IssueStatusFilter />
          <PageSizeDropDown />
        </Suspense>
      </Flex>
      <Button>
        <Link href="/issues/new">New issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
