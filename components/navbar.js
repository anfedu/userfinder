import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Box,
  Button,
} from "@material-ui/core";
import Link from "../src/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useRouter } from "next/router";
import MenuIcon from "@material-ui/icons/Menu";
import User from "./User";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0 auto",
    fontSize: 15,
    backgroundColor: "rgba(20,20,20, 0.9)",
    // [theme.breakpoints.down("md")]: {
    //   display: "none",
    // },
  },
  linkWrapper: {
    backgroundColor: "none",
    borderColor: "#eee",
    color: "#eee",
    height: 40,
    borderRadius: 21,
  },
  iconGh: {
    color: "#eee",
    padding: "3px 3px",
    marginInline: 10,
    backgroundColor: "#777",
    "&:hover": {
      backgroundColor: "#666",
      color: "white",
    },
  },
  iconFb: {
    color: "#eee",
    padding: "3px 3px",
    marginInline: 10,
    backgroundColor: "#3b5998",
    "&:hover": {
      backgroundColor: "#3b4880",
      color: "white",
    },
  },
  iconTg: {
    color: "#eee",
    padding: "3px 3px",
    marginInline: 10,
    backgroundColor: "#0088cc",
    "&:hover": {
      backgroundColor: "#0077aa",
      color: "white",
    },
  },
  iconWa: {
    color: "#eee",
    padding: "3px 3px",
    marginInline: 10,
    backgroundColor: "#42BD36",
    "&:hover": {
      backgroundColor: "#42BD7a",
      color: "white",
    },
  },
  iconLinkedIn: {
    color: "#eee",
    padding: "3px 3px",
    marginInline: 10,
    backgroundColor: "#2867b2",
    "&:hover": {
      backgroundColor: "#2756b0",
      color: "white",
    },
  },
  footer: {
    width: "66%",
    color: "#eee",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  buttonwrap: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  buttonLogin: {
    height: 30,
    width: 100,
    color: "white",
    textTransform: "none",
    marginRight: "5%",
    background: "none",
    border: "1px solid white",
    "&:hover": {
      border: "none",
      backgroundColor: "cornflowerblue",
      border: "1px solid cornflowerblue",
    },
  },
  buttonRegister: {
    height: 30,
    width: 100,
    color: "white",
    textTransform: "none",
    backgroundColor: "cornflowerblue",
    border: "1px solid cornflowerblue",
    "&:hover": {
      background: "none",
      border: "1px solid white",
    },
  },
  "@keyframes skeletons": {
    "0%": {
      borderWidth: 0,
    },
    "100%": {
      borderWidth: "100%",
      border: "1px solid pink",
    },
  },
  menuIcon: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar className={classes.footer}>
        <Typography variant="h6">
          <b> Ahmad Nuril Firdaus</b>
        </Typography>
        {router.pathname === "/dashboard" ? (
          <User />
        ) : (
          <>
            <IconButton className={classes.menuIcon}>
              <MenuIcon style={{ color: "white" }} />
            </IconButton>
            <Box variant="div" className={classes.buttonwrap}>
              <Button
                fullWidth
                variant="contained"
                className={classes.buttonLogin}
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
              <Button
                fullWidth
                variant="contained"
                className={classes.buttonRegister}
                onClick={() => router.push("/")}
              >
                Register
              </Button>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
