import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import { imageAPI } from '../../../constant/Constant';
import NavbarContent from '../../../layouts/frondend/NavbarContent'

function ProductDetail(props)
{
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(1);

    
    useEffect(() => {
        let isMounted = true;
        
        const category_slug = props.match.params.category; 
        const product_slug = props.match.params.product; 
        axios.get(`/api/view/viewproductdetail/${category_slug}/${product_slug}`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setProduct(res.data.product);
                    setLoading(false);
                }   
                else if(res.data.status === 404)
                {
                    history.push('/collections');
                    swal("Warning",res.data.message,"error");
                }
            }
        });
        
        return() => {
            isMounted =false;
        };
    }, [props.match.params.category, props.match.params.product, history]);

    const handleDecrement = () => {
        if(quantity > 1){
            setQuantity(prevCount => prevCount - 1); 
        }
        
    }
    const handleIncrement = () => {
        if(quantity <9){
            setQuantity(prevCount => prevCount + 1);
        }
        
    }

    const submitAddtocart = (e) => {
        e.preventDefault();

        const data = {
            product_id: product.id,
            product_quantity: quantity,
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


    if(loading)
    {
        return <h4>Loading products detail....</h4>
    }
    else
    {
        var avail_stock = '';
        if(product.quantity > 0)
        {
            avail_stock = <div>
             <label className="btn-sm btn-success px-4 mt-2">In stock</label>

                <div className="row">
                        <div className="col-md-3 mt-3">
                            <div className="input-group">
                                <button type="button" onClick={handleDecrement} className="input-group-text">-</button>
                                
                                <div className="form-control text-center">{quantity}</div>
                                <button type="button" onClick={handleIncrement} className="input-group-text">+</button>
                            </div>
                        </div>
                        <div className="cod-md-3 mt-3">
                            <button type="button" className="btn btn-primary w-50" onClick={submitAddtocart}>Add to Cart</button>
                        </div>
                </div>
            
        </div>

        }
        else{
            avail_stock = <div>
             <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
            </div>
        }
        
    }

    return(
        <div>
            <NavbarContent />

            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Collections / {product.category.name} / {product.name}</h4>
                </div>

            </div> 

            <div className="py-3 ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 border-end">
                            <img src={`${imageAPI}${product.image}`} alt={product.name} className="w-100" />
                        </div>
                        <div className="col-md-8">
                            <h4>
                                {product.name}
                                <span className="float-end badge btn-sm btn-danger badge-pill">{product.brand}</span>
                            </h4>
                            <p>{product.description}</p>
                            <h4 className="mb-1">
                                <div className="ms-2">
                                    Sale price:  
                                    <NumericFormat value={product.seller_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'} />
                                </div>
                                <div>
                                    <span className="ms-2">
                                        Origin price: 
                                        <s className="ms-2">
                                            <NumericFormat value={product.origin_price}  displayType={"text"} thousandSeparator={','} suffix={' vnd'} />    
                                        </s>
                                    </span>
                                </div>
                                
                            </h4>
                            <div>
                                {avail_stock}
                               
                            </div>
                            <button type="button" className="btn btn-danger mt-3">Add to Wishlist</button>
                        </div>
                    </div>
                    

                </div>

            </div>
        </div>
    )


}

export default ProductDetail;