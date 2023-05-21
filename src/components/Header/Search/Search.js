import {IconButton, InputBase, Paper} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
    return(
        <Paper
            className="search"
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 504, height: 50, bgcolor: '#FFF', borderRadius: 25, boxShadow: ' 0px 4px 4px rgba(0, 0, 0, 0.7)' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Поиск..."
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon/>
            </IconButton>
        </Paper>
    );
}

export default Search;