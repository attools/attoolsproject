import React,{useState,useEffect} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";


export default function AddYearPost() {
const employeeCountList =[2,3,4,5,6];
const [selectedImage, setSelectedImage] = useState(null)
const [imageUrl, setImageUrl] = useState(null);
  const {
    register,
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      yearpostArr: [
        {
          name: "",
          designation: "",
          greetings: "",
          empimage:"",
          empimageurl:""
        },
      ],
    },
  });
  const { fields, append } = useFieldArray({
    control,
    name: "yearpostArr",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  return (
    <div className="">
          <InputLabel id="demo-simple-select-autowidth-label">No of Employees</InputLabel>
          <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          autoWidth
          label="No of Employees"
        >
        {employeeCountList.map((ele,index)=> <MenuItem key={index} value={ele}>{ele}</MenuItem>)}
        </Select>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <button onClick={() => append()}>addd</button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell align="left">Empoyee Name</TableCell>
                <TableCell align="left">Employee Designation</TableCell>
                <TableCell align="left">Greetings</TableCell>
                <TableCell align="left">Employee Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fields.map((ele, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">
                      <input
                        {...register(`yearpostArr.${index}.name`)} 
                        className="form-control"
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        {...register(`yearpostArr.${index}.designation`)}
                        className="form-control"
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      <input
                        {...register(`yearpostArr.${index}.greetings`)}
                        className="form-control"
                      ></input>
                    </TableCell>
                    <TableCell align="left">
                      { <input type="file" 
                        {...register(`yearpostArr.${index}.empimage`)} className="form-control"
                      ></input>}
              
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <input type={"submit"}></input>
      </form>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={(e) => setSelectedImage(e.target.files[0])}
      />
      <label htmlFor="select-image">
        <Button variant="contained" color="primary" component="span">
          Upload Image
        </Button>
      </label>
      {imageUrl && selectedImage && (
        <Box mt={2} textAlign="center">
          <div>Image Preview:</div>
          <img src={imageUrl} alt={selectedImage.name} height="100px" />
        </Box>
      )}
    </div>
  );
}
