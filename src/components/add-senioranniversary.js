import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import Container from "react-bootstrap/Container";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";



export default function SeniorAnniversaryPost(props) {
    const [dataurl, setdataurl] = useState(false);
    const schema = yup.object().shape({
        empimage: yup.string().required("Please select employee image"),
        empname: yup.string().required("Please enter employee name"),
        position: yup.string().required("Please enter employee position"),
        years: yup.string().required("Please enter employee years"),
        wishes: yup.string().required("Please enter wishes")
    })
    const navigate = useNavigate();
    const { showModal, title } = props;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            seniordetails: [
                {
                    empimage: null,
                    empname: null,
                    position: null,
                    years: null,
                    wishes: null,
                    empimgurl: null

                },
            ],
        },
        resolver: yupResolver(schema)
    });
    const closeAddDialog = () => {
        props.closeseniorDialog(false);
    };
    const onSubmit = async (data) => {

        data['createdt'] = new Date();
        data['type'] = "Senior";

        const existingData = JSON.parse(localStorage.getItem("SeniorAnniversaryList")) || [];

        existingData.unshift(data);
        localStorage.setItem("SeniorAnniversaryList", JSON.stringify(existingData));
        navigate('/anniversarylist', { replace: true, state: { title: "Work anniversary", data: localStorage.getItem('SeniorAnniversaryList') } })
        props.closeSeniorModal(false);
    };

    const handleImageChange = (e) => {
        setdataurl(true);
        const file = e.target.files[0];
        const reader = new FileReader();
        const image = new Image();
        reader.onload = (event) => {
            image.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                const maxWidth = 800; // Maximum width of the compressed image
                const maxHeight = 800; // Maximum height of the compressed image
                let width = image.width;
                let height = image.height;

                // Calculate the new dimensions while maintaining the aspect ratio
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }

                // Set the canvas dimensions to the new dimensions
                canvas.width = width;
                canvas.height = height;

                // Draw the image on the canvas
                ctx.drawImage(image, 0, 0, width, height);

                // Convert the canvas data to a compressed data URL
                const compressedDataUrl = canvas.toDataURL("image/png", 0.8); // Change the compression quality as needed

                // Update the form values with the compressed data URL
                setValue(`senior.empimgurl`, compressedDataUrl);
                document.getElementById('preview-img').src = compressedDataUrl;
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };
    return (
        <React.Fragment>
            <div className="">
                {showModal && (
                    <Dialog
                        open={showModal}
                        maxWidth={"md"}
                        className=""
                        onClose={closeAddDialog}
                    >
                        <DialogTitle>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container>
                                    <Grid item xs={9} sm={9} md={9} lg={9} className="f-s-18">
                                        {"Create new poster"}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={3}
                                        sm={3}
                                        md={3}
                                        lg={3}
                                        className="modal-align-items"
                                    >
                                        <span className="p-r-0 senior-title">{title}</span>
                                        <span
                                            className="mgc_close_line"
                                            onClick={closeAddDialog}
                                        ></span>
                                    </Grid>
                                </Grid>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Container>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    autoComplete="off"
                                    id="senioradd"
                                >
                                    <Row>

                                        <Col className="p-a-12">
                                            <div>
                                                <label>Photo</label>
                                            </div>
                                            <Col className="" style={{ marginTop: '-40px', marginLeft: "18px" }}>
                                                <input
                                                    type="file"
                                                    {...register(
                                                        'empimage', {
                                                        required: true,
                                                    }
                                                    )}
                                                    id='img'
                                                    accept="image/png, image/jpeg"
                                                    className="form-control form-input-file-senior"
                                                    onChange={(e) => handleImageChange(e)}
                                                />
                                                {dataurl ? (
                                                    <img
                                                        id="preview-img"
                                                        src=""
                                                        alt="Preview mage"
                                                        className="preview-img-align"
                                                        height="30" />
                                                ) : (
                                                    <span className="mgc_pic_line"
                                                        htmlFor='quote'>
                                                    </span>
                                                )}
                                                {errors.empimage &&
                                                    <span className="error-span">
                                                        {
                                                            errors.empimage.message
                                                        }
                                                    </span>
                                                }
                                            </Col>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="p-a-12">
                                            <Row sx={{ minWidth: 650 }} aria-label="simple table">

                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="empname">Name</label>
                                                    </div>
                                                    <input
                                                        {...register("empname", {
                                                            required: true,
                                                        })}
                                                        className="form-control"
                                                        placeholder="Name"
                                                    ></input>
                                                    {errors.empname && (
                                                        <span className="error-span">
                                                            {
                                                                errors.empname.message
                                                            }
                                                        </span>
                                                    )}
                                                </Col>
                                                <Col>
                                                    <div className="">
                                                        <label htmlFor="position">Position</label>
                                                    </div>
                                                    <input
                                                        {...register("position", {
                                                            required: true,
                                                        })}
                                                        className="form-control"
                                                        placeholder="Position"
                                                        id="position"
                                                    ></input>
                                                    {errors.position && (
                                                        <span className="error-span">
                                                            {
                                                                errors.position.message
                                                            }
                                                        </span>
                                                    )}
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6} className="p-a-12 pt-0">
                                            <div className="">
                                                <label htmlFor="years">Years of Complition</label>
                                            </div>
                                            <div className="">
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    {...register("years", {
                                                        required: true,
                                                    })}
                                                    id="years"
                                                    placeholder="Years of Complition"
                                                />
                                                {errors.years && (
                                                    <span className="error-span">{errors.years.message}</span>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="p-a-12 pt-0">
                                            <div className="">
                                                <label htmlFor="wishes">Wishes</label>
                                            </div>
                                            <div className="">
                                                <textarea
                                                    rows="5"
                                                    cols="50"
                                                    className="form-control"
                                                    type="text"
                                                    {...register("wishes", {
                                                        required: true,
                                                        maxLength: 800,
                                                    })}
                                                    id="wishes"
                                                    placeholder="wishes"
                                                />
                                                {errors.wishes && (
                                                    <span className="error-span">{errors.wishes.message}</span>
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
                                        value={"Create"}
                                        type="submit"
                                        className="create-btn"
                                        form="senioradd"
                                    />
                                </Col>
                            </Row>
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </React.Fragment >
    );
}