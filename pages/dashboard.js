import React from "react";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "../context/auth";
import { useRouter } from "next/router";
import SearchBar from "../components/Searchbar";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    paddingTop: "7%",
    [theme.breakpoints.down("md")]: {
      paddingTop: "17%",
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const router = useRouter();
  const context = React.useContext(AuthContext);

  React.useEffect(() => {
    if (typeof window !== undefined) {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }
  }, []);

  return (
    <Layout>
      <div className={classes.root}>
        <SearchBar />
      </div>
    </Layout>
  );
};

export default App;
