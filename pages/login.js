import React from "react";
import Login from "../components/login";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";

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
  return (
    <Layout>
      <div className={classes.root}>
        <Login />
      </div>
    </Layout>
  );
};

export default App;
