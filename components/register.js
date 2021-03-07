import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  IconButton,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import EmailIcon from "@material-ui/icons/Email";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { AuthContext } from "../context/auth";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    display: "flex",
    color: "#bbb",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "cornflowerblue",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    fontWeight: "bold",
    color: "white",
    textTransform: "none",
    height: 37,
    backgroundColor: "cornflowerblue",
  },
  textfield: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ccc",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "pink",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#bbb",
    },
  },
  cssLabel: {
    color: "#fff",
  },
  cssOutlinedInput: {
    color: "#fff",
  },
  cssFocused: {
    color: "#fff",
  },
  notchedOutline: {
    borderWidth: "1px",
  },
  alert: {
    margin: "5px 0",
    border: "1px solid rgba(156, 39, 176, 0.8)",
    borderRadius: 5,
    width: "100%",
    backgroundColor: "rgba(156, 39, 176, 0.2)",
    color: "#ccc",
  },
}));

export default function Register(props) {
  const context = useContext(AuthContext);
  const classes = useStyles();
  const router = useRouter();
  const [errors, setErrors] = useState("");
  const [values, setValues] = useState({
    showPassword: false,
  });

  const [errorType, setErrorType] = useState({
    email: false,
    password: false,
  });

  // show password
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  // --->

  // <-- validation
  function validateName(name) {
    const re = /^[a-z][a-z\s]*$/;
    const res = re.test(name);
    return res;
  }

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const res = re.test(email);
    return res;
  }

  function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const res = re.test(password);
    return res;
  }

  const onChange = (e) => {
    const target = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [target]: value });
    if ([target][0] === "name" && !validateName(value.toLowerCase())) {
      setErrorType({ [target]: true });
    } else if ([target][0] === "email" && !validateEmail(value)) {
      setErrorType({ [target]: true });
    } else if ([target][0] === "password" && !validatePassword(value)) {
      setErrorType({ [target]: true });
    } else {
      setErrorType({ [target]: false });
    }
  };
  // --->

  // <--- submited
  const [loading, setLoading] = React.useState(false);
  const registerUser = async () => {
    setLoading(true);
    const url = `${process.env.server}/api/v1/register`;
    const config = {
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "iki datane");
        if (data.status === 200) {
          setLoading(false);
          context.login(data.data);
          router.push("/dashboard");
        } else if (data.status === 500) {
          setLoading(false);
          setErrors(data.error.message);
        }
      })
      .catch((err) => {
        if (err) {
          setLoading(false);
          console.log(err);
        }
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };
  // --->

  return (
    <>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <div className={classes.root}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon style={{ color: "white" }} />
          </Avatar>
          <Typography component="h1" variant="h5" style={{ color: "white" }}>
            Register
          </Typography>
          {Object.keys(errors).length > 0 && (
            <Alert
              severity="error"
              className={classes.alert}
              onClose={() => setErrors("")}
            >
              {errors}
            </Alert>
          )}
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  autoComplete="name"
                  className={classes.textfield}
                  onChange={onChange}
                  value={values.name}
                  error={errorType["name"] ? true : false}
                  helperText={errorType["name"] && `Name must be letter`}
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
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  id="email"
                  placeholder="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={classes.textfield}
                  error={errorType["email"] ? true : false}
                  helperText={errorType["email"] && `Email is required`}
                  onChange={onChange}
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
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  size="small"
                  name="password"
                  placeholder="Password"
                  type={values.showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  className={classes.textfield}
                  error={errorType["password"] ? true : false}
                  onChange={onChange}
                  helperText={
                    errorType["password"] &&
                    `Minimum 8 characters, one letter, one number and one special character`
                  }
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
                    inputMode: "numeric",
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOpenIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <Visibility style={{ color: "white" }} />
                          ) : (
                            <VisibilityOff style={{ color: "white" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={onSubmit}
            >
              {loading ? (
                <CircularProgress size={20} style={{ color: "white" }} />
              ) : (
                "Register"
              )}
            </Button>
          </form>
          <Box align="center">
            Already have an account?{" "}
            <Button
              style={{ textDecoration: "none", color: "aqua" }}
              onClick={() => router.push("/login")}
            >
              Login here
            </Button>
          </Box>
        </div>
        <br />
      </Container>
    </>
  );
}
