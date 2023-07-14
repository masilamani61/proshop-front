import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Button, Card, Col,Form,Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import Header from '../componnents/header'
import axios from 'axios'
import { addtocart } from '../slices/catrslice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router'
import Rating from '../componnents/rating '

function Productscreen() {
    const [product,setproduct]=useState({})
    const [quantity,setquantity]=useState(1)
    const [name,setname]=useState()
    const [rating,setrating]=useState()
    const [comment,setcomment]=useState()
  
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {id}=useParams()
    const {userinfo}=useSelector((state)=>state.auth)
    useEffect(()=>{
        const fetch=async()=>{
            const res=await axios.get('https://proapi.onrender.com/api/product/'+id)
            console.log(res)
            setproduct(res.data)
        }
        fetch()
    },[id])
    const publishreview=async()=>{
        try{
            const ans=await axios.put(`https://proapi.onrender.com/api/product/${id}/reviews`,{
                name,comment,rating,userid:userinfo._id
            })
            console.log(ans)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }
      
    }
    const handleclick=()=>{
        dispatch(addtocart({
            ...product,quantity
        }))
        navigate('/cart')
    }
    
  return (
    <>
    <Header/>
    
    <Row className='py-3 px-3'>
        <Col md={3}>
        <Image src={product.image} fluid/>
        </Col>
        <Col md={4}>
        <ListGroup>
            <ListGroupItem><h3>{product.name}</h3></ListGroupItem>
            <ListGroupItem><h4>{product.brand}</h4></ListGroupItem>
            <ListGroupItem><Rating value={product.rating}/></ListGroupItem>
            <ListGroupItem><h3>${product.price}</h3></ListGroupItem>
            <ListGroupItem>{product.description}</ListGroupItem>
        </ListGroup>

        </Col>
        <Col>
        <ListGroup>
            <ListGroupItem>
                <Row>
                    <Col>
                    <h3>Price:</h3>
                    </Col>
                    <Col>
                    <strong>
                    ${product.price}</strong>
                    </Col>
                </Row>
         
         
            </ListGroupItem>
            <ListGroupItem>
                <Row>
                    <Col>
                    <h3>StockStatus</h3>
                    </Col>
                    <Col>
                    <strong>
                    {product.countInStock >0?'Available':'out of stock'}</strong>
                    </Col>
                </Row>
                </ListGroupItem>
          {product.countInStock>0 &&  <ListGroupItem>
            <Row>
                <Col>
                <h4>Quantity</h4>
                
                </Col>
                <Col>
                <Form.Control as='select' value={quantity} onChange={(e)=>setquantity(e.target.value)} >
                {[...Array(product.countInStock).keys()].map(
                    x=>(
                        <option key={x+1} value={x+1}>
                            {x+1}

                        </option>
                )
                )}
                </Form.Control>
                </Col>
            </Row>

            </ListGroupItem>}

            <ListGroupItem>
                {product.countInStock>0 &&
                <Button bg='dark' onClick={handleclick} type='submit'>
                    Add to cart
                </Button>
               
} <Button href='/'>
                Go back
                </Button>
            </ListGroupItem>

        </ListGroup>

        </Col>
    </Row>
    
    <Row>
        <h3>Reviews</h3>
        <Col md={5} sm={4}>
            { (product.reviews?.length>0) ? (
                product.reviews.map((rev)=>(
                    <Card className='mx-3 my-3'>
                        <Card.Title>
                    <strong>{rev.name}:</strong>
                    </Card.Title>
                    <Card.Text>
                    <h4>{rev.comment}</h4>
                    </Card.Text>
                    <h3>
                     <Rating value={rev.rating}/>
                    </h3>
                    </Card>
                ))):<h3>No reviews</h3>
            }

        </Col>
        <Col>
        {userinfo &&<Form>
        <h3>Write Reviews</h3>
        <Form.Group>
         <Form.Label><h4>Name:</h4></Form.Label>
         <Form.Control style={{borderColor:'blue'}} value={name}  onChange={e=>setname(e.target.value)}></Form.Control>
         <Form.Label><h4>Comment:</h4></Form.Label>
         <Form.Control style={{borderColor:'blue'}} value={comment} onChange={e=>setcomment(e.target.value)}></Form.Control>
         <Form.Label><h4>Rating</h4></Form.Label>
         <Form.Control style={{borderColor:'blue',marginBottom:'15px'}}  value={rating} onChange={e=>setrating(e.target.value)} type='number' max={5} min={0} inputMode='none' ></Form.Control>
         <Button  onClick={()=>publishreview()}>Publish</Button>
         </Form.Group>
        </Form>
        }
        </Col>
    </Row>

    </>
  )
}

export default Productscreen