import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Alert from "react-bootstrap/Alert";

export default function AppToast(props) {
  const { message, icon, showAleart } = props;
  return (
    <div className="">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={showAleart}
          autoHideDuration={2000}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            <p className="m-a-0">
              <span className={`${icon}`}></span> {message}
            </p>
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
