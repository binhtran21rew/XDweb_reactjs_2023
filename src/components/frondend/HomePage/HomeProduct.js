import axios from "axios";
import React, { useEffect, useState } from "react";
import {imageAPI} from '../../../constant/Constant'
import { NumericFormat } from 'react-number-format';
import { Link } from "react-router-dom";
import swal from "sweetalert";

function HomeProduct(){
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState([])
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios.get('/api/view/getCategory')
            .then(res => {
                setCategory(res.data.category);
                setLoading(false)
            })
        axios.get('/api/view/view_productHome')
            .then(res => {
                setProduct(res.data.products);
            })
    }, [])

    const submitAddtocart = (e, id) =>{
        e.preventDefault();
        const data = {
            product_id: id,
            product_quantity: 1
        }
        axios.post(`/api/cart/add-to-cart`,data).then(res=>{
            if(res.data.status === 201){
                swal("Success",res.data.message,"success");
            }else if(res.data.status === 409)
            {
                swal("Warning",res.data.message,"warning");
            }else if(res.data.status === 401)
            {
                swal("Error",res.data.message,"error");
            }else if(res.data.status === 404)
            {
                swal("Warning",res.data.message,"warning");
            }

        });
        
    }
    var display = ''
    if(loading){
        return <h4>Loading product item...</h4>
    }else{

        display = category.map((dataCate,i )=> {
            if(dataCate.parent_id  === 0){
                return (
                    <div className="container-fluid pt-5" key={i}>
                        <div className="text-center mb-4">
                            <h2 className="section-title px-5"><span className="px-2">{dataCate.name}</span></h2>
                        </div>
                        <div className="row px-xl-5 pb-3">{
                            product.map((data ,i) => {
                                if(data.idCate === dataCate.id){
                                    return(
                                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={i}>
                                            <div className="card product-item border-0 mb-4">
                                                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                                    <img className="img-fluid w-75 h-100" src={`${imageAPI}${data.image}`} alt=""  width="100px"/>
                                                </div>
                                                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                                    <h6 className="text-truncate mb-3">{data.name}</h6>
                                                    <div className="d-flex justify-content-center">
                                                        <h6>
                                                            <NumericFormat value={data.seller_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'} />
                                                            
                                                        </h6>
                                                        <h6 className="text-muted ml-2"><del>
                                                            <NumericFormat value= {data.origin_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'} />
                                                        </del></h6>
                                                    </div>
                                                </div>
                                                <div className="card-footer d-flex justify-content-between bg-light border">
                                                    <Link to={`/collections/${data.slugCate}/${data.slug}`} className="btn btn-sm text-dark p-0"><i className="fas fa-eye text-primary mr-1"></i>View Detail</Link>
                                                    {/* <Link to="" className="btn btn-sm text-dark p-0"><i className="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</Link> */}
                                                    <button type="button" className="btn btn-sm text-dark p-0" onClick={(e) => submitAddtocart(e,data.id)}><i className="fas fa-shopping-cart text-primary mr-1"></i>Add to Cart</button>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                             
                            })
                        }
                        </div>
                    </div>
                )
            }
            
        })
    }
    return(
        <>
            {display}   
        
        </>
    )
}

export default HomeProduct