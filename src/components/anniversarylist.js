import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { Row } from "react-bootstrap";
import SkeletonPage from '../components/skeleton-state';
import Junior from "./Junior";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import AppToast from '../components/app-toast';
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { updateAnniversaryPost } from "../slices/anniversarySlice";
import emptystate from "../assets/emptystate.svg";

export default function AnniversaryList() {
  const location = useLocation();
  const [JuniorAnniversaryList, setJuniorList] = useState([]);
  const [enableempty, setEmpty] = useState(true);
  const [juniorName, setJuniorname] = useState(null);
  const [showAlert, setAlert] = useState(false);
  const dispatch = useDispatch();
  console.log("new", juniorName);
  useEffect(() => {
    setTimeout(() => {
      setEmpty(false);
    }, 1500);
    const getanniversarylist = !_.isNil(localStorage.getItem("JuniorAnniversaryList")) ? localStorage.getItem("JuniorAnniversaryList") : [];
    setJuniorList(getanniversarylist);


  console.log('Hii Tiu',JuniorAnniversaryList);
  }, [location.state?.data])
  dispatch(updateAnniversaryPost(localStorage.getItem("JuniorAnniversaryList")));

  const deletetem = (index, juniordetails) => {
    setJuniorname(juniordetails);
    setAlert(true);
    var deletePost = [];
    JSON.parse(JuniorAnniversaryList).map((ele, idx) => {
      if (idx !== index) {
        deletePost.push(ele);
      }
      return deletePost;
    });
    localStorage.removeItem("JuniorAnniversaryList");
    localStorage.setItem("JuniorAnniversaryList", JSON.stringify(deletePost));
    setJuniorList(localStorage.getItem("JuniorAnniversaryList"));
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };
  
  console.log(JuniorAnniversaryList);

  return (
    <div className="">
      {showAlert &&
        <AppToast showAleart={showAlert} icon="mgc_check_circle_fill" message={`${juniorName} post deleted successfully`} />}
      {enableempty ? <SkeletonPage /> : JuniorAnniversaryList.length === 0 || JuniorAnniversaryList === "[]" ? (
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
              {JSON.parse(JuniorAnniversaryList).map((ele, idx) => (
                <Grid item xs={12} key={idx} sm={12} md={4} lg={3}>
                  <Junior anniversaryitems={ele} itemIndex={idx} key={idx} deleteItem={deletetem}></Junior>
                </Grid>
              ))}
            </Grid>

          </Box>
        </div>)}
    </div>
  );
}