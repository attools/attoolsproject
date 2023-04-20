import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import SkeletonPage from '../components/skeleton-state';
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import AppToast from '../components/app-toast';
import _ from "lodash";
import { useLocation } from "react-router-dom";
import emptystate from "../assets/emptystate.svg";
import Senior from "./senior";

export default function AnniversaryList() {
  const location = useLocation();
  const [enableemptysenior, setEmptysenior] = useState(true);
  const [seniorName, setSeniorname] = useState(null);
  const [showAlert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const SeniorAnniversaryList = !_.isNil(localStorage.getItem("SeniorAnniversaryList")) ? localStorage.getItem("SeniorAnniversaryList") : [];

  useEffect(() => {
    setTimeout(() => {
      setEmptysenior(false);
    }, 1500);

  }, [location.state?.data])

  // useEffect(() => {
  //   setSeniorList(getanniversarylist);  console.log('Hii Tiu', SeniorAnniversaryList);
  // },[])

  const deleteSenior = (index, empname) => {
    setSeniorname(empname);
    setAlert(true);
    var deletePost = [];
    JSON.parse(SeniorAnniversaryList).map((ele, idx) => {
      if (idx !== index) {
        deletePost.push(ele);
      }
      return deletePost;
    });
    localStorage.removeItem("SeniorAnniversaryList");
    localStorage.setItem("SeniorAnniversaryList", JSON.stringify(deletePost));
    // setSeniorList(localStorage.getItem("SeniorAnniversaryList"));
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  return (
    <div className="">
      {showAlert &&
        <AppToast showAleart={showAlert} icon="mgc_check_circle_fill" message={`${seniorName} post deleted successfully`} />}
      {enableemptysenior ? <SkeletonPage /> : SeniorAnniversaryList.length === 0 || SeniorAnniversaryList === "[]" ? (
        <div className="empty-state">
          <div className="custom-center">
            <img src={emptystate} width="270" alt="emptystate" />
          </div>
          <p className="text-700 m-t-24 text-center font-state-size">No anniversary posts found</p>
        </div>
      ) : (
        <div className="">
          <Row>
            <Col>
              <p className="p-recents">Recents</p>
            </Col>
          </Row>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              {SeniorAnniversaryList.length > 0 && JSON.parse(SeniorAnniversaryList).map((ele, idx) => (
                <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                  <Senior anniversaryitemssenior={ele} itemIndex={idx} key={idx} deleteSenior={deleteSenior}></Senior>
                </Grid>
              ))}
            </Grid>

          </Box>

        </div>
      )}
    </div>
  );
}