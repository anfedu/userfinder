import React from "react";
import Register from "../components/register";
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
        <Register />
      </div>
    </Layout>
  );
};

export default App;
