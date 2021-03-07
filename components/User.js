import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import {
  IconButton,
  Collapse,
  Popper,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Avatar,
  Divider,
  Box,
} from "@material-ui/core";
import Link from "../src/Link";
import { AuthContext } from "../context/auth";

function randomColor(string) {
  return "#f" + string.slice(1, 6);
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  menuMobileWrapper: {
    background: "none",
    color: "#ccc",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  // arrow: {
  //   width: 0,
  //   height: 0,
  //   borderLeft: "15px solid transparent",
  //   borderRight: "15px solid transparent",
  //   borderBottom: "17px solid white",
  //   position: "absolute",
  //   top: -7,
  //   right: theme.spacing(2.7),
  // },
  menu: {
    marginLeft: 13,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  icon: { marginLeft: 20 },
  menuItem: {
    "&:hover": {
      backgroundColor: "#444",
    },
  },
  avatar: {
    fontWeight: "bold",
    fontSize: 20,
    [theme.breakpoints.down("xs")]: {
      width: 30,
      height: 30,
    },
  },
}));

export default function UserMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const router = useRouter();
  const context = React.useContext(AuthContext);
  const { user, logout } = context;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    router.push("/");
    logout();
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <IconButton
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar
          className={classes.avatar}
          style={{
            backgroundColor: "springgreen",
            color: "white",
          }}
        ></Avatar>
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        placement="bottom-end"
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Collapse
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper
              style={{
                width: 220,
                marginTop: "3%",
                backgroundColor: "#777",
              }}
            >
              <Box variant="div" className={classes.arrow} />
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <Box variant="div">
                    <MenuItem onClick={handleLogout}>
                      <img src="/logout.png" className={classes.icon} alt="" />{" "}
                      <span className={classes.menu}>Logout</span>
                    </MenuItem>
                  </Box>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Collapse>
        )}
      </Popper>
    </div>
  );
}

// <Paper className={classes.menuMobileWrapper}>
//   <ClickAwayListener onClickAway={handleClose}>
//     <MenuList
//       autoFocusItem={open}
//       id="menu-list-grow"
//       onKeyDown={handleListKeyDown}
//     >
//       <Box variant="div">
//         <MenuItem className={classes.menuItem} onClick={handleClose}>
//           <img src="/user.png" alt="" />{" "}
//           <span className={classes.menu}>Profile</span>
//         </MenuItem>
//         <MenuItem className={classes.menuItem} onClick={handleClose}>
//           <img src="/bill.png" alt="" />{" "}
//           <span className={classes.menu}>Pay</span>
//         </MenuItem>
//         <MenuItem className={classes.menuItem} onClick={handleLogout}>
//           <img src="/logout.png" alt="" />{" "}
//           <span className={classes.menu}>Logout</span>
//         </MenuItem>
//       </Box>
//     </MenuList>
//   </ClickAwayListener>
// </Paper>
