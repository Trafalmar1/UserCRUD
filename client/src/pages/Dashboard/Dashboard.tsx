import { useDispatch, useSelector } from "react-redux";

import { DashboardItem } from "components";
import { Title } from "UI";

import classes from "./styles.module.scss";
import { RootState } from "redux/store";
import { UserReducer } from "redux/reducers/userReducer";
import { useEffect } from "react";
import { getDashboard } from "redux/actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { dashboard } = useSelector(
    (state: RootState) => state.user as UserReducer
  );

  useEffect(() => {
    dispatch(getDashboard());
  }, [dispatch]);

  return (
    <>
      <Title>Dashboard:</Title>
      <div className={classes.DashboardList}>
        <DashboardItem title="Users:" number={dashboard?.userCount} />
        <DashboardItem title="Profiles:" number={dashboard?.profileCount} />
        <DashboardItem
          title="Profiles over 18 years old:"
          number={dashboard?.olderThan18}
        />
      </div>
    </>
  );
};

export default Dashboard;
