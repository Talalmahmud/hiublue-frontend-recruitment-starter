"use client";

import { useAuth } from "@/components/context/ContextProvider";
import {
  FacebookIcon,
  GoogleIcon,
  SitemarkIcon,
} from "@/sections/login/custom-icons";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Charts from "../Chart";
import OfferList from "../UserTable";
import { useRouter } from "next/navigation";

export default function DashboardView() {
  const auth = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState<any>("");
  const [summaryFilter, setSummaryFilter] = useState<any>("this-week");
  const [chartData, setChartData] = useState<any>("");
  const [offerList, setOfferList] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(1);
  const [weekFilter, setWeekFilter] = useState("this-week");

  const getSummaryData = async () => {
    if (auth.token !== "") {
      try {
        const res = await fetch(
          `https://dummy-1.hiublue.com/api/dashboard/summary?filter=${weekFilter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`, // Pass token in headers
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch summary data");
        }

        const data = await res.json();
        console.log(data);
        setSummary(data);
        return data;
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    }
  };

  const getChartData = async () => {
    if (auth.token !== "") {
      try {
        const res = await fetch(
          `https://dummy-1.hiublue.com/api/dashboard/stat?filter=${weekFilter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`, // Pass token in headers
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch summary data");
        }

        const data = await res.json();
        console.log(data);
        setChartData(data);
        return data;
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    }
  };

  const getOfferList = async () => {
    if (auth.token !== "") {
      try {
        const res = await fetch(
          "https://dummy-1.hiublue.com/api/offers" +
            `?page=${page}&per_page=${rowsPerPage}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`, // Pass token in headers
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch summary data");
        }

        const data = await res.json();
        console.log(data);
        setOfferList(data?.data);
        setTotal(data?.meta?.total);
        return data;
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    }
  };

  const formatNumber = (num: number): string => {
    if (typeof num === "number") {
      if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B"; // Billion
      if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M"; // Million
      if (num >= 1_000) return (num / 1_000).toFixed(1) + "K"; // Thousand
      return num.toString(); // Less than 1,000 (show raw number)
    } else {
      return "";
    }
  };
  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return "N/A"; // Avoid division by zero
    const change = ((current - previous) / previous) * 100;
    return `${change.toFixed(2)}%`; // Limit to 2 decimal places
  };

  useEffect(() => {
    getOfferList();
  }, [auth, page, rowsPerPage]);

  useEffect(() => {
    getSummaryData();
    getChartData();
    getOfferList();
  }, [auth, weekFilter]);

  // useEffect(() => {
  //   if (auth.token !== "") {
  //     router.push("/login");
  //   } else {
  //     return;
  //   }
  // }, []);

  return (
    <>
      <GoogleIcon />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>

          <Select
            value={weekFilter}
            onChange={(e) => setWeekFilter(e.target.value)}
            size="small"
          >
            <MenuItem value="this-week">This Week</MenuItem>
            <MenuItem value="prev-week">Prev Week</MenuItem>
          </Select>
        </Stack>

        <Box sx={{ mt: 4 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
            <Card
              sx={{
                flex: 1,
                padding: "card/content-p",
                borderRadius: "card/radius",
                shadows: "card",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  fontFamily={"subtitle2/family"}
                  color="#1C252E"
                  gutterBottom
                >
                  Total active users
                </Typography>
                <Typography variant="h3" component="div">
                  {formatNumber(summary?.current?.active_users)}
                </Typography>
                <Stack direction={"row"} gap={1}>
                  {summary?.current?.active_users >
                  summary?.previous?.active_users ? (
                    <Image src="/up.svg" height={24} width={24} alt="" />
                  ) : (
                    <Image src="/down.svg" height={24} width={24} alt="" />
                  )}
                  <Typography
                    variant="subtitle2"
                    color={
                      summary?.current?.active_users >=
                      summary?.previous?.active_users
                        ? "green"
                        : "red"
                    }
                  >
                    {getPercentageChange(
                      summary?.current?.active_users,
                      summary?.previous?.active_users
                    )}
                  </Typography>
                  <Typography variant="subtitle2" color="textPrimary">
                    previous month
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card
              sx={{
                flex: 1,
                padding: "card/content-p",
                borderRadius: "card/radius",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  fontFamily={"subtitle2/family"}
                  color="#1C252E"
                  gutterBottom
                >
                  Total clicks
                </Typography>
                <Typography variant="h3" component="div">
                  {formatNumber(summary?.current?.clicks)}
                </Typography>
                <Stack direction={"row"} gap={1}>
                  {summary?.current?.clicks > summary?.previous?.clicks ? (
                    <Image src="/up.svg" height={24} width={24} alt="" />
                  ) : (
                    <Image src="/down.svg" height={24} width={24} alt="" />
                  )}
                  <Typography
                    variant="subtitle2"
                    color={
                      summary?.current?.clicks >= summary?.previous?.clicks
                        ? "green"
                        : "red"
                    }
                  >
                    {getPercentageChange(
                      summary?.current?.clicks,
                      summary?.previous?.clicks
                    )}
                  </Typography>
                  <Typography variant="subtitle2" color="textPrimary">
                    previous month
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card
              sx={{
                flex: 1,
                padding: "card/content-p",
                borderRadius: "card/radius",
              }}
            >
              <CardContent>
                <Typography
                  variant="subtitle2"
                  fontFamily={"subtitle2/family"}
                  color="#1C252E"
                  gutterBottom
                >
                  Total appearance
                </Typography>
                <Typography variant="h3" component="div">
                  {formatNumber(summary?.current?.appearance)}
                </Typography>
                <Stack direction={"row"} gap={1}>
                  {summary?.current?.appearance >
                  summary?.previous?.appearance ? (
                    <Image src="/up.svg" height={24} width={24} alt="" />
                  ) : (
                    <Image src="/down.svg" height={24} width={24} alt="" />
                  )}
                  <Typography
                    variant="subtitle2"
                    color={
                      summary?.current?.appearance >=
                      summary?.previous?.appearance
                        ? "green"
                        : "red"
                    }
                  >
                    {getPercentageChange(
                      summary?.current?.appearance,
                      summary?.previous?.appearance
                    )}
                  </Typography>
                  <Typography variant="subtitle2" color="textPrimary">
                    previous month
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
      {chartData && <Charts apiResponse={chartData} />}

      {offerList.length > 0 && (
        <OfferList
          page={page}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
          rows={offerList}
          total={total}
        />
      )}
    </>
  );
}
