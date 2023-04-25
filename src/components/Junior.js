import React, { useState } from 'react';
import { Col,Row } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import cardlogo from '../assets/tenant-logo.png';
import * as htmlToImage from 'html-to-image';
import Spinner from '../components/spinner';
import * as moment from 'moment';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppToast from '../components/app-toast';

const Junior = (props) => {
    const { createdt, type, juniordetails, quote } = props.anniversaryitems;
    const itemIndex = props.itemIndex
    const [showLoader, setLoader] = useState(false);
    const [showDelete, setDelete] = useState(false);
    const [showInfo, setViewInfo] = useState(false);
    const [showAlert, setAlert] = useState(false);
    const downloadAnniversary = () => {
        setLoader(true);
        htmlToImage
            .toJpeg(document.getElementById(createdt), { quality: 1, height: 1080, width: 1080, backgroundColor: 'white' })
            .then(function (dataUrl) {
                var link = document.createElement("a");
                link.download = `${moment(`${createdt}`).format("LLL")}.png`;
                link.href = dataUrl;
                link.click();
                setLoader(false);
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000);
            })
    }
    const deletePost = () => {
        props.deleteJunior(itemIndex, createdt)
        setDelete(false);
    }

    return (
        <div>
            {showAlert && (
                <AppToast
                    showAleart={showAlert}
                    icon="mgc_check_circle_fill"
                    message={`${moment(`${createdt}`).format("LLL")} post Downloaded Successfully`}
                />
            )}
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
            <div>
                <Col className='p-a-0'>
                    <div className='hover-card'>
                        <Card className='junior-card'>
                            <Card.Header className=''>
                                <Row>
                                    <img
                                        src={cardlogo}
                                        alt="card-logo"
                                        width="120"
                                        style={{ marginLeft: "6px" }}
                                    />
                                </Row>
                            </Card.Header>
                            <Card.Body className='p-a-0 job-card-body pt-2'>
                                <Row>
                                    <Col lg={12} xs={12} md={12} className='anniversary-quote'><p>{quote}</p></Col>
                                </Row>
                                <Row >
                                    {juniordetails.map((detail, idx) => (
                                        <Col xs={juniordetails.length === (1) ? "12" : "6" && juniordetails.length === 3 ? "4" : "6" && juniordetails.length === 6 ? "4" : "6"}
                                            md={juniordetails.length === (1) ? "12" : "6" && juniordetails.length === 3 ? "4" : "6" && juniordetails.length === 6 ? "4" : "6" && juniordetails.length === 5 ? "4" : "6"}
                                            lg={juniordetails.length === (1) ? "12" : "6" && juniordetails.length === 3 ? "4" : "6" && juniordetails.length === 6 ? "4" : "6" && juniordetails.length === 5 ? "4" : "6"}
                                            key={idx} className={"pt-2"}>
                                            <img
                                                width="59px"
                                                height="59px"
                                                src={detail.empimgurl}
                                                alt='img'
                                            />
                                            <div className='anniversary-name'>{detail.empname}</div>
                                            <div className='anniversary-role'>{detail.empdesignation}</div>
                                        </Col>
                                    ))}
                                </Row>
                            </Card.Body>
                            <Card.Footer className="custom-width anniversary-footer">
                                <Row>
                                    <Col className="p-a-0">
                                        <span
                                            className="mgc_delete_2_line custom-footer-icon float-left custom-cursor-pointer"
                                            onClick={() => setDelete(true)}
                                            style={{ marginLeft: "20px" }}
                                        ></span>
                                    </Col>
                                    <Col style={{ marginRight: "6px" }}>
                                        {showLoader ? (
                                            <span className="custom-footer-icon float-right m-l-20">
                                                <Spinner />
                                            </span>
                                        ) : (
                                            <span
                                                className="mgc_download_2_line custom-footer-icon float-right custom-cursor-pointer m-l-20"
                                                onClick={downloadAnniversary}
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
            <div className='custom-display-none'>
                <div className='download-imgs' id={createdt}>
                    <div className='download-junior'>
                        <Row>
                            <span className='align-head'><img src={cardlogo} width="250" alt={cardlogo}/></span>
                        </Row>
                        <Row>
                            <Col sm="12" lg="12" xs="12" md="12">
                                <p className='quote-text'>{quote}</p>
                            </Col>

                        </Row>

                        <Row className='row-img'>
                            {juniordetails.map((details, idx) => (
                                <Col xs={(juniordetails.length === 1) ? "12" : ((juniordetails.length === 3) ? "4" : ((juniordetails.length === 6) ? "4" : "6"))}
                                    md={(juniordetails.length === 1) ? "12" : ((juniordetails.length === 3) ? "4" : ((juniordetails.length === 6) ? "4" : ((juniordetails.length === 5) ? "4" : "6")))}
                                    lg={(juniordetails.length === 1) ? "12" : ((juniordetails.length === 3) ? "4" : ((juniordetails.length === 6) ? "4" : ((juniordetails.length === 5) ? "4" : "6")))}
                                    key={idx}
                                    className={"pt-4 text-center"}>
                                    <img
                                        width="185px"
                                        height="185px"
                                        src={details.empimgurl}
                                        alt='img'
                                    />
                                    <div className='download-name'>{details.empname}</div>
                                    <div className='download-role'>{details.empdesignation}</div>
                                </Col>))}

                        </Row>
                    </div>
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
                    <Modal.Header className="sm-header-title" closeButton>Info</Modal.Header>
                    <Modal.Body className="p-a-24">
                        <Row>
                            <Col>
                                <p className="text-600 m-b-6">Type</p>
                                <p className="custom-text-color">{type}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-600 m-b-6">Employees(s)</p>
                                <p className='custom-text-color'>{juniordetails.map((detail, idx) => (
                                    <span key={idx}>{detail.empname}
                                        {(idx !== juniordetails.length - 1) && (
                                            <span>, </span>
                                        )}
                                    </span>

                                ))}</p>
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
    )
}

export default Junior
