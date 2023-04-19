import React, { useState } from "react";
import _ from "lodash";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import cardlogo from '../assets/tenant-logo.png';
import Modal from 'react-bootstrap/Modal';
import * as htmlToImage from 'html-to-image';
import { Container } from "react-bootstrap";
import * as moment from 'moment';
import Spinner from '../components/spinner';
import AppToast from '../components/app-toast';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function JobItems(props) {
  const [showInfo,setViewInfo] = useState(false);
  const [showAlert,setAlert] =useState(false);
  const [showLoader, setLoader] = useState(false);
  const [showDelete , setDelete] =useState(false);

  const { rolename, description, experience, keyskills,email ,createdt} =
    props.jobitems;
  const itemIndex = props.itemIndex;
    const downloadItem =()=>{
      setLoader(true);
      htmlToImage
        .toJpeg(document.getElementById(`${rolename}`), { quality: 1,height:1080,width:1080 ,backgroundColor:'white'})
        .then(function (dataUrl) {
          var link = document.createElement("a");
          link.download = `${rolename}.png`;
          link.href = dataUrl;
          link.click();
          setLoader(false);
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        });
    }
    const deletePost=()=>{
      props.deleteItem(itemIndex,rolename);
      setDelete(false)
    }
  return (
    <div className="">
      {showDelete && (
        <Dialog
          open={showDelete}
          keepMounted
          onClose={() => setDelete(false)}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Delete?"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              className="delete-p"
              id="alert-dialog-slide-description"
            >
              Are you sure want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ padding: "0px 24px 24px" }}>
            <Button className="delete-button" onClick={deletePost}>
              Yes, Delete
            </Button>
            <Button
              className="delete-keep-btn delete-button"
              onClick={() => setDelete(false)}
            >
              No, Keep it
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showAlert && (
        <AppToast
          showAleart={showAlert}
          icon="mgc_check_circle_fill"
          message={`${rolename} Job post Downloaded Successfully`}
        />
      )}
      <div className="">
        <Col className="p-a-0">
          <div className="hover-card">
            <Card className="custom-card job-card">
              <Card.Header className="job-card-header">
                <Row>
                  <img
                    src={cardlogo}
                    alt="card-logo"
                    width="140"
                    style={{ marginLeft: "6px" }}
                  />
                </Row>
              </Card.Header>
              <Card.Body className="p-a-0 job-card-body">
                <Row>
                  <p className="hiring-p">We are Hiring</p>
                </Row>
                <Row>
                  <div className="custom-display-inline">
                    <div className="custom-dot m-a-11"></div>
                    <span className="card-text-job">
                      Role: <span className="text-600">{rolename}</span>{" "}
                      {!_.isNil(description) ? <span>({description})</span> :""}
                      
                    </span>
                  </div>
                </Row>
                <Row>
                  <div className="custom-display-inline">
                    <div className="custom-dot m-a-11"></div>
                    <span className="card-text-job">
                      Experience: <span className="text-600">{experience}</span>
                    </span>
                  </div>
                </Row>
                <Row>
                  <div className="custom-display-inline">
                    <div className="custom-dot m-a-11"></div>
                    <span className="card-text-job">
                      Location: <span className="text-600">Coimbatore</span>
                    </span>
                  </div>
                </Row>
                <Row>
                  <div className="custom-display-inline">
                    <div className="custom-dot m-a-11"></div>
                    <span className="card-text-job">Key skills:</span>
                  </div>
                </Row>
                <Row>
                  <Col className="p-a-0 key-max-content">
                  <p className="card-text-job text-600 tech-text">
                      {keyskills}
                    </p>
                  </Col>
                </Row>
                <Row></Row>
              </Card.Body>
              <Card.Footer className="custom-width job-card-footer">
                <Row>
                  <Col className="p-a-0">
                    <span
                      className="mgc_delete_2_line custom-footer-icon float-left custom-cursor-pointer"
                      onClick={() => setDelete(true)}
                      style={{ marginLeft: "20px" }}
                    ></span>
                  </Col>
                  <Col style={{marginRight:"6px"}}>
                    {showLoader ? (
                      <span className="custom-footer-icon float-right m-l-20">
                        <Spinner />
                      </span>
                    ) : (
                      <span
                        className="mgc_download_2_line custom-footer-icon float-right custom-cursor-pointer m-l-20"
                        onClick={downloadItem}
                      ></span>
                    )}

                    <span
                      className="mgc_information_line custom-footer-icon float-right custom-cursor-pointer "
                      onClick={() => setViewInfo(true)}
                    ></span>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </div>
      <div className="custom-display-none">
        <div className="download-img-senior" id={rolename}>
          <Container className="download-contained">
            <Row>
              <img src={cardlogo} alt="card-logo" width="250" />
            </Row>
            <Row>
              <p className="dwn-hiring-p" style={{ marginBottom: "0" }}>
                We are Hiring
              </p>
            </Row>
            <div style={{ paddingTop: "41px", paddingLeft: "6px" }}>
              <Row className="p-b-20 down-row">
                <div className="custom-display-inline">
                  <div className="custom-dot download-dot m-l-0 m-a-11"></div>
                  <span className="dwn-text-lines">
                    Role: <span className="text-700">{rolename}</span>{" "}
                    {!_.isNil(description) ? <span>({description})</span> :""}
                  </span>
                </div>
              </Row>
              <Row className="p-b-20 down-row">
                <div className="custom-display-inline">
                  <div className="custom-dot download-dot m-l-0 m-a-11"></div>
                  <span className="dwn-text-lines">
                    Experience: <span className="text-700">{experience}</span>
                  </span>
                </div>
              </Row>
              <Row className="p-b-20 down-row">
                <div className="custom-display-inline">
                  <div className="custom-dot download-dot m-l-0 m-a-11"></div>
                  <span className="dwn-text-lines">
                    Location: <span className="text-700">Coimbatore</span>
                  </span>
                </div>
              </Row>
              <Row className="down-row" style={{ paddinBottom: "10px" }}>
                <div className="custom-display-inline">
                  <div className="custom-dot download-dot m-l-0 m-a-11"></div>
                  <span className="dwn-text-lines">Key skills:</span>
                </div>
              </Row>
              <Row className="key-skills-row">
                <div className="">
                  <p
                    className="dwn-text-lines text-700 tech-text custom-line-height"
                    style={{ marginLeft: "30px", paddingRight: "100px" }}
                  >
                    {keyskills}
                  </p>
                </div>
              </Row>
            </div>
            <div className="dwn-footer-content">
              <Row className="custom-center down-footer-content">
                <Col className="p-a-0">
                  <p className="custom-white-space">
                    <i
                      className="mgc_mail_send_fill"
                      style={{ paddingLeft: "8px" }}
                    ></i>
                    <span className="dwn-text-lines p-l-24">
                      Send your CV to <span className="text-700">{email}</span>
                    </span>
                  </p>
                </Col>
                <Col>
                  <p className="dwn-text-lines custom-text-color text-align-center custom-white-space">
                    aaludra.com
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
      {showInfo && (
        <Modal
          size="sm"
          show={showInfo}
          centered="true"
          dialogClassName="modal-90w sm-modal-box"
          onHide={() => setViewInfo(false)}
        >
          <Modal.Header className="sm-header-title">Info</Modal.Header>
          <Modal.Body className="p-a-24">
            <Row>
              <Col>
                <p className="text-600 m-b-6">Role</p>
                <p className="custom-text-color">{rolename}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="text-600 m-b-6">Created</p>
                <p className="custom-text-color">
                  {moment(`${createdt}`).format("LLL")}
                </p>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
