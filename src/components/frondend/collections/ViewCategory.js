import React, {useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Top from "../../../layouts/frondend/Top.js"
import {pathCategory} from '../../../constant/Constant'
import NavbarContent from '../../../layouts/frondend/NavbarContent'


function ViewCategory()
{
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        let isMountered = true;
    
        axios.get(`/api/view/getCategoryChilde`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setCategory(res.data.category);
                    setLoading(false);
                }

            }
          
        });
        return() => {
            isMountered =false;
        }
    });

    if(loading)
    {
        return <h4>Loading Categories...</h4>
    }
    else
    {
        var showCategoryList = '';
        showCategoryList = category.map((item, idx)=>{

            return(
                <div className="col-md-4"key={idx}>
                <div className="card">
                    <div className="card-body">
                        <Link to={`collections/${item.id}`}>
                            <h5>{item.name}</h5>
                        </Link>
                    </div>

                </div>

            </div> 
            )
        })
    }

    
    return (
        <div>
            <NavbarContent />

            <Top  path={pathCategory.path} name={pathCategory.name}/>


            <div className="py-3 ">
                <div className="container">
                    <div className="row">
                        {showCategoryList}
                    </div>
                    

                </div>

            </div>
        </div>
    )
}

export default ViewCategory;