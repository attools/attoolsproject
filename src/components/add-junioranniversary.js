import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm, useFieldArray } from "react-hook-form";
import Container from "react-bootstrap/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

export default function JuniorAnniversaryPost(props) {
  const schema = yup.object().shape({
    quote: yup.string().required("Please enter Quote"),
    juniordetails: yup.array().of(
      yup.object().shape({
        empimage: yup.string().required("Please select employee image"),
        empimgurl: yup.string().required("Please select employee image"),
        empname: yup.string().required("Please enter employee name"),
        empdesignation: yup.string().required("Please enter employee designation"),
      })
    )
  })
  const { showModal, title } = props;
  const [showAddnew, setAddnew] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      juniordetails: [
        {
          empimage: null,
          empname: null,
          empdesignation: null,
          empimgurl: null

        },
      ],
    },
    resolver: yupResolver(schema)
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "juniordetails",
  });
  const closeAddDialog = () => {
    props.closejuniorDialog(false);
  };
  const onSubmit = async (data) => {
    data['createdt'] = new Date();
    data['type'] = "Junior";

    const existingData = JSON.parse(localStorage.getItem("JuniorAnniversaryList")) || [];

    existingData.unshift(data);
    localStorage.setItem("JuniorAnniversaryList", JSON.stringify(existingData));
    navigate('/anniversarylist', { replace: true, state: { title: "Work anniversary", data: localStorage.getItem('JuniorAnniversaryList') } })
    props.closeJuniorModal(false);
  };

  const handleImageChange = (e, index) => {
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
        const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8); // Change the compression quality as needed

        // Update the form values with the compressed data URL
        setValue(`juniordetails.${index}.empimgurl`, compressedDataUrl);
        if(index === fields.length - 1 && showAddnew){
          append({
            empimage:null,
            empname:null,
            empdesignation:null
          });
          const values = getValues();
          setAddnew(values.juniordetails.length === 6 ? false :true);
        }
      };
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const addItem = () => {
    append({
      empimage: null,
      empname: null,
      empdesignation: null,

    },);
    const values = getValues();
    setAddnew(values.juniordetails.length === 6 ? false : true);

  }
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
                    <span className="p-r-0 junior-title">{title}</span>
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
                  id="junioradd"
                >
                  <Row>
                    <Col className="p-a-12">
                      <div className="">
                        <label htmlFor="quote">Quote</label>
                      </div>
                      <div className="">
                        <input
                          className="form-control"
                          type="text"
                          {...register("quote", {
                            required: true,
                          })}
                          id="quote"
                          placeholder="Quote"
                        />
                        {errors.quote && (
                          <span className="error-span">{errors.quote.message}</span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="p-a-12">
                      <div className="">
                        <label htmlFor="quote">Employees</label>
                      </div>
                      <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableBody>
                            {fields.map((ele, index) => {
                              return (
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell align="left" className="form-td">
                                    {
                                      <input
                                        type="file"
                                        {...register(
                                          `juniordetails.${index}.empimage`
                                        )}
                                        accept="image/png, image/jpeg"
                                        className="form-control form-input-file"
                                        onChange={(e) => handleImageChange(e, index)}
                                      ></input>
                                    }
                                    {!_.isNil(fields[index].empimgurl) ? (
                                      <img
                                        src={fields[index].empimgurl}

                                        height="30"
                                        alt={`Employee ${index}`}
                                      />
                                    ) : (
                                      <span className={errors?.juniordetails?.[index]
                                        ?.empimgurl?.message ? 'mgc_pic_line_error' : 'mgc_pic_line'}>
                                      </span>
                                    )}
                                  </TableCell>
                                  <TableCell align="left">
                                    <input
                                      {...register(
                                        `juniordetails.${index}.empname`
                                      )}
                                      className="form-control"
                                    ></input>
                                    {errors?.juniordetails?.[index]
                                      ?.empname && (
                                        <span className="error-span">
                                          {
                                            errors?.juniordetails?.[index]
                                              ?.empname.message
                                          }
                                        </span>
                                      )}
                                  </TableCell>

                                  <TableCell align="left">
                                    <input
                                      {...register(
                                        `juniordetails.${index}.empdesignation`
                                      )}
                                      className="form-control"
                                    ></input>
                                    {errors?.juniordetails?.[index]
                                      ?.empdesignation && (
                                        <span className="error-span">
                                          {
                                            errors?.juniordetails?.[index]
                                              ?.empdesignation.message
                                          }
                                        </span>
                                      )}
                                  </TableCell>

                                  <TableCell align="center">
                                    <span
                                      className="mgc_close_line"
                                      onClick={() => {
                                        remove(index);
                                        const values = getValues();
                                        setAddnew(
                                          values.juniordetails.length === 6
                                            ? false
                                            : true
                                        );
                                      }}
                                    ></span>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Col>
                  </Row>
                </form>
              </Container>
              {showAddnew && (
                <div className="">
                  <p className="add-new-btn" onClick={addItem}>
                    <span className="mgc_add_circle_line"></span>
                    <span>Add new</span>
                  </p>
                </div>
              )}
            </DialogContent>
            <DialogActions className="p-t-0">
              <Row>
                <Col className="p-a-12 p-t-0">
                  <input
                    value={"Create"}
                    type="submit"
                    className="create-btn"
                    form="junioradd"
                  />
                </Col>
              </Row>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </React.Fragment>
  );
}
