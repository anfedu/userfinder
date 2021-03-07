import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chip,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
} from "@material-ui/core";
import Link from "../src/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "0 auto",
    top: "auto",
    bottom: 0,
    fontSize: 15,
    backgroundColor: "rgba(20,20,20, 0.9)",
  },
  linkWrapper: {
    backgroundColor: "none",
    borderColor: "#eee",
    color: "#eee",
    height: 40,
    borderRadius: 21,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
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
      justifyContent: "center",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();
  const router = useRouter();
  const iconArray = [
    {
      id: 1,
      class: classes.iconGh,
      icon: GitHubIcon,
      link: "http://github.com/anfedu",
    },
    {
      id: 2,
      class: classes.iconWa,
      icon: WhatsAppIcon,
      link: "https://wasap.at/qcib7h",
    },
    {
      id: 3,
      class: classes.iconFb,
      icon: FacebookIcon,
      link: "https://web.facebook.com/profile.php?id=100009305915205",
    },
    {
      id: 4,
      class: classes.iconTg,
      icon: TelegramIcon,
      link: "https://t.me/ahmadnurilfirdaus",
    },
    {
      id: 5,
      class: classes.iconLinkedIn,
      icon: LinkedInIcon,
      link: "https://www.linkedin.com/in/ahmad-nuril-firdaus/",
    },
  ];
  return (
    <AppBar className={classes.root} position="fixed">
      <Toolbar className={classes.footer}>
        <Typography variant="body1">
          Created by <b> Ahmad Nuril Firdaus</b>
        </Typography>
        <Chip
          className={classes.linkWrapper}
          variant="outlined"
          label={
            <>
              {iconArray.map((item, index) => (
                <IconButton
                  className={item.class}
                  component={Link}
                  href={`${item.link}`}
                  target="_blank"
                  key={index}
                >
                  <item.icon />
                </IconButton>
              ))}
            </>
          }
        />
      </Toolbar>
    </AppBar>
  );
}
