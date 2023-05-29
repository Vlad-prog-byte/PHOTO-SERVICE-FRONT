import './WatchPhotos.css';
import {useEffect, useState} from "react";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import {
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid, Link,
    Menu,
    MenuItem,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import ReactDOM from 'react-dom';
import {serviceActions} from "../../Storage/serviceSlice";



const WatchPhotos = () => {
    const dispatch = useDispatch();
    const [contextMenu, setContextMenu] = useState(null);



    const [idPhoto, setIdPhoto] = useState(null);
    const store = useSelector(state => state.service);


    //Переименовать фотографию
    const [open, setOpen] = useState(false);
    const [renamePhoto, setRenamePhoto] = useState("");



    //Просмотр фотографии
    const [openImage, setOpenImage] = useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState(null);

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : null,
        );
        setIdPhoto(event.currentTarget.id);
    };
    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
    }
    let id_folder = (usePathname().split('/')[2]);

    const getPhotos = async () => {
        let folder = store.folders.filter(value => value.id == id_folder)[0];
        const requestOptions = {
            method: "GET",
            headers: {"accept": "application/json"},
        };
        const response = await fetch("/operations/photoes?"  + new URLSearchParams( {
            uuid_album: folder.uuid
        }), requestOptions);
        const photos = await response.json();
        console.log("fedya ne prav", photos);
        dispatch(serviceActions.getPhotos({photos: photos, id: id_folder}));
    }

    useEffect(() => {
        getPhotos()
    }, []);


    const removePhoto = async (uuid_photo) => {
        const requestOptions = {
            method: "POST",
            headers: {"accept": "application/json"},
        };
        const response = await fetch("/operations/remove_photo?"  + new URLSearchParams( {
            uuid_photo: uuid_photo
        }), requestOptions);
        const photos = await response.json();
        dispatch(serviceActions.deletePhotos({id_folder : id_folder, uuid: uuid_photo}));
    }

    const handleRemove = (event) => {
        let folder = store.folders.filter(value => value.id == id_folder)[0];
        let photo = folder.photos.filter(photo => photo.id == idPhoto)[0];
        removePhoto(photo.uuid);
        setContextMenu(null);
        setIdPhoto(null);
    }

    const handleRename = (event) => {
        setContextMenu(null);
        setOpen(true);
    };

    const handleCloseRename = () => {
        setOpen(false);
        setContextMenu(null);
        //Делаем запрос
    }

    const handleClose = () => {
        setContextMenu(null);
    };


    // const handleRenamePhoto = (event) => {
    //     if (renamePhoto == "")
    //         return;
    //     setOpen(false);
    //     dispatch({type: RENAME_PHOTO, payload: {id_folder: id_folder, name: renamePhoto, id_photo: idPhoto}});
    // };

    const handleChange = (event) => {
        setRenamePhoto(event.target.value);
    }

    const handleClick = (event) => {
        const folder = store.folders.filter(folder => folder.id == id_folder)[0];
        const photo = folder.photos.filter(photo => photo.id == event.currentTarget.id)[0];
        setName(photo.name);
        setImage(photo.url);
        setOpenImage(true);
        // const reader = new FileReader();
        // reader.readAsDataURL(photo.file);
        // reader.onload = (event) => {
        //     setImage(event.target.result);
        //     setOpenImage(true);
        // }
    }


    function renderPhotos(store, id_folder) {
        let folder = store.folders.filter(value => value.id == id_folder)[0];
        if (folder.length == 0 || folder.photos.length == 0) {
            return null;
        }

        return folder.photos.map(photo => {
                    return(
                    <Grid item>
                        <Box p={4}>
                            <div className="cardFolder">
                                <InsertPhotoIcon
                                    id={photo.id}
                                    onClick={handleClick}
                                    onContextMenu={handleContextMenu}
                                    sx={{height: "130px", width: "130px", color: "blue", "&:hover": { color: "#9099f0" } }}
                                ></InsertPhotoIcon>
                                <Typography gutterBottom variant="h5" component="div">
                                    {photo.name}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>)
        })
    }

    const handleCloseImage = () => {
        // setOpen(false);
        setOpenImage(false);
        setImage(null);
        setName(null);
    }


    return (
        <div className="Photos">
            <Typography variant="h3" sx={{pl: "20px", pt: "20px"}}>
                {store.folders.filter(value => value.id == id_folder)[0].name}
            </Typography>
            <Grid container
                  columnSpacing={1}
                  rowSpacing={3}
                  alignItems="flex-start"
                  sx={{ml: "0", mt: "0", height: "ini"}}
            >

                {renderPhotos(store, id_folder)}
                <Menu
                    open={contextMenu !== null}
                    onClose={handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={
                        contextMenu !== null
                            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                            : undefined
                    }
                >
                    <MenuItem sx={{fontSize: "20px"}} onClick={handleRemove}>Удалить</MenuItem>
                    {/*<MenuItem sx={{fontSize: "20px"}} onClick={handleRename}>Переименовать</MenuItem>*/}
                </Menu>
            </Grid>

            {/*<div className="RenamePhoto">*/}
            {/*    <Dialog open={open} onClose={handleCloseRename}>*/}
            {/*        <DialogTitle sx={{textAlign: 'center'}}>Переименовать фотографию</DialogTitle>*/}
            {/*        <DialogContent>*/}
            {/*            <InsertPhotoIcon sx={{height: "130px", width: "130px", color: "blue", mx: "auto"}}></InsertPhotoIcon>*/}
            {/*            <TextField*/}
            {/*                className="createfolder"*/}
            {/*                autoFocus*/}
            {/*                margin="dense"*/}
            {/*                id="name"*/}
            {/*                label="Переименовать фотогфию"*/}
            {/*                type="text"*/}
            {/*                fullWidth*/}
            {/*                variant="standard"*/}
            {/*                onChange={handleChange}*/}
            {/*            />*/}
            {/*        </DialogContent>*/}
            {/*        <DialogActions>*/}
            {/*            <Button onClick={handleCloseRename}>Отменить</Button>*/}
            {/*            <Button onClick={handleRenamePhoto}>Переименовать фотографию</Button>*/}
            {/*        </DialogActions>*/}
            {/*    </Dialog>*/}
            {/*</div>*/}

                <Dialog
                    fullWidth={ true }
                    maxWidth={"md"}
                    open={openImage}
                    onClose={handleCloseImage}
                    PaperProps={{ sx: { width: "100%", height: "none" } }}
                >
                    <DialogTitle sx={{textAlign: 'center'}}>Просмотр фотографии</DialogTitle>
                    <DialogContent>
                        <div
                            style={{width: "100%", height: "50%"}}
                        >
                            <img src={image} style={{width: "100%", height: "auto"}}/>
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseImage}>Закрыть</Button>
                        <Link download href={image} underline="none" style={{fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                            СКАЧАТЬ
                        </Link>
                    </DialogActions>
                </Dialog>
        </div>)

}

export default WatchPhotos;
