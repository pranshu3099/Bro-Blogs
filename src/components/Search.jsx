import { useState } from "react";
const Search = () => {
    const [searchBlog, setSearchBlog] = useState('');
    return ( <>
    
    <div>
        <input type="text" placeholder="search blogs press ctr+k" value={searchBlog} onChange = {e=>setSearchBlog(e.target.value)}/>
    </div>
        
    </> 
    );
}
 
export default Search;