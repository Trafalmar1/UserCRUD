import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  useEffect(() => {
    history.replace("/profiles");
  }, [history]);
  return null;
};

export default Home;
