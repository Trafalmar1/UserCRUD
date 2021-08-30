import DashboardItem from "components/DashboardItem/DashboardItem";
import { Title } from "UI";

import classes from "./styles.module.scss";

const Dashboard = () => {
  return (
    <>
      <Title>Dashboard:</Title>
      <div className={classes.DashboardList}>
        <DashboardItem title="Users:" number={5} />
        <DashboardItem title="Profiles:" number={10} />
        <DashboardItem title="Profiles over 18 years old:" number={3} />
      </div>
    </>
  );
};

export default Dashboard;
