import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from "../AxiosConfig/axiosConfig";


function Login(props) {
  const validationSchema = yup.object({
    email: yup
      .string("Enter your Email")
      .email("Enter a valid Email")
      .required("Email is required"),
    password: yup
      .string("Enter your Password")
      .min(8, "Password should be of minimum 8")
      .max(20, "should not exceed 20 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      loginData(value);
    },
  });

  const loginData = async (value) => {
    try {
      console.log(value);
      const loginRes = await axiosInstance.post("/login", value);
      console.log(loginRes,"========================")

      if (loginRes.data.error === true) {
        toast.error(loginRes.data.message);
      } else {
        toast.success(loginRes.data.message);
        localStorage.setItem("token", JSON.stringify(loginRes.data.data.token));
        localStorage.setItem("role", JSON.stringify(loginRes.data.data.role));
        props.history.push("/userrecords");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={1} sm={3} md={4} lg={4.5}></Grid>
        <Grid item xs={10} sm={6} md={4} lg={3} sx={{ mt: "15vh" }}>
          <Box
            sx={{
              boxShadow: 10,
              "& .MuiTextField-root": { m: "2vh" },
            }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Card variant="contained" sx={2}>
                <CardContent>
                  <h1>SIGN IN</h1>
                  <Typography gutterBottom sx={1}>
                    <TextField
                      title="email"
                      type="email"
                      label="Email"
                      size="medium"
                      sx={{ width: "90%" }}
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Typography>
                  <Typography xs={1} color="text.secondary">
                    <TextField
                      title="password"
                      label="Password"
                      id="password"
                      size="medium"
                      sx={{ width: "90%" }}
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                  </Typography>
                  <Button
                    title="loginbtn"
                    sx={{
                      width: "90%", mt: "3vh", background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)', color: "white"
                    }}
                    color="success"
                    type="submit"
                  >
                    LogIn
                  </Button>
                  <br/>
                </CardContent>
              </Card>
            </form>
          </Box>
        </Grid>
        <Grid item xs={1} sm={3} md={4} lg={4}></Grid>
      </Grid>
      

    </>
  );
}

export default Login;
