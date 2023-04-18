import React, { useEffect, useState } from "react";
import Carditems from "./card-items";
import SkeletonPage from '../components/skeleton-state';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import _ from "lodash";
// import AddYearPost from '../components/add-year-post';

export default function Home() {
  const [enableempty , setEmpty] = useState(true);
  const [jobListArr , setJoblist] = useState([]);
  // const {fbdbdata : Logindata } = useFetchCollection("loginDetails");
  useEffect(() => {
    const getJoblist = !_.isNil(localStorage.getItem("JOBPOSTLISTS"))
      ? localStorage.getItem("JOBPOSTLISTS")
      : [];
    setJoblist(getJoblist);
    setTimeout(() => {
      setEmpty(false);
    }, 1500);
  },[]);
  const eventList = [
    {
      icon: "mgc_IDcard_fill",
      title: "Job post banner",
      description:
        "This is a tool for HR team to create social media job posts banners",
      enabled: true,
      path: "/joblist",
      data: jobListArr,
      isicon:true,
    },
    {
      icon: "mgc_celebrate_fill",
      title: "Work anniversary",
      description: "This is a tool for HR team to create work anniversary posters",
      enabled: true,
      isicon:false,
      path:'/anniversarylist',
      img:"./../assets/celebrate_fill.svg"
    },
    {
      icon: "",
      title: "",
      description: "",
      enabled: false,
      isicon:true,

    },
    {
      icon: "",
      title: "",
      description: "",
      enabled: false,
      isicon:true,
    },
  ];
  return (
    <div className="content-view">
      {enableempty ? (
        <SkeletonPage />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            {eventList.map((ele, idx) => (
              <Grid item xs={12} key={idx} sm={12} md={4} lg={3}>
                <Carditems carditem={ele} key={idx}></Carditems>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {/* <AddYearPost/> */}
    </div>
  );
}
