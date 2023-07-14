import React from 'react'
import {Row,Col, ListGroup,Image, Card, Button} from 'react-bootstrap'
import Header from '../componnents/header'
import Cartscreen from './Cartscreen'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router'

function Placeorder() {
    const navigate=useNavigate()
    const {userinfo} =useSelector((state)=>state.auth)
    const {shippinaddress,payment,cartitem,itemprice}=useSelector((state)=>state.cart)
    const handleclick=async()=>{
        try{
        const res=await axios.post('https://proapi.onrender.com/api/order',{
            orderitem:cartitem,
            itemprice,
            shippingaddress:shippinaddress,
            paymentmethod:payment,
            userid:userinfo._id
        })
        console.log(res)
        navigate(`/placeorder/${res.data._id}`)
        
    }
    catch{

    }
        
    }
  return (
    <>
    <Header/>
    <Row>
        <Col md={8}>
            <ListGroup>
                <ListGroup.Item>
                    <h1>Shipping</h1>
                    <p><strong>Shipping Address:</strong>{shippinaddress.Address},{shippinaddress.city},{shippinaddress.postcode}</p>

                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>paymentmethod :</strong>
                   {payment}
                </ListGroup.Item>
                <ListGroup.Item>
                    <strong>Items</strong>
                    { cartitem.map((cart)=>(
                    <Row>
                        <Col md={1} >
                        <Image src={cart.image} fluid/>
                        </Col>
                        <Col>
                        <p>{cart.name}</p>
                        </Col>
                        <Col><h3>{cart.price}</h3></Col>
                    </Row>))
}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup>
                    <ListGroup.Item>
                        <h1>Summary</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            <h3>Total price</h3>
                            </Col>
                            <Col>
                            <h3>
                            {itemprice}</h3>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button onClick={handleclick}>
                            Proceed
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  )
}

export default Placeorder