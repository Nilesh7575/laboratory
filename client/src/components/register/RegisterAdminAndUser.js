import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import OutlinedInput from '@mui/material/OutlinedInput';
import axiosInstance from "../AxiosConfig/axiosConfig";
import { toast } from "react-toastify";

function RegisterAdminAndUser(props) {
  const [role, setRole] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const validationSchema = yup.object({
    name: yup
      .string("Enter your Name")
      .required("Name is required")
      .min(3, "Name should be of minimum 3")
      .max(30, "Should not exceed 30 characters"),

    email: yup
      .string("Enter your Email")
      .email("Enter a valid Email")
      .required("Email is required"),
    password: yup
      .string("Enter your Password")
      .min(8, "Password should be of minimum 8")
      .max(20, "Should not exceed 20 characters")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: (value) => {
      const registeredData = { ...value, role }
      register(registeredData);
    },
  });

    const register = async (registeredData) => {
        try {
            var registerRes = await axiosInstance.post('/register', registeredData) 
            console.log(registerRes);
            if (registerRes.data.error === true) {
              toast.error(registerRes.data.message)
          }else {
              toast.success(registerRes.data.message)
              props.history.push('/userrecords')
          }
        } catch (error) {
            console.log(registerRes);
        }
    }

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
                  <h1>Register</h1>
                  <Typography gutterBottom sx={1}>
                    <TextField
                      title="name"
                      type="text"
                      label="Name"
                      size="medium"
                      sx={{ width: "90%" }}
                      id="name"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Typography>
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
                  <Typography gutterBottom sx={1} required>
                    <Grid container xs={11} sm={12} lg={12}>
                      <FormControl
                        sx={{ m: 2, height: '8vh', width: '20.5vw' }}

                      >
                        <InputLabel id="demo-multiple-name-label">
                          Role
                        </InputLabel>
                        <Select
                          labelId="demo-controlled-open-select-label"
                          id="demo-controlled-open-select"
                          open={open}
                          onClose={handleClose}
                          onOpen={handleOpen}
                          onChange={handleChange}
                          input={<OutlinedInput label="role" />}
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="user">User</MenuItem>
                        </Select>
                      </FormControl>

                    </Grid>

                  </Typography>
                  <Button
                    title="loginbtn"
                    sx={{
                      width: "90%",
                      mt: "3vh",
                      background:
                        "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                      color: "white",
                    }}
                    color="success"
                    type="submit"
                  >
                    Register
                  </Button>
                  <br />
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

export default RegisterAdminAndUser;
