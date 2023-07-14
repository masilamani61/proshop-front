import React, { useEffect, useState } from 'react'
import Header from '../componnents/header'
import { Button, Col, Row, Table } from 'react-bootstrap'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router'

function ProductScreen() {
    const [product,setproduct]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const fetch=async()=>{
        const res=await axios.get('https://proapi.onrender.com/admin/product/all')
        console.log(res)
        setproduct(res.data)
}
    fetch();
},[])
    const handledelete=async(id)=>{
        console.log(id)
        const res1=await axios.delete('https://proapi.onrender.com/admin/product/'+id)
        if (res1){
        window.location.reload()}
    }
    const productcreate=async()=>{
        const res1=axios.post('https://proapi.onrender.com/admin/product').then(
            window.location.reload()
        )



    }
console.log(product)
  return (

    <>
    <Header/>
    <Row className='my-4'>
        <Col md={8}>
           <h1> products</h1>
        </Col>
        <Col md={2}>
        <Button onClick={productcreate}>Create Products</Button>
        </Col>
    </Row>
    <Table responsive>
        <thead>
            <tr>
                <th>Id</th>
                <th>name</th>
                <th>price</th>
                <th>brand</th>
                
            </tr>
        </thead>
        <tbody>
       { product.map((prod)=>(
        <tr>
            <td>{prod._id}</td>
            <td>{prod.name}</td>
            <td>{prod.price}</td>
            <td>{prod.brand}</td>
            <td><FaEdit onClick={()=>{navigate('/edit/'+prod._id)}}/> <FaTrash onClick={()=>handledelete(prod._id)}/></td>
        </tr>

       ))}</tbody>
    </Table>
    </>
  )
}

export default ProductScreen