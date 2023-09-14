import { useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import axios from "axios";
import styled from "styled-components";
import UserLog from "./UserLog";

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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
    color: #fff;
    background-color: #11102c;
  }

  &:first-child {
    margin-left: 0;
  }

  &.active {
    color: #fff;
    background-color: #0d0c22;
  }
`;

const UserSignuoChart = () => {
  const [userData, setUserData] = useState([]);
  const [filter, setFilter] = useState("week");

  const handleUserData = useCallback(async (type) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/admin/user/${type}`
      );
      const data = response.data;
      setUserData(data.data);
      setFilter(type);
      console.log(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    handleUserData("week");
    setFilter("week");
  }, [handleUserData]);

  function handleFilterClick(type) {
    handleUserData(type);
  }

  const colors = {
    user: "#7e23f6",
    trialUser: "#4ECDC4",
    canceledSubscriptions: "#FF6B6B",
  };

  return (
    <>
      <Header>
        <SectionTitle>Dashboard</SectionTitle>
        <FilterBar>
          <FilterButton
            className={filter === "week" ? "active" : ""}
            onClick={() => handleFilterClick("week")}
          >
            Last week
          </FilterButton>
          <FilterButton
            className={filter === "month" ? "active" : ""}
            onClick={() => handleFilterClick("month")}
          >
            Last month
          </FilterButton>
          <FilterButton
            className={filter === "last6months" ? "active" : ""}
            onClick={() => handleFilterClick("last6months")}
          >
            Last 6 months
          </FilterButton>
        </FilterBar>
      </Header>
      <Container>
        <LineChart
          width={800}
          height={300}
          data={userData}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="user"
            stroke={colors.user}
            name="User"
          />
          <Line
            type="monotone"
            dataKey="trialUser"
            stroke={colors.trialUser}
            name="Trial User"
          />
          <Line
            type="monotone"
            dataKey="canceledSubscriptions"
            stroke={colors.canceledSubscriptions}
            name="Canceled Subscriptions"
          />
        </LineChart>
        <UserLog />
      </Container>
    </>
  );
};

export default UserSignuoChart;
const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
  background-color: #fff;
`;
