import React, { useRef, useState } from "react";

import Modal from "../../ui-component/modal";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "@mui/material";

const UploadFile = ({ handleFileChange, daybook }) => {
    const fileInput = useRef(null);

    const [open, setOpen] = useState();

    //   const handleFileChange = (event) => {
    //     console.log("Make something", event.target.files[0]);
    //     let file = event.target.files[0];
    //     const Data = new FormData();
    //     Data.append("file", file);

    //   };

    const openFile = () => {
        fileInput.current.click();
    };

    const content = () => {
        return (
            <>
                <div className="d-flex align-items-center justify-content-center">
                    <input
                        type="file"
                        onChange={(e) => handleFileChange(e)}
                        ref={fileInput}
                        style={{ display: "none" }}
                    />

                    <Button variant="outlined" onClick={() => openFile()}>
                        <AddAPhotoIcon /> &nbsp; Upload Day Book
                    </Button>
                </div>

                <div>
                    {daybook &&
                        <div className="">
                            <img src={`https://milksubsidydairyassam.com:8800/${daybook.file}`} className="col-12" alt="daybook" />
                        </div>
                    }
                </div>



            </>
        );
    };

    return (
        <>
            <div>
                <Button variant="outlined" onClick={() => setOpen(true)}>Day book</Button>
            </div>

            <Modal open={open} handleClose={() => setOpen(false)} modaldata={content()} />
        </>
    );
};

export default UploadFile;
