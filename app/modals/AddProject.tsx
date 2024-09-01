import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface AddProjectProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddProject({
  setShowModal,
  showModal,
}: AddProjectProps) {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-xl">New Project</h2>
          <div className="mt-4">
            <form action="" className="flex gap-4 flex-col min-w-96">
              <TextField
                id="outlined-basic"
                label="Project Name"
                variant="outlined"
                size="small"
              ></TextField>
              <TextField
                id="outlined-basic"
                label="Project Address"
                variant="outlined"
                size="small"
                m
              ></TextField>
              <TextField
                id="outlined-basic"
                label="Owner's Name"
                variant="outlined"
                size="small"
              ></TextField>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
