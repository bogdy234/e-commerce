import { Dispatch, FC, ReactElement, SetStateAction } from "react";

import { Box, Modal, Typography } from "@mui/material";

interface EditDataProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const EditData: FC<EditDataProps> = ({ open, setOpen }): ReactElement => {
    const handleClose = () => setOpen(false);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                </Typography>
            </Box>
        </Modal>
    );
};

export default EditData;
