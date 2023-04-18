import React from "react";
import Container from "react-bootstrap/Container";
import _ from "lodash";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddeditJob(props) {
const { register, handleSubmit, formState: { errors } } = useForm();
const localItem = !_.isNil(localStorage.getItem("JOBPOSTLISTS")) ?  JSON.parse(localStorage.getItem("JOBPOSTLISTS")) : null;
const navigate = useNavigate();
function onSubmit(data) {
  let prevJoblist =  []
  prevJoblist = !_.isNil(localItem) ? localItem : [] ;
  data['createdt']=new Date();
  prevJoblist.unshift(data);
  localStorage.removeItem("JOBPOSTLISTS");
  localStorage.setItem("JOBPOSTLISTS", JSON.stringify(prevJoblist));
  navigate('/joblist',{replace : true,state:{icon :'mgc_IDcard_fill',title:'Job post banner',data:localStorage.getItem('JOBPOSTLISTS')}});
  props.closePanel(false);
}
const closeAddDialog =()=>{
  props.closeDialog(false);
}
  return (
    <div className="">
      {props.isModalshow && (
        <Dialog open={props.isModalshow} onClose={closeAddDialog}>
          <DialogTitle>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container>
              <Grid item xs={11}  sm={11} md={11} lg={11}>{"Create new banner"}</Grid>
              <Grid item xs={1}  sm={1} md={1} lg={1} className="modal-align-items"><span className="mgc_close_line" onClick={closeAddDialog}></span></Grid>
              </Grid>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Container>
              <form
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
                id="jobForm"
              >
                <Row>
                  <Col className="p-a-12">
                    <div className="">
                      <label htmlFor="role">Role Name</label>
                    </div>
                    <div className="">
                      <input
                        className="form-control"
                        type="text"
                        {...register("rolename", {
                          required: true,
                        })}
                        id="role"
                        placeholder="Role"
                      />
                      {errors.rolename && (
                        <span className="error-span">Role is required</span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-a-12">
                    <div className="">
                      <label htmlFor="description">Description</label>
                    </div>
                    <div className="">
                      <input
                        className="form-control"
                        type="text"
                        id="description"
                        placeholder="Description"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-a-12">
                    <div className="">
                      <label htmlFor="experience">Experience</label>
                    </div>
                    <div className="">
                      <input
                        className="form-control"
                        type="text"
                        {...register("experience", {
                          required: true,
                        })}
                        id="experience"
                        placeholder="Experience"
                      />
                      {errors.experience && (
                        <span className="error-span">
                          Experience is required
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col className="p-a-12">
                    <div className="">
                      <label htmlFor="email">Receive CV to</label>
                    </div>
                    <div className="">
                      <input
                        className="form-control"
                        type="email"
                        defaultValue="hr@aaludra.com"
                        {...register("email", {
                          required: true,
                        })}
                        id="email"
                        placeholder="Email address"
                      />
                      {errors.description && (
                        <span className="error-span">
                          Email address is required
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className="p-a-12">
                    <div className="">
                      <label htmlFor="keyskills">Key skills</label>
                    </div>
                    <div className="">
                      <textarea
                        rows="5"
                        cols="50"
                        className="form-control"
                        type="keyskills"
                        {...register("keyskills", {
                          required: true,
                          maxLength: 800,
                        })}
                        id="keyskills"
                        placeholder="Key skills"
                      />
                      {!errors.keyskills && (
                       <span className="keyskill-span">
                       Key skills should be with in 800 Characters.
                     </span>
                      )}
                      {errors.keyskills?.type ==="required" && (
                        <span className="error-span">
                          Key skills is required
                        </span>
                      )}
                       {errors.keyskills?.type === "maxLength" && (
                        <span className="error-span">
                          Key skills should be with in 800 Characters 
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>
              </form>
            </Container>
          </DialogContent>
          <DialogActions className="p-t-0">
            <Row>
              <Col className="p-a-12 p-t-0">
                <input
                  value={"Create new"}
                  type="submit"
                  className="create-btn"
                  form="jobForm"
                />
              </Col>
            </Row>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
