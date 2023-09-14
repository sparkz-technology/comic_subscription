import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {
  FaUser,
  FaUserFriends,
  FaUserCheck,
  FaUserTimes,
  FaUserSlash,
} from "react-icons/fa";

const Container = styled.div`
  width: 100%;
`;

const StyledUserLog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* padding: 10px; */
  /* background-color: #f2f2f2; */
  /* border-radius: 10px; */
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.backgroundColor || "#ffffff"};
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  gap: 10px;
  h1 {
    font-size: 1rem;
    margin: 0;
  }
`;

const HeaderTitle = styled.p`
  margin: 0;
  font-size: 0.8rem;
  font-weight: 500;
  color: ${(props) => props.titleColor || "#000"};
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  margin-right: 10px;
  color: ${(props) => props.iconColor || "#000"};
`;

function UserLog() {
  const [userData, setUserData] = useState({});

  const handleUserData = useCallback(async () => {
    try {
      const response = await Axios.post(
        `http://localhost:8000/admin/user/data`
      );
      const data = response.data;
      setUserData(data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  useEffect(() => {
    handleUserData();
  }, [handleUserData]);

  return (
    <StyledUserLog>
      <Container>
        <Header backgroundColor="#FF6B6B">
          <HeaderIcon iconColor="#fff">
            <FaUserTimes />
          </HeaderIcon>
          <HeaderTitle titleColor="#fff">Cancelled</HeaderTitle>
          <h1 style={{ color: "#fff" }}>{userData.cancelUsers}</h1>
        </Header>
        <Header backgroundColor="#50CB93">
          <HeaderIcon iconColor="#fff">
            <FaUserCheck />
          </HeaderIcon>
          <HeaderTitle titleColor="#fff">Active</HeaderTitle>
          <h1 style={{ color: "#fff" }}>{userData.activeUsers}</h1>
        </Header>
        <Header backgroundColor="#F2C94C">
          <HeaderIcon iconColor="#fff">
            <FaUserFriends />
          </HeaderIcon>
          <HeaderTitle titleColor="#fff">Trial</HeaderTitle>
          <h1 style={{ color: "#fff" }}>{userData.trialUsers}</h1>
        </Header>
        <Header backgroundColor="#FF8A65">
          <HeaderIcon iconColor="#fff">
            <FaUserSlash />
          </HeaderIcon>
          <HeaderTitle titleColor="#fff">Just</HeaderTitle>
          <h1 style={{ color: "#fff" }}>{userData.justUsers}</h1>
        </Header>
        <Header backgroundColor="#82A4FF">
          <HeaderIcon iconColor="#fff">
            <FaUser />
          </HeaderIcon>
          <HeaderTitle titleColor="#fff">All</HeaderTitle>
          <h1 style={{ color: "#fff" }}>{userData.users}</h1>
        </Header>
      </Container>
    </StyledUserLog>
  );
}

export default UserLog;
