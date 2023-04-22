import _ from "lodash";
import React, { useState, useEffect } from "react";
import emptystate from "../assets/emptystate.svg";
import Row from "react-bootstrap/Row";
import JobItems from '../components/job-item';
import Col from "react-bootstrap/Col";
import SkeletonPage from '../components/skeleton-state';
import { useLocation } from 'react-router-dom';
import AppToast from '../components/app-toast';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import {updateJobPost} from '../slices/jobslice';
// import { useSelector } from "react-redux";
export default function Joblistpage() {
  const location = useLocation();
  const [jobListArr, setJoblist] = useState([]);
  const [showAlert, setAlert] = useState(false);
  const [roleName, setRolename] = useState(null);
  const [enableempty, setEmpty] = useState(true);
  // const {jobList} = useSelector((state) => state.joblist);
  
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setEmpty(false);
    }, 1500);
    const getJoblist = !_.isNil(localStorage.getItem("JOBPOSTLISTS"))
      ? localStorage.getItem("JOBPOSTLISTS")
      : [];
     
    setJoblist(getJoblist);
  },[location.state?.data]);
  dispatch(updateJobPost(localStorage.getItem("JOBPOSTLISTS")));

  const deleteItem = (index, rolename) => {
    setRolename(rolename);
    setAlert(true);
    var deletePost = [];
    JSON.parse(jobListArr).map((ele, idx) => {
      if (idx !== index) {
        deletePost.push(ele);
      }
      return deletePost;
    });
    localStorage.removeItem("JOBPOSTLISTS");
    localStorage.setItem("JOBPOSTLISTS", JSON.stringify(deletePost));
    setJoblist(localStorage.getItem("JOBPOSTLISTS"));
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };
  
  const refreshPage=()=>{
    setEmpty(true);
    const getJoblist = !_.isNil(localStorage.getItem("JOBPOSTLISTS")) ? localStorage.getItem("JOBPOSTLISTS") : [];
    setJoblist(getJoblist);
    setTimeout(() => {
      setEmpty(false);
    }, 1500);
  }
  return (
    <div className="">
    {showAlert&&  
     <AppToast showAleart={showAlert} icon="mgc_check_circle_fill" message={`${roleName} Job post deleted successfully`} />}
      {enableempty ? <SkeletonPage/> : jobListArr.length === 0 || jobListArr === "[]"? (
        <div className="empty-state">
        <div className="custom-center">
          <img src={emptystate} width="270" alt="emptystate" />
        </div>
        <p className="text-700 m-t-24 text-center font-state-size">No job posts found</p>
        </div>
      ) : (
        <div className="">
          <Row>
            <Col>
            <p className="p-recents">Recents</p>
            </Col>
            <Col>
            <p className="float-right"><span className="mgc_refresh_2_line p-r-0 p-r-24 " onClick={refreshPage}></span></p>
            </Col>
          </Row>
          <Box sx={{ flexGrow: 1 }}>
          <Grid container>
          {JSON.parse(jobListArr).map((ele, idx) => (
               <Grid item xs={12} key={idx} sm={12} md={4} lg={3}>
              <JobItems jobitems={ele} itemIndex={idx} key={idx} deleteItem={deleteItem}></JobItems>
               </Grid>
            ))}
          </Grid>
          </Box>
        </div>
      )}
      {}
    </div>
  );
}
