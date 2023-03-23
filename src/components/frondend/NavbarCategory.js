import React, { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function NavbarCategory(){
    const [category, setCategory] = useState([])
    useEffect(() => {
        axios.get('/api/view/getCategory')
            .then(res => {
                if(res.data.status === 200) {

                    setCategory(res.data.category);
                }
            })
    }, [])
    var root = ''
    root =  category.map((val , i) => {
        if(val.parent_id === 0){
            return(    
                 <Link to={`/collections/${val.id}`} key={i} className="nav-item nav-link">{val.name}</Link>  
            )
        }
    })

    
    return (
        <div className="navbar-nav w-100 overflow-hidden" style={{height: "100%"}}>
            {root}
        </div>
    )
}

export default NavbarCategory