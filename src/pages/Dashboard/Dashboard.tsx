import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";

import { DashboardWrapper, DashboardBody } from "./Dashboard.style";

import AuthRoute from "components/AuthRoute";
import AddPerformance from "components/AddPerformance/AddPerformance";
import Navbar from "components/Navbar/Navbar";
import NotFound from "components/NotFound";
import Sidebar from "components/Sidebar/Sidebar";
import Footer from "components/Footer2";

import Performances from "pages/Performances/Performance";
import Profile from "pages/Profile/Profile";
import Profiles from "pages/Profiles/Profiles";
import SinglePerformance from "pages/SinglePerformance/SinglePerformance";

// extracting out the logic to prevent re-render
const Navigation = React.memo(() => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (e.target.closest("a")) {
        setIsSidebarOpen(false);
      }
    });
  }, []);
  return (
    <>
      <Navbar handleSidebar={handleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
});

const Dashboard: React.FC = () => {
  return (
    <DashboardWrapper>
      <Navigation />
      <div>
        <DashboardBody>
          <Switch>
            <AuthRoute exact path="/dashboard/performances" component={Performances} />
            <AuthRoute exact path="/dashboard/new-performance" component={AddPerformance} />
            <AuthRoute
              exact
              path="/dashboard/performances/:performanceId"
              component={SinglePerformance}
            />
            <AuthRoute exact path="/profiles" component={Profiles} />
            <AuthRoute exact path="/profiles/:username" component={Profile} />

            <Route path="/" component={NotFound} />
          </Switch>
        </DashboardBody>
        <Footer />
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
