import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import cardlogo from '../assets/tenant-logo.png';
import * as htmlToImage from 'html-to-image';
import Spinner from '../components/spinner';
import Modal from 'react-bootstrap/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import * as moment from 'moment';
import AppToast from './app-toast';

const Senior = (props) => {
    const { createdt, type, seniordetails, empname, wishes, years, position, senior } = props.anniversaryitemssenior;
    const itemIndex = props.itemIndex
    const [showLoader, setLoader] = useState(false);
    const [showDelete, setDelete] = useState(false);
    const [showInfo, setViewInfo] = useState(false);
    const [showAlert,setAlert] = useState(false);

    function nth(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return "st";
        }
        if (j == 2 && k != 12) {
            return "nd";
        }
        if (j == 3 && k != 13) {
            return "rd";
        }
        return "th";
    }

    const [lg, setLg] = useState();

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
        props.deleteSenior(itemIndex, empname)
        setDelete(false);
    }
    return (
        <div>
            {showAlert && (
                <AppToast
                    showAleart={showAlert}
                    icon="mgc_check_circle_fill"
                    message={`${empname} Job post Downloaded Successfully`}
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
                        <Card className='senior-card'>
                            <Card.Header>
                                <Row>
                                    <div className='anniversary-greeting d-flex'>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <div className='greeting-container'>
                                                <div>Happy</div>
                                                <div className='scratchPng-container'>
                                                    <span className='anniversaryYear'><span className='anniversaryYearCount'>{years}<span className='anni_span'>{nth(years)}</span></span> year</span>
                                                </div>
                                                <div>Work Anniversary</div>
                                            </div>
                                        </Col>
                                    </div>
                                </Row>
                            </Card.Header>
                            <Card.Body className='p-a-0'>
                                <Row>
                                    <Col xs={5} sm={5} md={5} lg={6}>
                                        <div className='empprofile'>
                                            <img
                                                src={senior?.empimgurl}
                                                alt="empprofile"
                                                height='250'
                                                width="180"
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={5} sm={5} md={7} lg={6}>
                                        <div className='anniversary-empname'>{empname}</div>
                                        <div className='anniversary-role'>{position}</div>
                                        <div className='anniversary-quote'>
                                            {wishes}
                                        </div>
                                        <img
                                            src={cardlogo}
                                            alt="card-logo"
                                            width="120"
                                            className='anniversary-logo'
                                        />
                                    </Col>

                                    <div className='background-footer'></div>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="custom-width-senior job-card-footer">
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
                <div>
                    <div className='download-imgs' id={createdt}>
                        <div>
                            <Col className='p-a-0' >
                                <div >
                                    <div className='senior-card-download'>
                                        <div className='mxwidth'>
                                            <div>
                                                <Row>
                                                    <div className='anniversary-greeting-download d-flex'>
                                                        <Col>
                                                            <div className='greeting-container-download'>
                                                                <div>Happy</div>
                                                                <div className='scratchPng-container-download'>
                                                                    <span className='anniversaryYear-download'><span className='anniversaryYearCount-download'>{years}<span className='anni_span-download'>{nth(years)}</span></span> year</span>
                                                                </div>
                                                                <div>Work Anniversary</div>
                                                            </div>
                                                        </Col>
                                                    </div>
                                                </Row>
                                            </div>
                                            <div className='p-a-0 '>
                                                <Row>
                                                    <Col>
                                                        <div className='empprofile-download'>
                                                            <img
                                                                src={senior?.empimgurl}
                                                                alt="empprofile"
                                                                height='800px'
                                                                width='500px'
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <div className='anniversary-empname-download'>{empname}</div>
                                                        <div className='anniversary-role-download'>{position}</div>
                                                        <div className='anniversary-quote-download'>
                                                            {wishes}
                                                        </div>
                                                        <img
                                                            src={cardlogo}
                                                            alt="card-logo"
                                                            width="120"
                                                            className='anniversary-logo-download'
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className='background-footer-download'></div>
                                    </div>
                                </div>
                            </Col>
                        </div>
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
                                <p className="text-600 m-b-6">Employee Name</p>
                                <p className='custom-text-color'>
                                    <span>{empname}</span>
                                </p>
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

export default Senior;