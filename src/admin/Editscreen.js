import React, { useCallback, useEffect, useState } from 'react'
import Header from '../componnents/header'
import {  useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { Button, Col, Form,Row } from 'react-bootstrap'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from './firebas'
     

function Editscreen() {
    console.log('1')

    const [product,setproduct]=useState()
    const[desc,setdesc]=useState()
    
    const [name,setname]=useState()
    const [price,setprice]=useState()
    const [Brand,setBrand]=useState()
    const [Count,setcount]=useState()
    const [Rating,setRating]=useState()
    const [image,setimage]=useState()
    const {id}=useParams()
    
    const navigate=useNavigate()
    const usefetch=useCallback((data)=>{
        setproduct(data)

    },[])
      
    useEffect(()=>{
        const fetch= async()=>{
            const res=await axios.get('https://proapi.onrender.com/api/product/'+id)
            console.log('2')
            usefetch(res.data)
        }
        fetch()
    }
    ,[usefetch])
    useEffect(()=>{
        console.log('product')
        if (product){
            setname(product.name)
            setprice(product.price)
            setBrand(product.brand)
            setcount(product.countInStock)
            setRating(product.rating)
            setimage(product.image)
            setdesc(product.description)
        }
    },[product])
   
      
    const handlerchange=async(e)=>{
        const file=e.target.files[0]
        console.log(file.name)
        
        const storageRef = ref(storage,file.name );
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              
              setimage(downloadURL)

            });
          }
        );
       
    }
    
    const handler=async()=>{
        console.log(name,Rating,price,Count,Brand)
        try{
        const res=await axios.put('https://proapi.onrender.com/admin/product/'+id,{
            name,
            rating:Rating,
            price,
            count:Count,
            brand:Brand,
            image,
            desc
        })
        navigate('/productlist')
        }
        catch(err){
            console.log(err)
        }
        
    }
  return (
    <>
    <Header/>
    {product?<Row className='justify-content-md-center my-3'>
        <Col md={8}>
    <Form className='justify-content-md-center'>
        <Form.Group>
            <Form.Label>
                <h3>Name :</h3>
            </Form.Label>
            <Form.Control type='name' value={name}  onChange={e=>setname(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                <h3>Price</h3>
            </Form.Label>
            <Form.Control type='name' value={price} onChange={(e)=>setprice(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                <h3>Image</h3>
            </Form.Label>
            <Form.Control type='file' Label='choosefile' onChange={handlerchange}>

            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                <h3>Brand:</h3>
            </Form.Label>
            <Form.Control type='name' value={Brand} onChange={(e)=>setBrand(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                <h3>Rating</h3>
            </Form.Label>
            <Form.Control type='name' value={Rating} onChange={(e)=>setRating(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                <h3>Count in stock</h3>
            </Form.Label>
            <Form.Control type='name' value={Count} onChange={(e)=>setcount(e.target.value)}>

            </Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                <h3>Description</h3>
            </Form.Label>
            <Form.Control type='name' value={desc} onChange={(e)=>setdesc(e.target.value)}>

            </Form.Control>
        </Form.Group>
        {(image=='')?
        <Button onClick={handler} disabled >submit</Button>:
        <Button onClick={handler} >submit</Button>}
       
    </Form>
    </Col>
    </Row>:<h1>Loading</h1>
}
    </>
  )
}

export default Editscreen