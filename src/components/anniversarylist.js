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
import Switch from '@mui/material/Switch';
import Senior from "./senior";
import * as moment from 'moment';

export default function AnniversaryList() {
  const location = useLocation();
  const [JuniorAnniversaryList, setJuniorList] = useState([]);
  const [enableempty, setEmpty] = useState(true);
  const [seniorName, setSeniorname] = useState(null);
  const [showAlert, setAlert] = useState(false);
  const [at, SetAt] = useState(null);
  const [isJunior, SetIsJunior] = useState(true)
  const dispatch = useDispatch();
  const[deleteAlert,setDeleteAlert] = useState(false)
  const SeniorAnniversaryList = !_.isNil(localStorage.getItem("SeniorAnniversaryList")) ? localStorage.getItem("SeniorAnniversaryList") : [];

  useEffect(() => {
    setTimeout(() => {
      setEmpty(false);
    }, 1500);
    const getanniversarylist = !_.isNil(localStorage.getItem("JuniorAnniversaryList")) ? localStorage.getItem("JuniorAnniversaryList") : [];
    setJuniorList(getanniversarylist);


  }, [location.state?.data])
  dispatch(updateAnniversaryPost(localStorage.getItem("JuniorAnniversaryList")));

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

  const deleteJunior = (index, createdt) => {
    SetAt(createdt);
    var deletePos = [];
    JSON.parse(JuniorAnniversaryList).map((ele, idx) => {
      if (idx !== index) {
        deletePos.push(ele);
      }
      return deletePos
    });
    localStorage.removeItem("JuniorAnniversaryList");
    localStorage.setItem("JuniorAnniversaryList", JSON.stringify(deletePos));
    setJuniorList(localStorage.getItem("JuniorAnniversaryList"));
    setDeleteAlert(true);
    setTimeout(() => {
        setDeleteAlert(false);
    }, 3000)
  };


  return (
    <div className="">
      {showAlert &&
        <AppToast showAleart={showAlert} icon="mgc_check_circle_fill" message={`${seniorName} post deleted successfully`} />}
      {deleteAlert &&
        (<AppToast showAleart={deleteAlert} icon="mgc_check_circle_fill" message={`${moment(`${at}`).format("LLL")} post deleted successfully`} />)}
      {enableempty ? <SkeletonPage /> : (JuniorAnniversaryList.length === 0 || JuniorAnniversaryList === "[]") && (SeniorAnniversaryList.length === 0 || SeniorAnniversaryList === "[]") ? (
        <div className="empty-state">
          <div className="custom-center">
            <img src={emptystate} width="270" alt="emptystate" />
          </div>
          <p className="text-700 m-t-24 text-center font-state-size">No anniversary posts found</p>
        </div>
      ) : (
        <div className="">
          <Row>
            <Col lg={9}>
              <p className="p-recents">Recents</p>
            </Col>
            <Col lg={2} className="text-right">
              <Switch checked={isJunior} onChange={() => SetIsJunior(!isJunior)} />
            </Col>
            {isJunior ? (<Col lg={1}>
              <p className="p-recents">Junior</p>
            </Col>) : (<Col lg={1}>
              <p className="p-recents">Senior</p>
            </Col>)}

          </Row>
          <Box sx={{ flexGrow: 1 }}>

            {isJunior ? (<Grid container>
              {JuniorAnniversaryList.length === 0 || JuniorAnniversaryList === "[]" ? (
                <div className="empty-state container">
                  <div className="custom-center">
                    <img src={emptystate} width="270" alt="emptystate" />
                  </div>
                  <p className="text-700 m-t-24 text-center font-state-size">No Junior anniversary posts found</p>
                </div>) : JSON.parse(JuniorAnniversaryList).map((ele, idx) => (
                  <Grid item xs={12} key={idx} sm={12} md={4} lg={3}>
                    <Junior anniversaryitems={ele} itemIndex={idx} key={idx} deleteJunior={deleteJunior}></Junior>
                  </Grid>
                ))}
            </Grid>) :
              <Grid container>
                {SeniorAnniversaryList.length === 0 || SeniorAnniversaryList === "[]" ? (<div className="empty-state container">
                  <div className="custom-center">
                    <img src={emptystate} width="270" alt="emptystate" />
                  </div>
                  <p className="text-700 m-t-24 text-center font-state-size">No Senior anniversary posts found</p>
                </div>) : SeniorAnniversaryList.length > 0 && JSON.parse(SeniorAnniversaryList).map((ele, idx) => (
                  <Grid item key={idx} xs={12} sm={6} md={4} lg={3}>
                    <Senior anniversaryitemssenior={ele} itemIndex={idx} key={idx} deleteSenior={deleteSenior}></Senior>
                  </Grid>
                ))}
              </Grid>}
          </Box>
        </div>)}

    </div>
  );
}