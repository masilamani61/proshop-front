import React from 'react'
import Header from '../componnents/header'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { FaQuora, FaTrash } from 'react-icons/fa'
import { removefromcart } from '../slices/catrslice'

function Cartscreen() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {userinfo} =useSelector((state)=>state.auth)

    const {cartitem,itemprice}=useSelector((state)=>state.cart)
    const remove=(id)=>{
        dispatch(removefromcart(id))
    }
    const handleclick=()=>{
        if (userinfo){
            navigate('/shipping')
        }
        else{
            navigate('/login?/shipping')
        }

    }

    
  return (
    <>
    <Header/>
    {cartitem.length>0?
    (<Row className='py-3 px-5'>
        <Col md={7}>
            <ListGroup>
                {cartitem.map(item=>(
                    <ListGroup.Item>
                        <Row>
                            <Col sm={3} md={3}>
                            <Image src={item.image} fluid style={{objectFit:'cover',height:'20vh',width:'20vh'}}/>
                            </Col>
                            <Col md={4}>
                                <h3 className='text-success' style={{textAlign:'center',paddingTop:'10px',justifyContent:'center'}}>
                            <Link className='text-success' style={{textDecoration:'none'}} to={`/products/${item._id}`}>{item.name}</Link>
                            </h3>
                            </Col>
                            <Col md={4}>
                            <Row>
                                <Col sm md={6}>
                                <h3 style={{paddingTop:'10px'}}>
                                ${item.price}</h3>
                                </Col>
                               
                               
                                <Col md={4} className='px-4'>
                                <h3 style={{paddingTop:'8px',alignItems:'center'}}>
                                    <FaQuora/>
                                {item.quantity}</h3>
                                </Col>
                                <Col md={1}>
                                <Button className='bg-danger' style={{paddingTop:'10px'}} onClick={()=>remove(item._id)}>
                                    <FaTrash/>
                                </Button>

                                </Col>
                            </Row>
                            </Col>
                            
                            
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>

        </Col>
        <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h3>totalof ({cartitem.length}) items</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>total price is {itemprice}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Button onClick={handleclick} className='color-black bg-dark'>
                        proceed to checkout
                    </Button>
                </ListGroup.Item>
            </ListGroup>
            </Card>
        </Col>
    </Row>):<h3>your Cart  is empty<Link to='/'>goback</Link></h3>
}
    </>
  )
}

export default Cartscreen