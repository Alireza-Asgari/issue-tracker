import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PageSizeDropDown = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <Select.Root
      defaultValue={searchParams.get("pageSize") || ""}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("pageSize", status);
        const query = params.size ? "?" + params.toString() : "";
        router.push("/issues/list/" + query);
      }}
    >
      <Select.Trigger placeholder="Select page size" />
      <Select.Content>
        {sizes.map((size) => (
          <Select.Item key={size.label} value={size.label}>
            {size.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
const sizes: { label: string }[] = [
  { label: "10" },
  { label: "20" },
  { label: "30" },
  { label: "40" },
];
export default PageSizeDropDown;
