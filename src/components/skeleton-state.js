import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import _ from "lodash";
export default function SkeletonPage(props) {
  const {jobList} = useSelector((state) => state.joblist);
  const skeletonEmptyArr = [1,2,3,4]
  const emptyStateArr =  !_.isNil(jobList) && jobList.length !==0 ? JSON.parse(jobList) : skeletonEmptyArr;
  const skeletonState = !_.isNil(emptyStateArr) && emptyStateArr.length !==0 ? emptyStateArr : skeletonEmptyArr;
  return (
    <div className="">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          {skeletonState.map((ele,idx)=> <Grid key={idx} item xs={12} sm={12} md={4} lg={3}>
          <Skeleton variant="rectangular"  height={230} />
          <Box>
            <Skeleton />
            <Skeleton width="60%" />
          </Box>
          </Grid>)}
        </Grid>
      </Box>
    
    </div>
  );
}
