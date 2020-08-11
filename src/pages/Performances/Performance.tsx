import React, { useEffect } from "react";
import styled from "styled-components";
import Masonry from "react-masonry-css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import useQuery from "hooks/useQuery";

import { formatDate } from "utils";
import { Flex, Button, Loading, Illustration } from "@pf85-ui";

import DashboardHeader from "components/DashboardHeader";
import PerformanceCard from "components/PerformanceCard/PerformanceCard";
import { fetchPerformances } from "store/ducks/performances";
import { StoreState } from "store";

const breakpointColumns = {
  default: 3,
  1440: 3,
  1024: 2,
  768: 1,
};

const PerformancesWrapper = styled.section`
  margin-top: 0;
`;

const Performances: React.FC = () => {
  let query = useQuery();
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.auth.user);
  const performances = useSelector((state: StoreState) => state.performances);
  const [isLoading, error] = useSelector((state: StoreState) => [
    state.loading["performances/FETCH_PERFORMANCES"],
    state.error["performances/FETCH_PERFORMANCES"],
  ]);

  useEffect(() => {
    dispatch(fetchPerformances());
  }, [dispatch]);

  const renderPerformances = () => {
    if (error) {
      return (
        <Illustration
          message="Something went wrong while loading the data"
          type="error"
        />
      );
    }

    if (performances.length === 0 && !isLoading) return <Illustration type="empty" />;

    // setting is loading in JSX because
    // early exiting prevents loading & showing data at the same time
    return (
      <>
        {isLoading && <Loading />}
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {performances
            ?.filter((performance: any) => {
              const status = query.get("status");
              if (!status) return performance.isOpen;
              // check for matching
              return status && !performance.isOpen;
            })
            .map((performance: any) => {
              return (
                <PerformanceCard
                  key={performance.id}
                  title={performance.title}
                  number={performance.id}
                  body={performance.body}
                  isOpen={performance.id === user.id}
                  date={formatDate(performance.date_opened)}
                  author={performance.author}
                  subject={performance.subject}
                />
              );
            })}
        </Masonry>
      </>
    );
  };

  return (
    <PerformancesWrapper>
      <DashboardHeader>
        <Flex align="center">
          <h1>{query.get("status") ? "Closed Performances" : "Track Performances"}</h1>
          <Button
            as={NavLink}
            to="/dashboard/new-performance"
            style={{ marginLeft: 20 }}
            icon="plus"
          >
            Add
          </Button>
        </Flex>
      </DashboardHeader>

      {renderPerformances()}
    </PerformancesWrapper>
  );
};

export default Performances;
