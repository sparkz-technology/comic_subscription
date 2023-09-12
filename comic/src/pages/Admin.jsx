import { useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import {
  FaUsers,
  FaFileUpload,
  FaCog /* Add more icons as needed */,
} from "react-icons/fa"; // Example with FontAwesome icons
// import UploadComicBook from "../components/UploadComicBook";
import Upload from "../components/Upload";
import ComicView from "../components/ComicView";

function Admin() {
  const [tab, setTab] = useState("Manage Users");

  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  return (
    <>
      <WrapNavbar>
        <Navbar />
      </WrapNavbar>
      <AdminContainer>
        <Sidebar>
          <Tab
            onClick={() => handleTabChange("Manage Users")}
            className={tab === "Manage Users" ? "active" : ""}
          >
            <FaUsers /> Manage Users
          </Tab>
          <Tab
            onClick={() => handleTabChange("Upload Comic Book")}
            className={tab === "Upload Comic Book" ? "active" : ""}
          >
            <FaFileUpload /> Upload Comic
          </Tab>
          <Tab
            onClick={() => handleTabChange("Settings")}
            className={tab === "Settings" ? "active" : ""}
          >
            <FaCog /> Settings
          </Tab>
          {/* Add more tabs with icons here */}
        </Sidebar>
        <TabContainer>
          <TabContent>
            {tab === "Manage Users" && (
              <>
                <SectionTitle>Manage Users</SectionTitle>
                {/* <ManageUsers /> Render the ManageUsers component */}
              </>
            )}
            {tab === "Upload Comic Book" && (
              <>
                <SectionTitle>Upload Comic Book</SectionTitle>

                {/* <UploadComicBook /> */}
                <ComicView />
                <Upload />
              </>
            )}
            {tab === "Settings" && (
              <>
                <SectionTitle>Settings</SectionTitle>
                {/* Add your settings component here */}
              </>
            )}
            {/* Add more tab content here */}
          </TabContent>
        </TabContainer>
      </AdminContainer>
    </>
  );
}

export default Admin;

const AdminContainer = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 200px;
  padding-right: 20px;
  position: fixed; /* Fix the sidebar position */
`;

const Tab = styled.div`
  padding: 10px;
  font-size: 18px;
  font-weight: 400;
  text-align: start;
  margin: 0;
  border-radius: 5px;
  transition: 0.2s;
  color: #000;
  margin-bottom: 10px;

  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
  &.active {
    background-color: #e0e0e0;
  }
`;

const TabContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  margin-left: 220px; /* Adjust this value to match your sidebar width */
`;

const TabContent = styled.div`
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: start;
  margin: 0;
  margin-bottom: 20px;
  color: #000;
`;

const WrapNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;
// how to remove the scroll bar style the scroll bar
// https://stackoverflow.com/questions/16670931/hide-scroll-bar-but-while-still-being-able-to-scroll
