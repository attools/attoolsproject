import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import _ from "lodash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFetchCollection } from "../components/getfirebasedata";
import loginbgimg from "../assets/loginbg.png";
import logo from "../assets/menu-logo.svg";
import AppToast from '../components/app-toast';
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginSuccessed,setLoginsuccess] =  useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { fbdbdata: Logindata } = useFetchCollection("loginDetails");
  const [showloginValidation,setvalidation] = useState(false);
  useEffect(() => {}, []);
  function onSubmit(data) {
    if (!_.isNil(data) && !_.isNil(Logindata)) {
      setvalidation(
        data.email !== Logindata[0].emailid ||
          data.password !== Logindata[0].password
          ? true
          : false
      );
    } else {
      setvalidation(false);
    }
    if (!_.isNil(data) && !_.isNil(Logindata)) {
      setLoginsuccess(
        data.email === Logindata[0].emailid &&
          data.password === Logindata[0].password
          ? true
          : false
      );
    } else {
      setLoginsuccess(false);
    }
    setTimeout(() => {
      setvalidation(false);
    }, 3000);
    if(loginSuccessed)navigate('/home');
  }
  return (
    <React.Fragment>
      <Box
        sx={{ width: "100%", height: "100%" }}
        className="login-header-container"
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
          <Grid item xs={7} className="p-t-0 login-container">
            <Container className="p-a-24">
              <Row>
                <Col className="p-a-12">
                  <img
                    src={logo}
                    alt="login-header-img"
                    width={120}
                    height={54}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="p-a-12">
                  <p className="welcome-back-text">Welcome back</p>
                </Col>
              </Row>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <Row>
                  <Col className="p-a-12">
                    <div className="">
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="">
                      <input
                        className="form-control"
                        type="email"
                        {...register("email", {
                          required: true,
                        })}
                        id="email"
                        placeholder="Email"
                      />
                      {errors.email && (
                        <span className="error-span">Email id is Required</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-a-12">
                    <div className="">
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="">
                      <input
                        className="form-control"
                        type="password"
                        id="password"
                        placeholder="password"
                        {...register("password", {
                          required: true,
                        })}
                      />
                      {errors.password && (
                        <span className="error-span">Password is Required</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-a-12">
                    <input
                      value={"Sign in"}
                      type="submit"
                      className="create-btn"
                    />
                  </Col>
                </Row>
              </form>

              <Row>
                <Col className="p-a-12">
                  <p className="login-terms">
                    By signing in you agree to the and{" "}
                    <a href="#" target="_blank" className="login-terms-a">
                      Terms of Service
                    </a>{" "}
                    <br />
                    and{" "}
                    <a href="#" className="login-terms-a" target="_blank">
                      Privacy Policy
                    </a>
                  </p>
                </Col>
              </Row>
            </Container>
          </Grid>
          <Grid item xs={5} className="p-t-0">
            <div className="">
              <img
                className="login-bg-img"
                src={loginbgimg}
                width={"100%"}
                height={"100vh"}
                alt="loginbg"
              />
            </div>
          </Grid>
        </Grid>
      </Box>
      {showloginValidation&&
      (
        <AppToast
          showAleart={showloginValidation}
          icon="mgc_close_circle_fill"
          message={`Email or Password is wrong !`}
        />
      )}
    </React.Fragment>
  );
}
