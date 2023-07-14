import React, { useState } from 'react'
import { Button,Row, Col, Form } from 'react-bootstrap'
import Header from './header'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {paymentmethod} from '../slices/catrslice'

function Payment() {
    const [payment,setpayment]=useState('paypal')
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleclick=()=>{
        dispatch(paymentmethod(payment))
        navigate('/placeorder')

    }
  return (
    <>
    <Header/>
    <Row className='justify-content-md-center'>
        <Col md={6}  >
    <Form>
        <h1>Paymentmethod</h1>
        <Form.Group>
            <Form.Label>Selectmethod</Form.Label>
        
        <Col>
        <Form.Check className='my-3' onChange={e=>setpayment(e.target.value)} value={payment}  label='paypal or credit card' type='radio' id='paypal' name='payment method'>

        </Form.Check>
        </Col>
        </Form.Group>
        <Button onClick={handleclick}>
            Continue
        </Button>
    </Form>
    </Col>
    </Row>
    </>
  )
}

export default Payment