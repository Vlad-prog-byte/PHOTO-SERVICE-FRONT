import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Drawer,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    SvgIcon, TextField
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderIcon from '@mui/icons-material/Folder';
import CollectionsIcon from '@mui/icons-material/Collections';
import DeleteIcon from '@mui/icons-material/Delete';

import {useHistory, useLocation, useNavigate, useParams} from "react-router-dom";
import './NavBar.css'
import {useState} from "react";
import FormDialog from "../FormDialog/FormDialog";
import {list} from "../Album/WatchAlbums";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {serviceActions} from "../../Storage/serviceSlice";
import upload from "../Upload/Upload";
const NavBar = () => {


    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [folderName, setFolderName] = useState("");
    const usePathname = () => {
        const location = useLocation();
        return location.pathname;
    }

    const path = usePathname();
    const dispatch = useDispatch();
    const store = useSelector(state => state.service);

    const handleEdit = () => {
        if (folderName == "")
            return;

        const requestOptions = {
            method: "POST",
            headers: { "accept": "application/json" },
            body: JSON.stringify(
                `name=${folderName}`
            ),
        };
        fetch("/operations/add_album?" + new URLSearchParams( {
            name: folderName
        }), requestOptions)
            .then(response => response.json())
            .then(data => {
                dispatch(serviceActions.addFolder({id: data.id_album, name: folderName, uuid: data.uuid_album}))
            });
        setOpen(false);
    }

    const handleChange = (event) => {
        setFolderName(event.target.value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        //Делаем запрос
    }

    let url = usePathname().split('/');
    const isPhoto = () => {
        if (url.length == 3 && url[1] == "albums" && url[2] != '')
            return true;
        else
            return false;
    }

    const isAlbum = () => {
        if ((url.length == 3 && url[1] == "albums" && url[2] == '') || (url.length == 2 && url[1] == "albums" && url[0] == ''))
            return true;
        else
            return false;
    }


    const postPhoto = async (file, name) => {
        let id_fodler = url[2];
        let folder = store.folders.filter(folder => folder.id == id_fodler)[0];
        let uuid_album = folder.uuid;
        const requestOptions = {
            method: "POST",
            headers: {
                'accept': 'application/json',
            },
            body: file
        };

        const response = await fetch("/operations/add_photo?"  + new URLSearchParams( {
            uuid_album: uuid_album,
            name: name
        }), requestOptions);
        if (response.status >= 200 && response.status < 300) {
            const photo = await response.json();
            dispatch(serviceActions.addPhoto({
                id_folder: id_fodler,
                uuid: photo.uuid_photo,
                id: photo.id_photo,
                url: photo.url,
                name: name
            }))
        }
    };

    function changeHandler(event) {
        let files = [...event.target.files];

        files.forEach(value => {
            const uploadData = new FormData();
            uploadData.append('img', value);
            postPhoto(uploadData, value.name);
        })
        //делаем запрос и обратную связь добавляем в dispatch
        // dispatch({type: ADD_PHOTO, payload: {
        //         id_folder: url[2],
        //         photos : [
        //             ...files.map((value, index, arr) => {
        //                 return {
        //                     id: index,
        //                     name: value.name,
        //                     file: value
        //                 }
        //             })
        //         ]}
        //     })
    }

    return (
        <div>
        { (path == "/login" || path == "/") ? <div></div> :
            <div className="SideBar">
                    <List>
                        {isAlbum() ?
                            <ListItem>
                                <ListItemButton
                                    onClick={handleClickOpen}
                                >
                                    <CreateNewFolderIcon color="primary" sx={{width: 38, height: 38}}/>
                                    <ListItemText primaryTypographyProps={{fontSize: '30px', pl: '22px'}}
                                                  primary="Создать"/>
                                </ListItemButton>
                            </ListItem>
                            : null
                        }
                        <ListItem>
                            <ListItemButton
                                onClick={() => navigate("/albums")}
                            >
                                <FolderIcon color="primary" sx={{width: 38, height: 38}}/>
                                <ListItemText primaryTypographyProps={{fontSize: '30px', pl: '22px'}}
                                              primary="Альбомы"/>
                            </ListItemButton>
                        </ListItem>
                        { isPhoto() ?
                            <ListItem>
                                <ListItemButton>
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        multiple
                                        type="file"
                                        style={{display: "none"}}
                                        onChange={event => changeHandler(event)}
                                    />
                                    <label htmlFor="contained-button-file" style={{display: "flex"}}>
                                        <AddPhotoAlternateIcon color="primary" sx={{width: 38, height: 38, display: "inline"}}/>
                                        <ListItemText primaryTypographyProps={{fontSize: '30px', pl: '22px'}} primary="Загрузить"/>
                                    </label>
                                </ListItemButton>
                            </ListItem> : null}
                    </List>
                    <div className="CreateFolder">
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle sx={{textAlign: 'center'}}>Создать Папку</DialogTitle>
                            <DialogContent>
                                <FolderIcon
                                    sx={{height: "130px", width: "130px", color: "blue", mx: "auto"}}></FolderIcon>
                                <TextField
                                    className="createfolder"
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Название папки"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Отменить</Button>
                                <Button onClick={handleEdit}>Создать</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
            </div>
        }
        </div>
    )
}

export default NavBar;