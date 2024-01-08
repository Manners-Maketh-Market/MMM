import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { AlertTitle, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MMMAlert = ({
  variant,
  size,
  color,
  severity,
  MessageTitle,
  AlertMessage,
  open,
  setOpen,
  type,
}) => {
  return (
    <Stack
      sx={
        type === "oneProduct"
          ? {
              width: "100%",
            }
          : { width: "30%" }
      }
      spacing={2}
    >
      <Collapse in={open}>
        <Alert
          action={
            <IconButton>
              <CloseIcon onClick={() => setOpen(false)} />
            </IconButton>
          }
          variant={variant}
          size={size}
          color={color}
          severity={severity}
        >
          <AlertTitle>{MessageTitle}</AlertTitle>
          {AlertMessage}
        </Alert>
      </Collapse>
    </Stack>
  );
};

export default MMMAlert;
