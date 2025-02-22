"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useAuth } from "@/components/context/ContextProvider";
import { useRouter } from "next/navigation";

const CreateOfferForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const [planType, setPlanType] = useState("monthly");
  const [additions, setAdditions] = useState(["refundable"]);
  const [userList, setUserList] = useState<any>([]); // List of users
  const [user, setUser] = useState<number | null>(null); // Selected user
  const [expired, setExpired] = useState("2023-05-03");
  const [price, setPrice] = useState("");


  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 

  // State for validation errors
  const [errors, setErrors] = useState({
    planType: false,
    additions: false,
    user: false,
    expired: false,
    price: false,
  });

  // Fetch users with pagination
  const getUsers = async (page: number) => {
    if (auth.token !== "") {
      try {
        const res = await fetch(
          `https://dummy-1.hiublue.com/api/users?page=${page}&per_page=20`, // Fetch 20 users per page
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        if (data.data.length === 0) {
          setHasMore(false); // No more users to load
        } else {
          setUserList((prev: any) => [...prev, ...data.data]); // Append new users
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  // Load more users when scrolling to the bottom
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.clientHeight ===
      listboxNode.scrollHeight
    ) {
      if (hasMore) {
        setPage((prev) => prev + 1); // Increment page to fetch more users
      }
    }
  };

  // Fetch users on component mount and when page changes
  useEffect(() => {
    getUsers(page);
  }, [page]);

  // Set the first user as default when userList is populated
  useEffect(() => {
    if (userList.length > 0 && user === null) {
      setUser(userList[0].id);
    }
  }, [userList]);

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate form fields
    const newErrors = {
      planType: !planType,
      additions: additions.length === 0,
      user: user === null,
      expired: !expired.trim(),
      price: !price.trim() || isNaN(Number(price)),
    };

    setErrors(newErrors);

    // If no errors, submit the form
    if (!Object.values(newErrors).some((error) => error)) {
      try {
        const response = await fetch("https://dummy-1.hiublue.com/api/offers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({
            plan_type: planType,
            additions: additions,
            user_id: user,
            expired: expired,
            price: parseFloat(price),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create offer");
        }

        const data = await response.json();
        console.log("Offer created successfully:", data);
        alert("Offer submitted successfully!");

        // Reset form
        setPlanType("monthly");
        setAdditions(["refundable"]);
        setUser(null);
        setExpired("2023-05-03");
        setPrice("");
        router.push("/dashboard");
      } catch (error) {
        console.error("Error creating offer:", error);
        alert("Failed to create offer. Please try again.");
      }
    }
  };

  // Handle plan type change
  const handlePlanTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlanType(event.target.value);
    setErrors((prev) => ({ ...prev, planType: false }));
  };

  // Handle additions change
  const handleAdditionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setAdditions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    setErrors((prev) => ({ ...prev, additions: false }));
  };

  // Fetch users on component mount
  useEffect(() => {
    getUsers(1); // Fetch first page
    if (!auth.token) {
      router.push("/login");
    }
  }, [auth, router]);

  return (
    <Box sx={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Create Offer
      </Typography>
      <Typography variant="body1" gutterBottom>
        Send onboarding offer to new user
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Plan Type */}
        <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
          <FormLabel component="legend">Plan Type</FormLabel>
          <RadioGroup row value={planType} onChange={handlePlanTypeChange}>
            <FormControlLabel
              value="pay_as_you_go"
              control={
                <Radio
                  sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                />
              }
              label="Pay As You Go"
            />
            <FormControlLabel
              value="monthly"
              control={
                <Radio
                  sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                />
              }
              label="Monthly"
            />
            <FormControlLabel
              value="yearly"
              control={
                <Radio
                  sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                />
              }
              label="Yearly"
            />
          </RadioGroup>
          {errors.planType && (
            <FormHelperText error>Please select a plan type.</FormHelperText>
          )}
        </FormControl>

        {/* Additions */}
        <FormControl component="fieldset" sx={{ marginBottom: "20px" }}>
          <FormLabel component="legend">Additions</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={additions.includes("refundable")}
                  onChange={handleAdditionsChange}
                  value="refundable"
                  sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                />
              }
              label="Refundable"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={additions.includes("on_demand")}
                  onChange={handleAdditionsChange}
                  value="on_demand"
                  sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                />
              }
              label="On Demand"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={additions.includes("negotiable")}
                  onChange={handleAdditionsChange}
                  value="negotiable"
                  sx={{ color: "green", "&.Mui-checked": { color: "green" } }}
                />
              }
              label="Negotiable"
            />
          </FormGroup>
          {errors.additions && (
            <FormHelperText error>
              Please select at least one addition.
            </FormHelperText>
          )}
        </FormControl>

        {/* User (Select Component) */}
        <FormControl
          fullWidth
          sx={{ marginBottom: "20px" }}
          error={errors.user}
        >
          <InputLabel id="user-select-label">User</InputLabel>
          <Select
            labelId="user-select-label"
            id="user-select"
            value={user || ""}
            label="User"
            onChange={(e) => setUser(Number(e.target.value))}
            MenuProps={{
              PaperProps: {
                onScroll: handleScroll, // Handle scroll event
                style: {
                  maxHeight: 200,
                  overflow: "auto",
                },
              },
            }}
          >
            {userList?.map((user: any) => (
              <MenuItem key={user.id} value={user.id}>
                {user.name}
              </MenuItem>
            ))}
            {hasMore && <MenuItem disabled>Loading more users...</MenuItem>}
          </Select>
          {errors.user && (
            <FormHelperText>Please select a user.</FormHelperText>
          )}
        </FormControl>

        {/* Expired */}
        <TextField
          label="Expired"
          type="date"
          variant="outlined"
          fullWidth
          value={expired}
          onChange={(e) => {
            setExpired(e.target.value);
            setErrors((prev) => ({ ...prev, expired: false }));
          }}
          sx={{ marginBottom: "20px" }}
          error={errors.expired}
          helperText={errors.expired ? "Expired date is required." : ""}
        />

        {/* Price */}
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            setErrors((prev) => ({ ...prev, price: false }));
          }}
          sx={{ marginBottom: "20px" }}
          error={errors.price}
          helperText={
            errors.price ? "Price is required and must be a number." : ""
          }
        />

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="secondary">
          Send Offer
        </Button>
      </form>
    </Box>
  );
};

export default CreateOfferForm;
