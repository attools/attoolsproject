import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Card from "react-bootstrap/Card";
import cardlogo from '../assets/tenant-logo.png';
import * as htmlToImage from 'html-to-image';

const Junior = (props) => {
    const { juniorName, juniordetails, quote } = props.anniversaryitems;
    const { itemIndex } = props.itemIndex
    const [showLoader, setLoader] = useState(false);
    const [showDelete, setDelete] = useState(false);
    const [lg, setLg] = useState();
    const downloadAnniversary = () => {
        setLoader(true);
        htmlToImage
            .toJpeg(document.getElementById(`${juniorName})`), { quality: 1, height: 1080, width: 1080, backgroundColor: 'white' })
            .then(function (dataUrl) {
                var link = document.createElement("a");
                link.download = `${juniorName}.png`;
                link.href = dataUrl;
                link.click();
                setLoader(false);
            })
    }
    const deletePost = () => {
        props.deleteItem(itemIndex, juniorName);
        setDelete(false);
    }
    return (
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
                                <Col lg={12} xs={12} md={12}  className='anniversary-quote'><p>{quote}</p></Col>
                            </Row>
                            <Row >
                                {juniordetails.map((detail, idx) => (
                                    <Col xs={juniordetails.length === (1) ? "12" : "6" && juniordetails.length === 3 ? "4" : "6" && juniordetails.length === 6 ? "4" : "6"}
                                        md={juniordetails.length === (1) ? "12" : "6" && juniordetails.length === 3 ? "4" : "6" && juniordetails.length === 6 ? "4" : "6" && juniordetails.length === 5 ? "4" : "6"}
                                        lg={juniordetails.length === (1)  ? "12" : "6" && juniordetails.length === 3 ? "4" : "6" && juniordetails.length === 6 ? "4" : "6" && juniordetails.length === 5 ? "4" : "6"}
                                        key={idx}  className={"pt-4"}>
                                        <img
                                            width="59px"
                                            height="59px"
                                            src={detail.empimgurl}
                                        />
                                        <div className='anniversary-name'>{detail.empname}</div>
                                        <div className='anniversary-role'>{detail.empdesignation}</div>
                                    </Col>
                                ))}
                            </Row>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </div>
    )
}

export default Junior