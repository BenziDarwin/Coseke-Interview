import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Cookies from "universal-cookie";

function Login() {
  const [message, setMessage] = useState({ message: null, severity: null });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const handleClick = () => {
    setOpen(true);
  };

  const validationSchema = object({
    user_name: string().nonempty("Field is required!"),
    password: string().nonempty("Field is required!"),
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmitHandler = async (e) => {
    setLoading(true);
    await fetch("http://192.168.18.5:9091/mwe/auth/login", {
      method: "POST",
      mode: "cors",
      body: e,
    })
      .then(async (res) => {
        if (res.error == false) {
          setMessage({ message: res.message, severity: "success" });
          handleClick();
          cookie.set("token", res.token);
          await new Promise((res) => setTimeout(res, 2000));
          navigate("/mails");
        } else {
          setMessage({ message: res.message, severity: "error" });
          handleClick();
          setLoading(false);
        }
      })
      .catch((err) => {
        setMessage({ message: err.message, severity: "error" });
        handleClick();
        setLoading(false);
      });
    setLoading(false);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} sx={{ marginTop: "20px" }}>
        <Card>
          <Grid container sx={{ minHeight: "100vh" }}>
            <Grid item xs={12} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit(onSubmitHandler)}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="user_name"
                    label="Username"
                    name="user_name"
                    autoComplete="user_name"
                    error={
                      errors["user_name"] !== null ? errors["user_name"] : null
                    }
                    helperText={
                      errors["user_name"] ? errors["user_name"].message : ""
                    }
                    {...register("user_name")}
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={
                      errors["password"] !== null ? errors["password"] : null
                    }
                    helperText={
                      errors["password"] ? errors["password"].message : ""
                    }
                    {...register("password")}
                    autoComplete="current-password"
                  />
                  <Button
                    disabled={loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {loading ? "Loading..." : "Sign In"}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={message.severity}
          sx={{ width: "100%" }}
        >
          {message.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Login;
