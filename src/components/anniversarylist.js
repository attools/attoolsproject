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

export default function AnniversaryList() {
  const location = useLocation();
  const [JuniorAnniversaryList, setJuniorList] = useState([]);
  const [enableempty, setEmpty] = useState(true);
  const [At,SetAt]=useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setEmpty(false);
    }, 1500);
    const getanniversarylist = !_.isNil(localStorage.getItem("JuniorAnniversaryList")) ? localStorage.getItem("JuniorAnniversaryList") : [];
    setJuniorList(getanniversarylist);


  }, [location.state?.data])
  dispatch(updateAnniversaryPost(localStorage.getItem("JuniorAnniversaryList")));

  const deleteJunior= (index, createdt) => {
    SetAt(createdt);
    var deletePos = [];
    JSON.parse(JuniorAnniversaryList).map((ele,idx)=>{
      if(idx !== index){
        deletePos.push(ele);
      }
      return deletePos
    });
    localStorage.removeItem("JuniorAnniversaryList");
    localStorage.setItem("JuniorAnniversaryList", JSON.stringify(deletePos));
    setJuniorList(localStorage.getItem("JuniorAnniversaryList"));
  };


  return (
    <div className="">
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
            <Col lg={6}>
              <p className="p-recents">Recents</p>
            </Col>
            <Col lg={6} className="text-right">
            <Switch  defaultChecked />
            </Col>
          </Row>
          <Box sx={{ flexGrow: 1 }}>

            <Grid container>
              {JSON.parse(JuniorAnniversaryList).map((ele, idx) => (
                <Grid item xs={12} key={idx} sm={12} md={4} lg={3}>
                  <Junior anniversaryitems={ele} itemIndex={idx} key={idx} deleteJunior={deleteJunior}></Junior>
                </Grid>
              ))}
            </Grid>

          </Box>
        </div>)}
    </div>
  );
}