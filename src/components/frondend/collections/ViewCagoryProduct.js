import React, {useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Top from "../../../layouts/frondend/Top.js"
import {pathCategory} from '../../../constant/Constant'
import NavbarContent from '../../../layouts/frondend/NavbarContent'
import { imageAPI } from '../../../constant/Constant';


function ViewCategory(props)
{
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState([]);
    useEffect(() => {
        let isMountered = true;
        const product_id = props.match.params.id; 
    
        axios.get(`/api/view/getCollectionProduct/${product_id}`).then(res=>{
            if(isMountered)
            {
                if(res.data.status === 200)
                {
                    setCategory(res.data.products);
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
                <div className="col-md-3" key={idx}> 
                    <div className="card">
                        <Link to={`/collections/${item.slugCate}/${item.slug}`}>
                            <img src={`${imageAPI}${item.image}`} className="w-100" alt={item.name} />
                        </Link>
                        
                        <div className="card-body">
                            <Link to={`/collections/${item.slug}/${item.slug}`}> 
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