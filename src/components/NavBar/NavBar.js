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
import {ADD_PHOTO, CREATE_FOLDER, RENAME_FOLDER} from "../../Storage/Actions/action";
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
    const handleEdit = () => {
        if (folderName == "")
            return;
        //делаю асинхронный запрос
        dispatch({type: CREATE_FOLDER, payload: {name: folderName}});
        setOpen(false);
    }

    const store = useSelector(state => state);

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
        if (url.length == 3 && url[1] == "albums" && !isNaN(url[2]))
            return true;
        else
            return false;
    }

    let result = useSelector(state => state)
    function changeHandler(event) {
        let files = [...event.target.files];
        //делаем запрос и обратную связь добавляем в dispatch
        dispatch({type: ADD_PHOTO, payload: {
                id_folder: url[2],
                photos : [
                    ...files.map((value, index, arr) => {
                        return {
                            id: index,
                            name: value.name,
                            file: value
                        }
                    })
                ]}
            })
    }

    return (
        <div>
        { (path == "/login" || path == "/") ? <div></div> :
            <div className="SideBar">
                    <List>
                        <ListItem>
                            <ListItemButton
                                onClick={handleClickOpen}
                            >
                                <CreateNewFolderIcon color="primary" sx={{width: 38, height: 38}}/>
                                <ListItemText primaryTypographyProps={{fontSize: '30px', pl: '22px'}}
                                              primary="Создать"/>
                            </ListItemButton>
                        </ListItem>
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
                            <FolderIcon sx={{height: "130px", width: "130px", color: "blue", mx: "auto"}}></FolderIcon>
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