import {createStore} from "redux";
import {
    ADD_PHOTO,
    CREATE_FOLDER,
    DELETE_FOLDER,
    DELETE_PHOTO,
    RENAME_FOLDER,
    RENAME_PHOTO, TRANSFORM_FOTO,
    VIEW_PHOTO
} from "./Actions/action";

const initalState = {
    folders : [],
    id : 0
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
        case CREATE_FOLDER:
            return {...state, folders: [
                ...state.folders,
                {
                    id : state.id + 1,
                    name: action.payload.name,
                    photos: []
                }
                ],
                id : state.id + 1
            }
        case DELETE_FOLDER:
            return {...state, folders: [
                    ...state.folders.filter(value => value.id != action.payload.id)
                ]}
        case RENAME_FOLDER:
            return {...state, folders: [
                    ...state.folders.map(value => {
                        if (value.id == action.payload.id)
                            return {
                                id: action.payload.id,
                                name: action.payload.name,
                            }
                        else
                            return value;
                    })
                ]

            }
        case ADD_PHOTO:
            let folder = state.folders.filter(value => value.id == action.payload.id_folder)[0];
            return {...state, folders: [
                    ...state.folders.map(folder => {
                        if (folder.id != action.payload.id_folder)
                            return folder;
                        else {
                            action.payload.photos.forEach(photo => {
                                folder.photos.push({
                                    id : photo.id,
                                    name: photo.name,
                                    file: photo.file
                                })
                            })
                            return folder;
                        }
                    })
                ]
            }
        case DELETE_PHOTO:
            return  {...state, folders: [
                    ...state.folders.map(folder => {
                    if (folder.id != action.payload.id_folder)
                        return folder;
                    else {
                        folder.photos = folder.photos.filter(photo => photo.id != action.payload.id_photo);
                        return folder;
                    }
                })]
            }
        case RENAME_FOLDER:
            return {...state, folders: [
                    ...state.folders.map(folder => {
                        if (folder.id == action.payload.id) {
                            folder.name = action.payload.name;
                            return folder;
                        }
                        else
                            return folder;
                    })
                ]}
        case RENAME_PHOTO:
            return {...state, folders : [
            ...state.folders.map(folder => {
                if (folder.id != action.payload.id_folder)
                    return folder;
                else {
                    folder.photos.filter(photo => photo.id == action.payload.id_photo)[0].name = action.payload.name;
                    return folder;
                }
            })
        ]}

        case TRANSFORM_FOTO:
            return {...state, folders: [
            ...state.folders.map(folder => {
                if (folder.id != action.payload.id_folder)
                    return folder;
                else {
                    folder.photos.filter(photo => photo.id == action.payload.id_photo)[0].image = action.payload.image;
                    return folder;
                }
            })
        ]}
        default:
            return state;
    }
}

export const store = createStore(reducer);