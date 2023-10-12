import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

export default function SignUp() {
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [jobType, setJobType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [jobTypeError, setJobTypeError] = useState(false);

  const navigate = useNavigate();

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
    setJobTypeError(false);
  };

  const handlePhoneChange = (event) => {
    // Remove any non-numeric characters
    const phoneNumber = event.target.value.replace(/[^0-9]/g, "");
    // Format the phone number
    if (phoneNumber.length >= 3) {
      if (phoneNumber.length <= 10)
        setPhone(phoneNumber.replace(/(\d{3})(\d{0,7})/, "$1-$2"));
      setPhoneError(false);
    } else {
      setPhone(phoneNumber);
    }
  };

  const handleMobileChange = (event) => {
    // Remove any non-numeric characters
    const mobileNumber = event.target.value.replace(/[^0-9]/g, "");

    // Format the mobile number as "0952306267"
    if (mobileNumber.length >= 10) {
      setMobile(mobileNumber.slice(0, 10));
      setMobileError(false);
    } else {
      setMobile(mobileNumber);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validate and submit the form data here
    if (!firstName) {
      setFirstNameError(true);
    }
    if (!lastName) {
      setLastNameError(true);
    }
    if (!email) {
      setEmailError(true);
    }
    if (!password) {
      setPasswordError(true);
    }
    if (!phone) {
      setPhoneError(true);
    }
    if (!mobile) {
      setMobileError(true);
    }
    if (!address) {
      setAddressError(true);
    }
    if (!jobType) {
      setJobTypeError(true);
    }

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      phone &&
      mobile &&
      address &&
      jobType
    ) {
      // Form is valid, you can proceed with submission
      const userData = {
        firstName,
        lastName,
        email,
        phone,
        mobile,
        address,
        jobType,
      };

      // Save user data to local storage
      localStorage.setItem("userData", JSON.stringify(userData));

      // Redirect to the profile page
      navigate("/profile"); // You should define a route for the profile page in your application
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={firstNameError}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFirstNameError(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={lastNameError}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setLastNameError(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  error={emailError}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={passwordError}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  helperText={phoneError ? "Phone is required" : ""}
                  placeholder="e.g., 011-2630456"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mobile"
                  variant="outlined"
                  fullWidth
                  value={mobile}
                  onChange={handleMobileChange}
                  error={mobileError}
                  helperText={mobileError ? "Mobile is required" : ""}
                  placeholder="e.g., 0952306267"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4} // You can adjust the number of rows as needed
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressError(false);
                  }}
                  error={addressError}
                  helperText={addressError ? "Address is required" : ""}
                  placeholder="Enter your address here"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="job-type-label">Job Type</InputLabel>
                  <Select
                    labelId="job-type-label"
                    id="job-type-select"
                    value={jobType}
                    onChange={handleJobTypeChange}
                    label="Job Type"
                    error={jobTypeError}
                  >
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Hybrid">Hybrid</MenuItem>
                    <MenuItem value="In Office">In Office</MenuItem>
                  </Select>
                  {jobTypeError && (
                    <div style={{ color: "red" }}>Job Type is required</div>
                  )}
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
