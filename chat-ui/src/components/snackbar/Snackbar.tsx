import { useReactiveVar } from "@apollo/client";
import Alert from "@mui/material/Alert";
import MUISnackbar from "@mui/material/Snackbar";
import * as React from "react";

import { snackVar } from "../../constants/snack";

const Snackbar = () => {
  const snack = useReactiveVar(snackVar);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    snackVar(undefined);
  };

  return (
    <>
      {snack && (
        <MUISnackbar
          open={!!snack}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={snack.type || "info"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snack.message}
          </Alert>
        </MUISnackbar>
      )}
    </>
  );
};

export default Snackbar;
