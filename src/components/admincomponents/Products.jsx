import { Badge } from 'antd'
import React, { useEffect, useState } from 'react'
import { Button, Tooltip, message } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getcategories, selectcategories } from '../../features/categories/categoriesSlice';
import { createproduct, getproducts, selectproducts, selectaddstatus, selectdeletestatus, filtreprice } from '../../features/products/productsSlice';
import ProductItem from './ProductItem';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { InputNumber } from 'antd';

const { Search } = Input;
const Products = () => {

    const dispatch = useDispatch()

    const categories = useSelector(selectcategories)
    const products = useSelector(selectproducts)
    const addstatus = useSelector(selectaddstatus)
    const deletestatus = useSelector(selectdeletestatus)

    useEffect(() => {

        if (addstatus === 'success') {
            dispatch(getproducts())
            success()
            setdisplayform(false)
        }
        else if (addstatus === 'failure') {
            error()
        }

    }, [addstatus])

    useEffect(() => {
        dispatch(getproducts())

    }, [deletestatus]);

    useEffect(() => {
        dispatch(getcategories())
        dispatch(getproducts())
    }, [])

    function onChange(value) {
        console.log('changed', value);
    }

    const success = () => {
        message.success('product successfuly created');
    };


    const error = () => {
        message.error('creating new product is failed');
    };

    const [displayform, setdisplayform] = useState(false);

    const [name, setname] = useState('');
    const [price, setprice] = useState(0);
    const [qte, setqte] = useState(0);
    const [description, setdescription] = useState('');
    const [file, setfile] = useState(null);
    const [category, setcategory] = useState('');

    const addproduct = () => {
        const data = new FormData()

        data.append('name', name)
        data.append('price', price)
        data.append('qte', qte)
        data.append('description', description)
        data.append('category', category)
        data.append('image', file)

        dispatch(createproduct(data))
    }

    const handlefile = (e) => {
        setfile(e.target.files[0])
    }

    const onSearch = value => console.log(value);

    return (
        <div style={{ width: "100%" }} class="products-catagories-area clearfix mt-5 pr-5" >
            <h2>Products <Badge count={products.length} showZero /></h2>

            <div className='products-tools' style={{ display: "flex", justifyContent: 'space-between' }} >
                <Tooltip title={displayform ? 'close' : "create"}>
                    <Button onClick={() => setdisplayform(!displayform)} style={{ background: displayform ? 'red' : "#FBB808", outline: "none", border: 'none' }} type="primary" shape="circle" icon={displayform ? <CloseOutlined /> : <PlusOutlined />} />
                </Tooltip>
                <div style={{ display: 'flex' }} >
                    <Input
                        placeholder="$"
                        onChange={(e) => dispatch(filtreprice({price : e.target.value}))}
                    />
                </div>
            </div>

            {displayform && <div className='categoryform' >
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                    <input value={name} onChange={(e) => setname(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="category name" />
                </div>

                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Price</label>
                    <input value={price} onChange={(e) => setprice(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="category name" />
                </div>

                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Qte</label>
                    <input value={qte} onChange={(e) => setqte(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="category name" />
                </div>

                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Description</label>
                    <input value={description} onChange={(e) => setdescription(e.target.value)} type="text" class="form-control" id="exampleFormControlInput1" placeholder="category name" />
                </div>

                <select onChange={(e) => setcategory(e.target.value)} class="form-select" aria-label="Default select example">
                    <option selected>select category</option>
                    {
                        categories.map((cat, i) => {
                            return (
                                <option value={cat._id}>{cat.name}</option>
                            )
                        })
                    }
                </select>

                <div class="my-3">

                    <input onChange={(e) => handlefile(e)} class="form-control" type="file" id="formFile" />
                </div>

                <Button onClick={() => addproduct()} style={{ background: "#FBB808", outline: "none", border: 'none' }} type="primary">Create</Button>
            </div>}


            <div className='row mt-3'>
                {
                    products.map((prod, i) => {
                        return (
                            <ProductItem product={prod} />
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Products
