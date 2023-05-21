import axios from "axios";

const URL = "https://reqres.in/api/users?per_page=2&page=";

const getList = async function(page){
    let url
    if (page != null && page > 1)
        url = URL + `${page}`;
    else
        url = URL + `${2}`;
    let result = await axios.get(url);
    return result.data;
}

export default getList;