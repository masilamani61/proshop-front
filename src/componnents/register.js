import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Header from './header'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setcreadiantials } from '../slices/authslices'
import { useNavigate } from 'react-router'
function Register() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [confpass,setconfpass]=useState('')
    console.log(localStorage.getItem('userinfo'))
    const submithandler=async(e)=>{
        e.preventDefault()
        if (password==confpass){

        
        try{
            const res=await axios.post('https://proapi.onrender.com/api/user/register',{
                email,
                password,
                name
            })
            const data=res.data
            dispatch(setcreadiantials(data))
            navigate('/')
        }
        catch(err){
            console.log(err)
        }}
        else{
            
        }

    }
  return (
    <>
    <Header/>
    <Container>
        <Row className='justify-content-md-center'>
            <Col md={6}>
    <Form >
        <h1>Register</h1>
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
    </Row>
    </Container>
    </>
  )
}

export default Register