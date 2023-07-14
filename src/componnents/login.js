import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Header from './header'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setcreadiantials } from '../slices/authslices'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
function Login() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [email,setemail]=useState('')
    const search=useLocation().search
    console.log(search.slice(2,))
       
    const [password,setpassword]=useState('')
    console.log(localStorage.getItem('userinfo'))
    const submithandler=async(e)=>{
         

        e.preventDefault()
        try{
            const res=await axios.post('https://proapi.onrender.com/api/user/login',{
                email,
                password
            })
            
            if (res.data){
                 
            dispatch(setcreadiantials(res.data))
           
            navigate("/"+search.slice(2,))}
        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <>
    <Header/>
    <Container>
        <Row className='justify-content-md-center'>
            <Col md={6}>
    <Form >
        <h1>Sign in</h1>
        <Form.Group className='py-3'>
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
        <Button type='submit' onClick={submithandler} className='my-3'>Login</Button>
        
    </Form>
    <Button><Link to='/register' className='text-white'>Register</Link></Button>
    </Col>
    </Row>
    </Container>
    </>
  )
}

export default Login