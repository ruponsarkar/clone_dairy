import React, { useState, useRef, useEffect } from 'react'
import { Paper, Button } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import PublicIcon from '@mui/icons-material/Public';
import Modal from '../../ui-component/modal';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from '../../API/api';
import BasicMenu from '../../ui-component/menu';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios'
import Test from './test';


const user = JSON.parse(sessionStorage.getItem("user"))

const Documents = () => {

    const location = useLocation();
    const navigation = useNavigate();
    console.log("Location : ", location.hash.substring(100, 1));


    const [param, setParam] = useState(0);
    const fileInput = useRef(null);
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setOpen(true)
    }

    const [folderName, setFolderName] = useState();

    useEffect(() => {
        setParam(location.hash.substring(100, 1))
        getFillDocuments(location.hash.substring(100, 1));
    }, [location.hash, param])

    const getFillDocuments = (ref_id) => {
        setLoading(true)
        api.getFillDocuments(ref_id).then((res) => {
            console.log("res files :", res.data.data.map((e) => ({ ...e, permissions: JSON.parse(e.permissions), })));
            setData(res.data.data.map((e) => ({ ...e, permissions: JSON.parse(e.permissions), })))
            setLoading(false)
        })
            .catch((err) => {
                setLoading(false)
                console.log("err ", err);
            })
    }


    const handleCreateFolder = () => {
        let reqData = {
            type: 'folder',
            name: folderName,
            ref_id: param,
            createdBy: JSON.parse(sessionStorage.getItem("user")).id,
            permissions: permissions
        }

        api.createFolder(reqData).then((res) => {
            console.log("==>>", res);
            getFillDocuments(param)
            setOpen(false)

        });
    }

    const handleFileChange = async (e) => {
        // console.log(e.target.files[0]);

        let file = e.target.files[0];
        let originalName = e.target.files[0].name;
        let fileName = Date.now() + "_" + originalName;
        let fileType = file.name.split(".")[1];


        console.log("name :", fileName);
        console.log("originalName :", originalName);
        console.log("fileType :", fileType);

        const Data = new FormData();
        Data.append('name', originalName)
        Data.append('type', 'file')
        Data.append('ref_id', param)
        Data.append('fileName', fileName)
        Data.append('originalName', originalName)
        Data.append('fileType', fileType)
        Data.append('createdBy', JSON.parse(sessionStorage.getItem("user")).id)
        Data.append('permissions', JSON.stringify(permissions))

        Data.append('file', file)

        api.uploadDocuments(Data).then((res) => {
            console.log("==>>", res);
            getFillDocuments(param);
            setOpen(false)

        });


        // const response = await axios.post('http://127.0.0.1:8800/uploadDocuments', Data, {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //     },
        //     onUploadProgress: (progressEvent) => {
        //         const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //         // setUploadProgress(percentage);
        //         console.log("percentage: ", percentage);
        //     },
        // })

        // console.log("Response here : ", response);

        // .then((response) => {
        //     // setUploadStatus("Upload successful!");
        //     console.log(response.data);
        // })
        // .catch((error) => {
        //     // setUploadStatus("Upload failed. Please try again.");
        //     console.error("Error uploading file:", error);
        // });

    }

    const updateFileDocument = (data) => {
        console.log("data id : ", data);
        api.updateDocuments(data[0]).then((res) => {
            console.log("res ", res);
        })
            .catch((err) => {
                console.log("err ", err);
            })

    }



    const openFile = () => {
        fileInput.current.click();
    };

    const handleFolderNavigation = (id) => {
        getFillDocuments(id);
        setParam(id);
        navigation("#" + id);
    }



    const createFoler = () => {
        return (
            <div>
                <div className='p-3'>
                    <input type="text"
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder='Folder name'
                        autoFocus
                        className='form-control'
                        name="" id="" />
                </div>
            </div>
        )
    }

    const handleViewFile = (file) => {
        console.log("file", file);
        // let api = 'http://localhost:8800/'
        let api = 'https://milksubsidydairyassam.com:8800/'
        window.open(api + file, '_blank');
    }


    const [permissions, setPermissions] = useState({
        onlyme: false,
        dlc: true,
        slsc: true,
        finance: true
    })

    const handleCheck = (type, id) => {
        console.log(type, id);

        let selectRow;

        if (type === "onlyme") {
            selectRow = data.map((e) =>
                e.id === id
                    ? {
                        ...e,
                        permissions: {
                            ...e.permissions,
                            [type]: !e.permissions[type],
                            dlc: false,
                            slsc: false,
                            finance: false
                        },
                    }
                    : e
            );
        }
        else {
            selectRow = data.map((e) =>
                e.id === id
                    ? {
                        ...e,
                        permissions: {
                            ...e.permissions,
                            [type]: !e.permissions[type],
                            onlyme: false,
                        },
                    }
                    : e
            );
        }


        setData(selectRow)
        console.log("selectRow ", selectRow);

        updateFileDocument(selectRow.filter((e) => e.id === id))


        return;


        // setPermissions(editPermission);
        // console.log("permissionss ==>> : ", editPermission);
        console.log("permissions ==>> : ", permissions);

    }

    const updatePermisions = (data) => {
        console.log("data : ", data);
    }



    const menuItems = (data) => {
        let permissions = data.permissions;
        // console.log("permissions ======>>", permissions);
        return (
            <div>
                <div className="text-secondary">
                    <small>Permissions</small>
                </div>
                <div className='d-flex gap-3'>
                    <div>
                        <small>Only me:<Checkbox disabled={user.id !== data.createdBy} checked={permissions.onlyme} onClick={(e) => handleCheck('onlyme', data.id)} /></small>
                    </div>
                    <div>
                        <small>DLC:<Checkbox disabled={user.id !== data.createdBy} checked={permissions.dlc} onClick={(e) => handleCheck('dlc', data.id)} /></small>
                    </div>
                    <div>
                        <small>SLSC:<Checkbox disabled={user.id !== data.createdBy} checked={permissions.slsc} onClick={(e) => handleCheck('slsc', data.id)} /></small>
                    </div>
                    <div>
                        <small>FINANCE:<Checkbox disabled={user.id !== data.createdBy} checked={permissions.finance} onClick={(e) => handleCheck('finance', data.id)} /></small>
                    </div>
                </div>
            </div>
        )
    }




    return (
        <div>




            <Modal open={open} maxWidth='xs' modaldata={createFoler()} handleClose={() => setOpen(false)} onSubmit={handleCreateFolder} disabledBtn={loading} />

            <div className='py-1'>
                <Paper>
                    <div className='d-flex align-items-center'>

                        <div className="p-3">
                            Documents
                        </div>

                        <div>
                            <Button variant='outlined' size='small' onClick={() => openModal()}>Create Folder</Button> &nbsp;
                            <Button variant='outlined' size='small' onClick={() => openFile()}>+Add File</Button>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(e)}
                                ref={fileInput}
                                style={{ display: "none" }}
                            />
                        </div>
                    </div>
                </Paper>
            </div>
            <div className='py-1 '>
                <Paper>
                    <div className='documents'>



                        <div className='text-secondary'>

                            <div className="p-2 ">
                                <div style={{ padding: '10px' }} className='pb-0 d-flex justify-content-between'>
                                    <div className='col-md-10 d-flex justify-content-between'>
                                        <div className='col-md-8'>
                                            Name
                                        </div>
                                        <div className='col-md-2 text-right'>
                                            Added by
                                        </div>
                                        <div className='col-md-2 text-right'>
                                            Created date
                                        </div>

                                    </div>
                                    <div>
                                        Permissions
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className='m-0 p-0 text-secondary' />

                        <div>
                            {/* {user.role.toLowerCase()} */}
                            <div className='p-2'>

                                {data && data.filter((item) => item.permissions[user.role.toLowerCase()] === true || item.createdBy === user.id).map((file) => (
                                    <>
                                        {file.type === 'folder' &&
                                            <div className='folder d-flex justify-content-between' >
                                                <div className='col-md-10 d-flex justify-content-between align-items-center' role='button' onClick={() => handleFolderNavigation(file.id)}>
                                                    <div className='col-md-6'>
                                                        <FolderIcon /> {file.name}
                                                    </div>
                                                    <div className='col-md-2 text-secondary'>
                                                        <small>
                                                            {/* DCS */}
                                                        </small>
                                                    </div>
                                                    <div className='col-md-2 text-secondary'>
                                                        <small>
                                                            {/* 10 Aug, 24 */}
                                                        </small>
                                                    </div>

                                                </div>

                                                <div className='permissions' role='button'
                                                // onClick={() => console.log("kk")}
                                                >
                                                    <small>
                                                        {/* <PublicIcon /> */}
                                                        <BasicMenu menuItems={menuItems} />
                                                    </small>
                                                </div>
                                            </div>
                                        }

                                        {file.type === 'file' &&
                                            <div className='file d-flex justify-content-between' >
                                                <div className='col-md-10 d-flex justify-content-between align-items-center' role='button' onClick={() => handleViewFile(file.fileName)}>
                                                    <div className='col-md-8'>
                                                        <DescriptionIcon />{file.originalName}
                                                    </div>
                                                    <div className='text-secondary col-md-2 text-right'>
                                                        <small>
                                                            {file.role}
                                                        </small>
                                                    </div>
                                                    <div className='text-secondary col-md-2 text-right'>
                                                        <small>
                                                            {/* {file.created_at} */}

                                                            {new Date(file.created_at).getDate()
                                                                + ", " +
                                                                new Date(file.created_at).toLocaleString("default", { month: "long", })
                                                                + "-" +
                                                                new Date(file.created_at).getFullYear()}
                                                        </small>
                                                    </div>
                                                </div>

                                                <div className='permissions' role='button' onClick={() => console.log("kk")}>
                                                    <small>
                                                        {/* <PublicIcon /> */}


                                                        <BasicMenu disabled menuItems={menuItems(file)} />

                                                    </small>
                                                </div>
                                            </div>
                                        }


                                    </>


                                ))}


                                <div>
                                    {data && !data.filter((item) => item.permissions[user.role.toLowerCase()] === true || item.createdBy === user.id).length && (
                                    <div className="text-center p-5">
                                        <img
                                            src="/assets/noData.png"
                                            alt="no data"
                                            className="govt-logo"
                                        />
                                        <p>Data not found</p>
                                    </div>
                                    )}
                                </div>



                            </div>
                        </div>

                    </div>
                </Paper>
            </div>



        </div>
    )
}

export default Documents;