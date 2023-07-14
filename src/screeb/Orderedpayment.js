import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router'
import Header from '../componnents/header'
import { Col,Row, ListGroup,Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import{deletecart} from '../slices/catrslice'
import { FaOldRepublic, FaOpencart } from 'react-icons/fa'

function Orderedpayment(){
    const [details,setdetails]=useState()
    const navigate =useNavigate()
    const [user,setuser]=useState()
    const [get,setget]=useState(false)
    const {userinfo}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const {id}=useParams()
    useEffect(()=>{
        console.log('api')
        const fetch=async()=>{
            const res=await axios.get('https://proapi.onrender.com/api/order/'+id)
            setdetails(res.data)
          
            setget(true)
        } 
        fetch()
    },[id])
    useEffect(()=>{
        if (details){
        const fetch1=async()=>{
            const res2=await axios.get('https://proapi.onrender.com/api/user/'+details.userid)
            setuser(res2.data)
            console.log(res2)
        }
        fetch1()

        }
    },[details])
    const deliverclick=async()=>{
        const res=await axios.put('https://proapi.onrender.com/admin/'+details._id)
        setdetails(res.data)
        

    }
    const handleclick=()=>{
        navigate(`/payment/paypal/${id}/?price=${details.itemprice}`)
    
        
    }

   console.log(details)
  
  return ( 
    <>
    <Header/>
    <h1 className='mx-3' style={{alignItems:'center'}}><FaOldRepublic/>Order</h1> 
    {(get && user)? ( <Row>
        <Col md={7} className='my-3 mx-3'>
    <ListGroup>
        <ListGroup.Item>
            <h2>Shipping</h2>
        </ListGroup.Item>
        <ListGroup.Item>
            <h3>Name:<strong>{user.name}</strong></h3>
           
        </ListGroup.Item>
        <ListGroup.Item>
        <h3>Email:<strong>{user.email}</strong></h3>
          
        </ListGroup.Item>
        <ListGroup.Item>
            <h5>
            <strong>Address:</strong>
            {details && details.shippingaddress.Address},{details.shippingaddress.city},
            {details.shippingaddress.postcode}
            </h5>
        </ListGroup.Item>
        <ListGroup.Item className={`bg-${details.isdeliverd?'success':'danger'} bg-gradient my-1 text-center bg-opacity`} >
        <h3>{details.isdeliverd?'delivered':'not deliverd'}</h3>
        </ListGroup.Item>  
        
        <ListGroup.Item>
            <Row>
                <Col>
                <h4>
            <strong>Paymentstatus:</strong></h4></Col>
            <Col>
            <h4 className={`bg-${details.paymentresult?'success':'danger'} text-center`}>
            {details.paymentresult?'Paid':'Not paid'}</h4></Col>
            </Row>
        </ListGroup.Item>
    </ListGroup>
    </Col>
    <Col className='my-3 mx-3'>
    <Card>
        <h1>Summary</h1>
        <ListGroup>
            <ListGroup.Item>
                <h3>
                <strong>Total price:</strong>
                {details.itemprice}</h3>
            </ListGroup.Item>
        </ListGroup>

       {details.paymentresult?<h1 className='text-success'>Succesfully paid</h1>: <Button onClick={handleclick}>
            pay order
        </Button>}
        {userinfo.isadmin && (details.isdeliverd==false) && <Button onClick={deliverclick}>mark as deliver</Button>}
    </Card>
    </Col>
    </Row>):<h1>loading</h1>}
   
    </>
   )
}

export default Orderedpayment