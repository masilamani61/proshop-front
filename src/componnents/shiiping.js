import React, { useState } from 'react'
import {Container,Form,Row,Col,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {shippingaddress} from '../slices/catrslice'
import Header from './header'

function Shipping() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {shippinaddress}=useSelector(state=>state.cart)
    console.log(shippinaddress)
    const [country,setcountry]=useState(shippinaddress.country || '')
    const [postcode,setpostcode]=useState(shippinaddress.postcode || 0 )
    const [Address,setAdress]=useState(shippinaddress.Address || "")
    const [city,setcity]=useState(shippinaddress.city || "")
    const handleclick=()=>{
        dispatch(shippingaddress({Address,postcode,city,country}))
        navigate('/payment')


    }
    
  return (
    <>
    <Header/>
    <Container>
        <Row className='justify-content-md-center'>
            <Col md={6}>
    <Form >
        <h1>Shipping Address</h1>
        <Form.Group className='py-3'>
            <Form.Label>
                <h3>
                Address</h3>
            </Form.Label>
            <Form.Control placeholder='Address' style={{borderColor:'blue'}} value={Address} onChange={e=>setAdress(e.target.value)}  type='Address'></Form.Control>
            <Form.Label>
                <h3>
                    City
                </h3>
            </Form.Label>
            <Form.Control value={city} placeholder='City' style={{borderColor:'blue'}} onChange={e=>setcity(e.target.value)}  type='text'></Form.Control>
      
            <Form.Label>
                <h3>
                    Postal code
                </h3>
            </Form.Label>
            <Form.Control value={postcode} placeholder='postCode' style={{borderColor:'blue'}} onChange={e=>setpostcode(e.target.value)}  type='number'></Form.Control>
            <Form.Label>
                <h3>
                    Country
                </h3>
            </Form.Label>
            <Form.Control value={country} placeholder='Country' style={{borderColor:'blue',marginBottom:'10px'}} onChange={e=>setcountry(e.target.value)}  type='text'></Form.Control>
            <Button onClick={handleclick}style={{backgroundColor:'green',width:'100px'}}>Continue</Button>
        </Form.Group>
    </Form>
    </Col>
    </Row>
    </Container>
    </>
  )
  
}

export default Shipping