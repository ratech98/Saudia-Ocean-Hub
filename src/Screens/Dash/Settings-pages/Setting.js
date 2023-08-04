import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IMAGES from "../../Images";
import "./Setting.css";
import { confirmTickMsg } from "../../../redux/slices";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { HeaderContent } from "../../Common/map/HeaderContent";
import { toast } from "react-toastify";
import Footer from "../../../Component/Footer/Footer";
import { EditProfileTab } from "./setting-tab/EditProfileTab";
import { NotificationTab } from "./setting-tab/NotificationTab";

const first_tab = "Edit Profile";
const second_tab = "Billing & Payment";
const third_tab = "Security & Password";
const fourth_tab = "Notifications Settings";

export const Setting = () => {
  const auth = useSelector((state) => state?.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Edit Profile");

  const handleHeaderCallBack = (name) => {
    if (name === "Home") {
      if (auth?.tokenDecodeData?.user_type === "BOAT_OWNER") {
        navigate("/boatOwnerDashBoard");
      } else {
        navigate("/rental");
      }
    } else if (name === "Log In") {
      navigate("/logIn");
    } else if (name === "Sign Up") {
      navigate("/signUP");
    } else if (name === "My Listings") {
      navigate("/myListings");
    } else if (name === "For Boat Rentals" || name === "For Boat Owners") {
      toast.info("Under Development", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else if (name === "/searchBoat") {
      navigate("/searchBoat");
    }
  };

  const handleNavigation = (tabName) => {
    setSelectedTab(tabName);
  };
  console.log(
    " selectedTab === ",
    selectedTab === first_tab,
    "selectedTab",
    selectedTab,
    "first_tab",
    first_tab
  );
  return (
    <>
      <div className="setting">
        <HeaderContent
          contentname1={"Home"}
          contentname2={"For Boat Owners"}
          contentname3={"For Boat Rentals"}
          contentname4={"My Listings"}
          handleBack={handleHeaderCallBack}
          search={"/searchBoat"}
          showLoginSignUp={auth?.AuthToken ? false : true}
          presentPage={"Home"}
          showline={false}
        />

        <Container>
          <div class="inside-container">
            <Typography className="title">Settings</Typography>

            <Row className="header-tab">
              <Col>
                <Nav>
                  <Nav.Item>
                    <Typography
                      onClick={() => handleNavigation(first_tab)}
                      className={
                        selectedTab === first_tab
                          ? "tab-selected-title"
                          : "tab-title"
                      }
                      style={{ padding: "0px 30px 0px 0px" }}
                    >
                      {first_tab}
                    </Typography>
                  </Nav.Item>
                  <Nav.Item>
                    <Typography
                      onClick={() => handleNavigation(second_tab)}
                      className={
                        selectedTab === second_tab
                          ? "tab-selected-title"
                          : "tab-title"
                      }
                    >
                      {second_tab}
                    </Typography>
                  </Nav.Item>
                  <Nav.Item>
                    <Typography
                      onClick={() => handleNavigation(third_tab)}
                      className={
                        selectedTab === third_tab
                          ? "tab-selected-title"
                          : "tab-title"
                      }
                    >
                      {third_tab}
                    </Typography>
                  </Nav.Item>
                  <Nav.Item>
                    <Typography
                      onClick={() => handleNavigation(fourth_tab)}
                      className={
                        selectedTab === fourth_tab
                          ? "tab-selected-title"
                          : "tab-title"
                      }
                      style={{ padding: "0px 0px 0px 30px" }}
                    >
                      {fourth_tab}
                    </Typography>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <div
              style={{
                // backgroundColor: "red",
                padding: "100px 0px",
              }}
            >
              {selectedTab === first_tab ? (
                <>
                  <EditProfileTab />
                </>
              ) : selectedTab === fourth_tab ? (
                <NotificationTab />
              ) : null}
            </div>
          </div>
        </Container>

        <div className="footer-style">
          <Footer />
        </div>
      </div>
    </>
  );
};
