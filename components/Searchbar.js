import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AccountIcon from "@material-ui/icons/AccountCircle";
import { findUser } from "./findUser";
import {
  TextField,
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Link from "../src/Link";
import useOutsideClick from "./useOutsideClick";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10%",
    padding: "0 17%",
    [theme.breakpoints.down("md")]: { padding: "0 3%" },
  },
  button: {
    height: 50,
    color: "white",
    textTransform: "none",
    fontSize: 18,
    backgroundColor: "cornflowerblue",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "lightblue",
    },
    [theme.breakpoints.down("xs")]: {
      position: "absolute",
      width: 50,
      right: theme.spacing(1.2),
    },
  },
  cssLabel: {
    color: "pink",
  },
  cssOutlinedInput: {
    height: 50,
    border: "1px solid #ccc",
    color: "#eee",
  },
  cssFocused: {
    fontWeight: 600,
    border: "2px solid aqua",
    color: "#eee",
    "&:hover": {
      border: "2px solid aqua",
    },
  },
  notchedOutline: {
    borderColor: "white",
    border: "none",
  },
  search: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  icon: {
    fontSize: 30,
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 25,
    },
  },
  card: {
    width: "100%",
    textDecoration: "none",
    height: 57,
    backgroundColor: "rgba(244, 244, 244, 0.9)",
    "&:hover": { backgroundColor: "#eee" },
  },
  locationicon: {
    color: "red",
  },
  bodytitle: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: -20,
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: 3,
    },
  },
  cardContent: {
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 5,
      paddingRight: 7,
    },
  },
  alert: {
    opacity: 0.9,
  },
}));

export default function SearchBar() {
  const errors = false;
  const classes = useStyles();
  const theme = useTheme();
  const ref = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);
  const matches = theme.breakpoints.down("xs");
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({ search: "" });
  const [state, setState] = React.useState({ users: [] });

  const fetchUsers = async () => {
    const url = `${process.env.server}/api/v1/users`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setState({ users: data.data });
        }
      })
      .then((err) => {
        if (err) {
          console.log(err);
        }
      });
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  useOutsideClick(ref, () => {
    setOpen(false);
    setValues({ search: "" });
  });

  const onChange = (e) => {
    setData(findUser(e.target.value, state.users || []));
    setValues({ ...values, [e.target.name]: e.target.value });
    setOpen(false);
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      setTimeout(() => {
        setOpen(true);
      }, 1510);
    }
  };

  return (
    <Grid container spacing={0} className={classes.root}>
      <Grid item xs={10} sm={10} md={10} lg={10}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Find User"
          required
          value={values.search}
          id="search"
          type="text"
          error={errors ? true : false}
          name="search"
          autoComplete="search"
          onChange={onChange}
          onKeyDown={keyPress}
          InputLabelProps={{
            classes: {
              root: classes.cssLabel,
              focused: classes.cssFocused,
            },
          }}
          InputProps={{
            classes: {
              root: classes.cssOutlinedInput,
              focused: classes.cssFocused,
              notchedOutline: classes.notchedOutline,
            },
          }}
        />
      </Grid>
      <Grid item xs={2} sm={2} md={2} lg={2}>
        <Button
          ref={ref}
          fullWidth
          className={classes.button}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              setOpen(true);
            }, 1500);
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} style={{ color: "white" }} />
          ) : (
            <React.Fragment>
              <span className={classes.search}>Search</span>
              <SearchIcon className={classes.icon} />
            </React.Fragment>
          )}
        </Button>
      </Grid>
      {state.users.length > 0 &&
        Object.keys(values.search).length > 0 &&
        data.map(
          (item, i) =>
            open && (
              <Grid
                key={i}
                item
                xs={12}
                sm={12}
                md={10}
                lg={10}
                style={{ marginTop: 3, zIndex: 999 }}
              >
                <Link
                  href={`/trip/${item.id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Grid container spacing={0}>
                        <Grid item xs={1} sm={1} lg={1}>
                          <AccountIcon className={classes.locationicon} />
                        </Grid>
                        <Grid item xs={7} sm={8} lg={8}>
                          <Typography
                            variant="body1"
                            className={classes.bodytitle}
                          >
                            {item.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            )
        )}
      {data.length === 0 && Object.keys(values.search).length === 0 && open ? (
        <Grid
          item
          xs={12}
          sm={10}
          md={10}
          lg={10}
          style={{ marginTop: 3, zIndex: 999 }}
        >
          <Alert
            severity="error"
            onClose={() => setOpen(false)}
            className={classes.alert}
          >
            User not found
          </Alert>
        </Grid>
      ) : Object.keys(values.search).length === 0 && open ? (
        <Grid
          item
          xs={12}
          sm={10}
          md={10}
          lg={10}
          style={{ marginTop: 3, zIndex: 999 }}
        >
          <Alert
            severity="error"
            onClose={() => setOpen(false)}
            className={classes.alert}
          >
            User not found
          </Alert>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
}
