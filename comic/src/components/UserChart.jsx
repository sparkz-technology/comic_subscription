/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";
import UserLog from "./UserLog";
import { useUserChart } from "../hooks/useUserChart";
import Loader from "../ui/Loader";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SectionTitle = styled.h1`
  font-size: 20px;
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

const UserChart = () => {
  const [filter, setFilter] = useState("week");
  const { data, isLoading, error } = useUserChart(filter);

  const handleFilterClick = (filter) => {
    setFilter(filter);
  };

  const colors = {
    user: "#7e23f6",
    trialUser: "#4ECDC4",
  };
  // if (isLoading) {
  //   return (
  //     <LoaderContainer>
  //       <Loader />
  //     </LoaderContainer>
  //   );
  // }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header>
        <SectionTitle>User analytics</SectionTitle>
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
        {isLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <LineChart
            width={800}
            height={300}
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />

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
          </LineChart>
        )}
        <UserLog />
      </Container>
    </>
  );
};

export default UserChart;
const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
  background-color: #fff;
`;
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
  height: 300px;
`;
