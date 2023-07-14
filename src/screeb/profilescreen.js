import React, { useEffect, useState } from 'react'
import {Col, Container, Row,Form,Button, ListGroup, Image} from 'react-bootstrap'
import Header from '../componnents/header'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setcreadiantials } from '../slices/authslices'

function Profile() {
    const {userinfo}=useSelector((state)=>state.auth)
    console.log(userinfo)
    const[name,setname]=useState(userinfo.name)
    const [email,setemail]=useState(userinfo.email)
    const [password,setpassword]=useState(userinfo.password)
    const [confpass,setconfpass]=useState(userinfo.password)
    const [orderlist,setorderlist]=useState()
    const dispatch=useDispatch()
    const submithandler=async(e)=>{
        e.preventDefault()
        const res=await axios.put('https://proapi.onrender.com/api/user/update',{
            id:userinfo._id,
            name,
            email,password
        })
        console.log(res)
        const data=res.data
        dispatch(setcreadiantials(data))

    }
    useEffect(()=>{
        const fetch=async()=>{
            console.log(userinfo._id)
            const res=await axios.get('https://proapi.onrender.com/user/orders/'+userinfo._id)
            setorderlist(res.data)
        }
        fetch()
    },[])
    console.log(orderlist)
  return (
    <>
    <Header/>
    <Container>
        <Row>
            <Col md={3}>
            <Form >
        <h1>update</h1>
        <Form.Group className='py-3'>
            <Form.Label>
                <h3>
                Name</h3>
            </Form.Label>
            <Form.Control value={name} onChange={e=>setname(e.target.value)}  type='text'></Form.Control>
        </Form.Group>
        <Form.Group className=''>
            <Form.Label>
                <h3>
                Email address</h3>
            </Form.Label>
            <Form.Control value={email} onChange={e=>setemail(e.target.value)}  type='email'></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                <h3>
                password</h3>
            </Form.Label>
            <Form.Control onChange={e=>setpassword(e.target.value)} value={password} type='password'></Form.Control>
        </Form.Group>
        <Form.Group>
            <Form.Label>
                <h3>
                confirm password</h3>
            </Form.Label>
            <Form.Control onChange={e=>setconfpass(e.target.value)} value={confpass} type='password'></Form.Control>
        </Form.Group>
        <Button type='submit' onClick={submithandler} className='my-3'>Register</Button>
        
    </Form>
            </Col>
            <Col md={9}>
                <h1>Order status</h1>
                <ListGroup>
                  {orderlist && orderlist.map(order=>( <ListGroup.Item>
                       
                           <Row>
                            <Col md={7}>
                            {order.orderitems.map((ord)=>(
                              <Row>  
                            <Col>
                            <Image src={ord.image} fluid style={{objectFit:'cover',width:'20vh',height:'15vh'}}/>
                            </Col>
                            
                            
                            <Col>
                            {ord.name}
                            </Col>
                            <Col>
                            {ord.quantity}
                            </Col>
                            <Col>
                            {ord.price}
                            </Col>
                            </Row>
                            ))}
                            </Col>
                            <Col>
                            {order.isdeliverd?'delivered':'delivery started'}
                            </Col>
                            <Col>
                            ${order.itemprice}
                            </Col>
                            </Row>

                        

                    </ListGroup.Item>
                  ))}
                </ListGroup>
            </Col>
        
        </Row>
    </Container>
    </> )
}

export default Profile