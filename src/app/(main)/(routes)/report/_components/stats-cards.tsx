import React from "react";
import Card from "./card";
import Link from "next/link";

const filesStatData = [
  {
    id: 1,
    fill: "#3872FA",
    title: "Orders",
    value: 3567,
    engagementRate: 70.03,
    chart: [
      {
        label: "1",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "2",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "3",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "4",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "5",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "6",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "7",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "8",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "9",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "10",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "11",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "12",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "13",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "14",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "15",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "16",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "17",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "18",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "19",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "20",
        count: Math.floor(Math.random() * 101),
      },
    ],
  },
  {
    id: 2,
    title: "Purchase",
    value: 224,
    fill: "#3872FA",
    chart: [
      {
        label: "1",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "2",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "3",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "4",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "5",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "6",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "7",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "8",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "9",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "10",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "11",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "12",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "13",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "14",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "15",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "16",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "17",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "18",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "19",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "20",
        count: Math.floor(Math.random() * 101),
      },
    ],
  },
  {
    id: 3,
    fill: "#3872FA",
    title: "ProfitLoss",
    value: 123,
    engagementRate: 53.95,
    chart: [
      {
        label: "1",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "2",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "3",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "4",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "5",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "6",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "7",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "8",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "9",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "10",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "11",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "12",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "13",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "14",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "15",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "16",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "17",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "18",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "19",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "20",
        count: Math.floor(Math.random() * 101),
      },
    ],
  },
  {
    id: 4,
    title: "Products",
    value: 624,
    fill: "#3872FA",
    engagementRate: 67.92,
    chart: [
      {
        label: "1",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "2",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "3",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "4",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "5",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "6",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "7",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "8",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "9",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "10",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "11",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "12",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "13",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "14",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "15",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "16",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "17",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "18",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "19",
        count: Math.floor(Math.random() * 101),
      },
      {
        label: "20",
        count: Math.floor(Math.random() * 101),
      },
    ],
  },
];
const StatsCards = () => {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 lg:gap-8">
      {filesStatData.map((stat) => {
        // Generate dynamic link based on card title
        let link = "";
        switch (stat.title.toLowerCase()) {
          case "orders":
            link = "/report/orderReport";
            break;
          case "purchase":
            link = "/report/purchaseReport";
            break;
          case "profitloss":
            link = "/report/profitLossReport";
            break;
          case "products":
            link = "/report/productReport";
            break;
          default:
            link = "";
        }

        return (
          <Link href={link} key={stat.id}>
            <Card data={stat} />
          </Link>
        );
      })}
    </div>
  );
};

export default StatsCards;
