import {createSlice} from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
    name: "service",
    initialState: {
        folders : [],
    },
    reducers: {
        getFolders(state, action) {
            console.log("get folders", action.payload.folders);
            state.folders = action.payload.folders.map(folder => {
                return {
                    ...folder,
                    photos: []
                }
            });
        },
        addFolder(state, action) {
            state.folders.push({
                id : action.payload.id,
                name: action.payload.name,
                uuid: action.payload.uuid,
                photos: []
            })
        },
        removeFolder(state, action) {
            state.folders = state.folders.filter(value => value.id != action.payload.id)
            console.log("after delete", state.folders);
        },
        getPhotos(state, action) {
            let folder = state.folders.filter(value => value.id == action.payload.id)[0];
            console.log(action.payload.photos);
            folder.photos = action.payload.photos;
        },
        deletePhotos(state, action) {
            state.folders = state.folders.map(folder => {
                    if (folder.id != action.payload.id_folder)
                        return folder;
                    else {
                        folder.photos = folder.photos.filter(photo => photo.uuid != action.payload.uuid);
                        return folder;
                    }
                })
        },
        addPhoto(state, action) {
            let folder = state.folders.filter(folder => folder.id == action.payload.id_folder)[0];
            folder.photos.push({
                id: action.payload.id,
                id_album: action.payload.id_folder,
                uuid: action.payload.uuid,
                name: action.payload.name,
                url: action.payload.url
            })
        }
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin : false
    },
    reducers: {
        login(state, action) {
            state.isLogin = action.payload.flag;
        }
    }
})


export const serviceActions = serviceSlice.actions;
export const authActions = authSlice.actions;