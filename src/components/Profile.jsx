import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Img1 from "../assets/1.jpg";
import Img2 from "../assets/2.jpg";
import Img3 from "../assets/3.jpg";

const images = [Img1, Img2, Img3];
const imageChangeInterval = 1500; // Initial interval (1.5 seconds)

const Profile = () => {
  const navigate = useNavigate();
  const [isFullNameClicked, setIsFullNameClicked] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [interval, setInterval] = useState(imageChangeInterval);
  const [isHovered, setIsHovered] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const tableData = [
    {
      label: "Full Name",
      val: `${userData?.firstName} ${userData?.lastName} `,
    },
    { label: "Email", val: userData?.email },
    { label: "Phone", val: userData?.phone },
    { label: "Mobile", val: userData?.phone },
    { label: "Address", val: userData?.address },
  ];
  const fullNameStyle = {
    fontWeight: isFullNameClicked ? "bold" : "normal",
    color: isFullNameClicked ? "blue" : "inherit",
    cursor: "pointer",
  };

  useEffect(() => {
    if (Object.keys(userData).length <= 0) navigate("/");
  }, []);

  useEffect(() => {
    let intervalId;

    if (!isHovered) {
      intervalId = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        if (currentImageIndex === images.length - 1) {
          if (interval === imageChangeInterval) {
            setInterval(1400); // 1.4 seconds
          } else if (interval === 1400) {
            setInterval(1300); // 1.3 seconds
          }
        }
      }, interval);
    }

    return () => clearInterval(intervalId);
  }, [isHovered, interval, currentImageIndex]);

  return (
    <Container xs={{ pt: 4 }} style={{ marginTop: "4rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ maxWidth: 345, py: 2, minHeight: 274 }} align="center">
            <Avatar
              alt="Profile"
              src={images[currentImageIndex]}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{ width: "100px", height: "100px" }}
            />

            <CardContent>
              <Typography
                style={fullNameStyle}
                gutterBottom
                variant="h5"
                component="div"
                onClick={() => setIsFullNameClicked((prev) => !prev)}
              >
                {`${userData?.firstName} ${userData?.lastName}`}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Full Stack Developer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                By Joseph New York, US
              </Typography>
            </CardContent>
            <CardActions
              style={{
                justifyContent: "center",
              }}
            >
              <Button variant="contained">Follow</Button>
              <Button variant="outlined">Message</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card xs={{ minHeight: 20 }}>
            <TableContainer component={CardContent}>
              <Table>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow
                      key={row.label}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.label}
                      </TableCell>
                      <TableCell colSpan={6}>{row.val}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
