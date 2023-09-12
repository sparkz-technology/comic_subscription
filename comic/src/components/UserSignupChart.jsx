import { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  //   Legend,
} from "recharts";

import axios from "axios";
const UserSignuoChart = () => {
  const [userData, setUserData] = useState([]);
  // Dummy data for each day of the week for different user types
  const handleUserData = useCallback(() => {
    async (days) => {
      const response = await axios.post(
        `http://localhost:8000/admin/user/${days}`
      );
      const data = await response.data;
      console.log(data);
      setUserData(data);
    };
  }, []);
  useEffect(() => {
    handleUserData(7);
  }, [handleUserData]);

  function handleFilterClick(days) {
    handleUserData(days);
  }

  const userDataa = [
    {
      name: "Sunday",
      activeSubscribers: 10,
      trialSubscribers: 20,
      canceledSubscriptions: 5,
    },
    {
      name: "Monday",
      activeSubscribers: 40,
      trialSubscribers: 80,
      canceledSubscriptions: 20,
    },
    {
      name: "Tuesday",
      activeSubscribers: 60,
      trialSubscribers: 120,
      canceledSubscriptions: 30,
    },
    {
      name: "Wednesday",
      activeSubscribers: 30,
      trialSubscribers: 60,
      canceledSubscriptions: 15,
    },
    {
      name: "Thursday",
      activeSubscribers: 50,
      trialSubscribers: 100,
      canceledSubscriptions: 25,
    },
    {
      name: "Friday",
      activeSubscribers: 20,
      trialSubscribers: 40,
      canceledSubscriptions: 10,
    },
    {
      name: "Saturday",
      activeSubscribers: 15,
      trialSubscribers: 30,
      canceledSubscriptions: 7,
    },
  ];

  // Define custom colors for each line
  const colors = {
    activeSubscribers: "#FF6B6B", // Red
    trialSubscribers: "#4ECDC4", // Teal
    canceledSubscriptions: "#7e23f6", // Orange
  };

  return (
    <>
      <Header>
        <SectionTitle>Dashboard</SectionTitle>
        <FilterBar>
          <FilterButton className="active" onclick={handleFilterClick(7)}>
            Last 7 days
          </FilterButton>
          <FilterButton onclick={handleFilterClick(30)}>
            Last 30 days
          </FilterButton>
          <FilterButton onclick={() => handleFilterClick(90)}>
            Last 90 days
          </FilterButton>
        </FilterBar>
      </Header>
      <LineChart
        width={900}
        height={400}
        data={userData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        {/* Active Subscribers Line */}
        <Line
          type="monotone"
          dataKey="activeSubscribers"
          stroke={colors.activeSubscribers}
          name="Active Subscribers"
        />
        {/* Trial Subscribers Line */}
        <Line
          type="monotone"
          dataKey="trialSubscribers"
          stroke={colors.trialSubscribers}
          name="Trial Subscribers"
        />
        {/* Canceled Subscriptions Line */}
        <Line
          type="monotone"
          dataKey="canceledSubscriptions"
          stroke={colors.canceledSubscriptions}
          name="Canceled Subscriptions"
        />
      </LineChart>
    </>
  );
};

export default UserSignuoChart;
import styled from "styled-components";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
`;
const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 5px;
  border-radius: 5px;

  background-color: #f5f5f5;
`;
const FilterButton = styled.button`
  background-color: transparent;
  border: 0px;
  padding: 5px 10px;
  margin-left: 10px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 5px;
  transition: 0.2s;

  &:hover {
    cursor: pointer;
    background-color: #fec;
  }
  &:first-child {
    margin-left: 0;
  }
  &.active {
    background-color: #fca;
  }
`;
