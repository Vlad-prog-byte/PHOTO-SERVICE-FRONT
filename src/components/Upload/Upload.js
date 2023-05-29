import './Upload.css'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import {CircularProgress} from "@mui/material";

const Upload = () => {

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    let filesSend = []
    function dragLeaveHandler(event) {
        event.preventDefault();
        let coordForm = document.querySelector('.upload').getBoundingClientRect();
        let x = coordForm.x;
        let y = coordForm.y;
        let w = coordForm.width;
        let h = coordForm.height;
        let x1 = event.pageX;
        let y1 = event.pageY;
        if (!(x1 > x && (x1 < x + w) && y1 > y && (y1 < y + h))) {
            event.currentTarget.style.background= '#e0f2f7';
        }
        else
            return;
    }
    function dragEnterHandler(event) {
        event.preventDefault();
        let coordForm = document.querySelector('.upload').getBoundingClientRect();
        let x = coordForm.x;
        let y = coordForm.y;
        let w = coordForm.width;
        let h = coordForm.height;
        let x1 = event.pageX;
        let y1 = event.pageY;
        if (x1 > x && (x1 < x + w) && y1 > y && (y1 < y + h))
            event.currentTarget.style.background = '#916a6a';
        else
            return;
    }
    function dropHandler(event) {
        event.preventDefault();
        let files = [...event.dataTransfer.files];
        let imageFiles = [];
        for (let i = 0; i < files.length; i++) {
            let reg = /image/g;
            let result = files[i].type.match(reg);
            if (result != null) {
                imageFiles.push(files[i]);
            }
        }
        event.currentTarget.style.background= '#e0f2f7';
        setDisabled(false);
        imageFiles.forEach(value => filesSend.push(value))
    }

    function changeHandler(event) {
        let files = [...event.target.files];
        setDisabled(false);
        files.forEach(value => filesSend.push(value));
    }

    const clickHandler = event => {
        setLoading(true);
        let promise = new Promise((resolve, reject) => {
            setTimeout( () => {
                resolve();
            }, 3000)
        })
        promise.then((result) => {
            setLoading(false);
            setDisabled(true);
        })
    }

    return (
     <div className="upload-block">
         <form className="upload" id="upload"
               onDragEnter={ event => dragEnterHandler(event)}
               onDragLeave={event => dragLeaveHandler(event)}
               onDragOver={event => dragEnterHandler(event)}
               onDrop={ event => dropHandler(event)}
         >
            <UploadFileIcon className="upload-icon" sx={{ width: 300, height: 300, m: '40px'}}/>
                 <div>
                     <input id="file-input" type="file" name="file" multiple accept="image/*" onChange={event => changeHandler(event)}/>
                     <div>
                         <label htmlFor="file-input">Выберите файл </label>
                         <span>или перетащите его cюда</span>
                     </div>
                 </div>
             <LoadingButton
                 loading = {loading}
                 loadingIndicator={<CircularProgress color="primary" size="30px" />}
                 variant="outlined"
                 onClick={clickHandler}
                 disabled={disabled}
                 sx = {{width: "300px", height: "50px", fontSize: "20px", mt: "20px", mx:"auto"}}
             >
                 Загрузить файлы
             </LoadingButton>
         </form>
     </div>
   );
}

export default Upload;