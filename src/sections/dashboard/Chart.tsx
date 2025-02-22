"use client"; // Required for client-side interactivity

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // Import ApexOptions type
import { Box, Stack } from "@mui/material";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ApiResponse = {
  website_visits: {
    [key: string]: { desktop: number; mobile: number }; // Dynamic keys for days
  };
  offers_sent: {
    [key: string]: number; // Dynamic keys for days
  };
};

type Props = {
  apiResponse: ApiResponse;
};

const Charts = ({ apiResponse }: Props) => {
  const websiteVisitsSeries = [
    {
      name: "Desktop",
      data: Object.values(apiResponse.website_visits).map((day) => day.desktop),
    },
    {
      name: "Mobile",
      data: Object.values(apiResponse.website_visits).map((day) => day.mobile),
    },
  ];

  const offersSentSeries = [
    {
      name: "Offers Sent",
      data: Object.values(apiResponse.offers_sent),
    },
  ];

  const categories = Object.keys(apiResponse.website_visits).map(
    (day) => day.charAt(0).toUpperCase() + day.slice(1)
  );

  const websiteVisitsOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 12,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      axisTicks: {
        show: false,
      },
    },

    fill: {
      opacity: 1,
    },
    colors: ["#3b82f6", "#10b981"],
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
  };

  const offersSentOptions: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories: categories, // Days of the week
    },

    colors: ["#ef4444"],
    markers: {
      size: 5,
    },
  };

  return (
    <Stack sx={{ maxWidth: "100%", margin: "0 auto", padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, // Column on small screens, row on medium+

          gap: "20px",
        }}
      >
        <Box
          sx={{
            flex: 1,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          {" "}
          <h3>Website Visits</h3>
          <Chart
            options={websiteVisitsOptions}
            series={websiteVisitsSeries}
            type="bar"
            height={350}
          />
        </Box>

        <Box
          borderRadius={"card"}
          sx={{
            flex: 1,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          {" "}
          {/* Each chart takes equal width */}
          <h3>Offers Sent</h3>
          <Chart
            options={offersSentOptions}
            series={offersSentSeries}
            type="line"
            height={350}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default Charts;
