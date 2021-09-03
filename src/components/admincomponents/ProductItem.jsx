import React, { useState } from 'react'
import { DeleteOutlined, EditOutlined, CameraOutlined } from '@ant-design/icons';
import { deleteproduct, updateproductimage, updateproductinfo } from '../../features/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'antd/lib/modal/Modal';
import { Form, Input, Button, Checkbox } from 'antd';

import { Select } from 'antd';
import { selectcategories } from '../../features/categories/categoriesSlice';

const { Option } = Select;

const ProductItem = ({ product }) => {

    const categories = useSelector(selectcategories)

    const dispatch = useDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);

        let data = {
            id : product._id,
            data : values,
        }
        dispatch(updateproductinfo(data))
        handleCancel()
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const updateimage = (e) => {

        const fdata = new FormData()

        fdata.append('image',e.target.files[0])

        let data = {
            id: product._id,
            data: fdata
        }

        dispatch(updateproductimage(data))

    }

    return (
        <div class="col-4" >
            <div className="single-product-wrapper">
                {/* Product Image */}
                <div className="product-img">
                    <img src={"http://localhost:5000/getfile/"+product.image } />
                    {/* Hover Thumb */}
                    <img style={{objectFit:"cover"}} className="hover-img" src={"http://localhost:5000/getfile/" + product.image} alt />
                </div>
                {/* Product Description */}
                <div className="product-description d-flex align-items-center justify-content-between">
                    {/* Product Meta Data */}
                    <div className="product-meta-data">
                        <div className="line" />
                        <p className="product-price">${product.price}</p>
                        <a href="product-details.html">
                            <h6>{product.name}</h6>
                        </a>
                    </div>
                    {/* Ratings & Cart */}
                    <div className="ratings-cart text-right">
                        <div className="ratings">
                            <i className="fa fa-star" aria-hidden="true" />
                            <i className="fa fa-star" aria-hidden="true" />
                            <i className="fa fa-star" aria-hidden="true" />
                            <i className="fa fa-star" aria-hidden="true" />
                            <i className="fa fa-star" aria-hidden="true" />
                        </div>
                        <div className="cart">
                            <EditOutlined onClick={()=> showModal()} style={{marginRight:"10px", marginTop: "5px", cursor: 'pointer', fontSize: "20px", color: "blue" }} />
                            <DeleteOutlined onClick={() => dispatch(deleteproduct(product._id))}  style={{marginTop:"5px",cursor:'pointer',fontSize:"20px",color:"red"}} />
                        </div>
                    </div>
                </div>
            </div>

            <Modal footer={null} title="Update Product" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div  >
                    <img src={'http://localhost:5000/getfile/' + product.image} alt="" />
                    <div >
                        <CameraOutlined style={{ marginLeft:"50%"}} onClick={() => document.getElementById('uploadproduct').click()} className='avataricon' />
                        <input type="file" onChange={(e)=> updateimage(e)}  hidden id="uploadproduct" />
                    </div>

                    <Form
                        name="basic"
                        style={{marginTop:"20px"}}
                        layout="vertical"
                        initialValues={{ 
                            name : product.name,
                            price : product.price,
                            qte : product.qte,
                            description : product.description,
                            category : product.category._id,
                         }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                           label="name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="quantity"
                            name="qte"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="description"
                            name="description"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="category"
                            name="category"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Select>
                                {
                                    categories.map((c) => {
                                        return (
                                            
                                            <Option value={c._id}>{c.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>

                        

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Update
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                {/* form */}
            </Modal>

        </div>
    )
}

export default ProductItem