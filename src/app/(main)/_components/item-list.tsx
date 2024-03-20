"use client";
import { useState } from "react";
import React from "react";
import Item from "./item";
import { Codesandbox } from "lucide-react";

import { ChevronDown } from "lucide-react";
import { cn, removeLeadingSlash } from "../../../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    id: "c996b007-fccc-47dc-8e3f-4e33ef571f80",
    title: "Main Hub",
    parentId: undefined,
    href: "/",
  },
  {
    id: "09efac82-ecc7-4c01-879b-93723bac3914",
    title: "User Management",
    parentId: undefined,
    childrenIds: [
      "5285f5ec-5130-49db-8dcb-586f7f2a442c",
      "f98f3172-1f9b-48da-9a88-748ab4264105",
    ],
    href: "/user-management",
  },
  {
    id: "5285f5ec-5130-49db-8dcb-586f7f2a442c",
    title: "All Users",
    parentId: "09efac82-ecc7-4c01-879b-93723bac3914",
    href: "/user-management/all-users",
  },
  {
    id: "f98f3172-1f9b-48da-9a88-748ab4264105",
    title: "Role",
    parentId: "09efac82-ecc7-4c01-879b-93723bac3914",
    href: "/user-management/role",
  },
  {
    id: "e4c89627-e58d-46bc-a8a9-15cd626df474",
    title: "Services",
    parentId: undefined,
    href: "/services",
  },
  {
    id: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    title: "Products",
    parentId: undefined,
    childrenIds: [
      "e63a2b52-3032-47c3-84b4-5a96e959bd90",
      "4b50ef06-d36c-4524-b281-c31eb3ea04eb",
      "953cad57-6802-4c02-8702-88658dd3e767",
      "95f1bdc1-7201-41ec-a521-eb8a9e878985",
      "fe12db6a-5bbe-4896-8b1a-3605d221ebfb",
    ],
    href: "/products",
  },
  {
    id: "e63a2b52-3032-47c3-84b4-5a96e959bd90",
    title: "ProductList",
    parentId: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    href: "/products/productlist",
  },
  {
    id: "e63a2b52-3032-47c3-84b4-5a96e959bd90",
    title: "Brand",
    parentId: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    href: "/products/brand",
  },
  {
    id: "4b50ef06-d36c-4524-b281-c31eb3ea04eb",
    title: "Bar Codes",
    parentId: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    href: "/products/bar-codes",
  },
  {
    id: "953cad57-6802-4c02-8702-88658dd3e767",
    title: "Variation",
    parentId: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    href: "/products/variation",
  },
  {
    id: "95f1bdc1-7201-41ec-a521-eb8a9e878985",
    title: "Purchase",
    parentId: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    href: "/products/purchase",
  },
  {
    id: "fe12db6a-5bbe-4896-8b1a-3605d221ebfb",
    title: "Units",
    parentId: "0a7043c4-a802-41a0-b1eb-a716158e5da4",
    href: "/products/units",
  },
  {
    id: "e2b9ab62-43f9-41e8-b2b4-af2a589a5145",
    title: "Orders",
    parentId: undefined,
    href: "/orders",
  },
  {
    id: "09007c1b-6537-4687-8bdc-c66f7c97943b",
    title: "Contact",
    parentId: undefined,
    childrenIds: [
      "aaec41eb-5f0d-4547-a21f-d3b6f27d8018",
      "783e6284-158d-4d75-a739-42c5d687a523",
    ],
    href: "/contact",
  },
  {
    id: "aaec41eb-5f0d-4547-a21f-d3b6f27d8018",
    title: "Riders",
    parentId: "09007c1b-6537-4687-8bdc-c66f7c97943b",
    href: "/contact/riders",
  },
  {
    id: "783e6284-158d-4d75-a739-42c5d687a523",
    title: "Suppliers",
    parentId: "09007c1b-6537-4687-8bdc-c66f7c97943b",
    href: "/contact/suppliers",
  },
  // {
  //   id: "0c8670e4-8882-461e-946f-ef9548622438",
  //   title: "Report",
  //   parentId: undefined,
  //   href: "/report",
  // },
  {
    id: "bf1e0642-0d1c-4f34-9dd5-70f1c58b180e",
    title: "Reports",
    parentId: undefined,
    childrenIds: [
      "3b424c2a-5878-405b-ba02-690ac9b2d4ab",
      "8a96babc-dabf-4d2d-9d16-589536bd9d2d",
      "f35b72e3-4575-4e95-b61c-4941aa18dd54",
      "6a028b7c-42c4-4f14-956f-9f3c5ff9e91f"
    ],
    href: "/reports",
  },
  // Child items of Reports
  {
    id: "3b424c2a-5878-405b-ba02-690ac9b2d4ab",
    title: "Order Report",
    parentId: "bf1e0642-0d1c-4f34-9dd5-70f1c58b180e",
    href: "/reports/orderReport",
  },
  {
    id: "8a96babc-dabf-4d2d-9d16-589536bd9d2d",
    title: "Product Report",
    parentId: "bf1e0642-0d1c-4f34-9dd5-70f1c58b180e",
    href: "/reports/productReport",
  },
  {
    id: "f35b72e3-4575-4e95-b61c-4941aa18dd54",
    title: "Purchase Report",
    parentId: "bf1e0642-0d1c-4f34-9dd5-70f1c58b180e",
    href: "/reports/purchase",
  },
  {
    id: "6a028b7c-42c4-4f14-956f-9f3c5ff9e91f",
    title: "ProfitLoss Report",
    parentId: "bf1e0642-0d1c-4f34-9dd5-70f1c58b180e",
    href: "/reports/profitlossReport",
  },
  {
    id: "a5e60905-73fb-43eb-ac66-e701cbdeeeb8",
    title: "Settings",
    parentId: undefined,
    childrenIds: [
      "5d5df8f4-74f9-4590-9bb8-20c3049a580a",
      "5d5df8f4-74f9-4590-9bb8-20c3049a580a",
      "b570e7ea-8499-4984-9cce-a1d00ab5d869",
      "def0aa4c-b4fc-4e02-ac14-ecb8fe9bf703",
      "f93e7f66-32a3-4070-894b-b40a48ce3912",
    ],
    href: "/settings",
  },
  {
    id: "5d5df8f4-74f9-4590-9bb8-20c3049a580a",
    title: "Locations",
    parentId: "a5e60905-73fb-43eb-ac66-e701cbdeeeb8",
    href: "/settings/locations",
  },
  {
    id: "b570e7ea-8499-4984-9cce-a1d00ab5d869",
    title: "Categories",
    parentId: "a5e60905-73fb-43eb-ac66-e701cbdeeeb8",
    href: "/settings/categories",
  },
  {
    id: "def0aa4c-b4fc-4e02-ac14-ecb8fe9bf703",
    title: "Tax Rates",
    parentId: "a5e60905-73fb-43eb-ac66-e701cbdeeeb8",
    href: "/settings/tax-rates",
  },
  // {
  //   id: "f93e7f66-32a3-4070-894b-b40a48ce3912",
  //   title: "Business",
  //   parentId: "a5e60905-73fb-43eb-ac66-e701cbdeeeb8",
  //   href: "/settings/business",
  // },
];

interface ItemListProps {
  parentId?: string;
  level?: number;
}

const getItems = (parentId?: string) => {
  return items?.filter((item) => item.parentId === parentId);
};

const ItemList = ({ level = 0, parentId }: ItemListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const pathname = usePathname();
  // Function to Expand the Item and to see the nested Items
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  // Function to Get the Items
  const documents = getItems(parentId);
  return (
    <>
      <ul className={cn("space-y-4 flex-1", level !== 0 && "mt-4")}>
        {documents?.map((item) => (
          <li key={item.id}>
            <Item
              onClick={
                item.childrenIds?.length ? () => onExpand(item.id) : () => {}
              }
              className=""
              style={{
                marginLeft: level ? `${level * 12 + 12}px` : "12px",
              }}
            >
              <>
                {!item.childrenIds ? (
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-4 px-4   "
                  >
                    <Item.Icon>
                      <Codesandbox
                        className={cn(
                          "w-4 h-4",
                          pathname === item.href && "text-[#01C4FF]"
                        )}
                      />
                    </Item.Icon>
                    <Item.Title
                      className={`${
                        pathname === item.href && "text-[#0B0A0C]"
                      }`}
                    >
                      {item.title}
                    </Item.Title>
                  </Link>
                ) : (
                  <div
                    className={cn(
                      "flex items-center justify-between gap-4 px-4 bg-transparent transition-all duration-300 w-full rounded-lg",
                      pathname.includes(item.href!) && "bg-[#F8F8F8] py-2"
                    )}
                  >
                    <div
                      className={cn("flex items-center justify-between gap-4")}
                    >
                      <Item.Icon>
                        <Codesandbox
                          className={cn(
                            "w-4 h-4",
                            pathname.includes(item.href) && "text-[#01C4FF]"
                          )}
                        />
                      </Item.Icon>
                      <Item.Title
                        className={`${
                          pathname.includes(item.href) && "text-[#0B0A0C]"
                        }`}
                      >
                        {item.title}
                      </Item.Title>
                    </div>
                    {item.childrenIds?.length && (
                      <Item.Chevron>
                        <ChevronDown
                          className={cn(
                            "	transition duration-200 rotate-0 text-[#0B0A0C]/70",
                            !expanded[item.id] && "-rotate-90"
                          )}
                        />
                      </Item.Chevron>
                    )}
                  </div>
                )}
              </>
            </Item>
            {expanded[item.id] && (
              <ItemList parentId={item.id} level={level + 1} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemList;
