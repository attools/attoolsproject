import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import cardlogo from '../assets/tenant-logo.png';
import * as htmlToImage from 'html-to-image';
import Spinner from '../components/spinner';

const Senior = (props) => {
    const { createdt, type, seniordetails, empname, wishes, years, position } = props.anniversaryitemssenior;
    const itemIndex = props.itemIndex
    const [showLoader, setLoader] = useState(false);
    const [showDelete, setDelete] = useState(false);
    const [showInfo, setViewInfo] = useState(false);

    function nth(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return  "st";
        }
        if (j == 2 && k != 12) {
            return  "nd";
        }
        if (j == 3 && k != 13) {
            return "rd";
        }
        return  "th";
    }

    const [lg, setLg] = useState();

    const downloadAnniversary = () => {
        setLoader(true);
        htmlToImage
            .toJpeg(document.getElementById(createdt), { quality: 1, height: 1080, width: 1080, backgroundColor: 'white' })
            .then(function (dataUrl) {
                var link = document.createElement("a");
                link.download = `${type}.png`;
                link.href = dataUrl;
                link.click();
                setLoader(false);
            })
    }
    const deletePost = () => {
        props.deleteSenior(itemIndex)
        setDelete(false);
    }
    return (
        <div>
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
                                    <Col md={5} lg={6}>
                                        <div className='empprofile'>
                                            <img
                                                src='./img/empprofile.png'
                                                alt="empprofile"
                                                height='250'
                                                width="180"
                                            />
                                        </div>
                                    </Col>
                                    <Col md={7} lg={6}>
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
                                </Row>
                            </Card.Body>
                            <Card.Footer className="custom-width job-card-footer">
                                <Row>
                                    <Col className="p-a-0">
                                        <span
                                            className="mgc_delete_2_line custom-footer-icon float-left custom-cursor-pointer"
                                            onClick={() => deletePost(true)}
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

            <div className='download-imgs' id={createdt}>
                <div>
                    <Col className='p-a-0' >
                        <div>
                            <div className='senior-card-download'>
                                <div>
                                    <Row>
                                        <div className='anniversary-greeting-download d-flex'>
                                            <Col>
                                                <div className='greeting-container-download'>
                                                    <div>Happy</div>
                                                    <div className='scratchPng-container-download'>
                                                        <span className='anniversaryYear-download'>{years}{nth(years)} Year</span>
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
                                                    src='./img/empprofile.png'
                                                    alt="empprofile"
                                                />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className='anniversary-empname-download'>Velayutham J</div>
                                            <div className='anniversary-role-download'>Solution Architect</div>
                                            <div className='anniversary-quote-download'>
                                                Congratulations Velayutham on your one-year work anniversary with Aaludra! We are proud to have you as a Solution Architect on our team, and we appreciate the significant contributions you have made to our organization. We wish you continued success in your career and look forward to celebrating many more milestones with you in the years to come.
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
                        </div>
                    </Col>
                </div>

            </div>
        </div>
    )
}

export default Senior;