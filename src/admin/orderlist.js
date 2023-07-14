import React, { useEffect, useState } from 'react'
import Header from '../componnents/header'
import { Col, Row, Table } from 'react-bootstrap'
import axios from 'axios'
import { isAsyncThunkAction } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'

function Adminorders() {
    const [orders,setorders]=useState()
    useEffect(()=>{
        const fetch=async()=>{
            const res=await axios.get('https://proapi.onrender.com/admin/orders')
            setorders(res.data)

        }
        fetch()
    },[])
    console.log(orders)
  return (
    <>
    <Header/>
    <Row className='justify-content-md-center'>
        <Col sm={3} md={10}>
    <Table className='my-3 mx-4'>
        <thead>
            <tr>
                <th>Id</th>
                <th>user</th>
                <th>total</th>
                <th>paid</th>
                <th>delivered</th>
                <th></th>
            </tr>
            {orders && orders.map(order=>(
                <tr>
                    <td>{order._id}</td>
                    <td>{order.userid}</td>
                    <td>{order.itemprice}</td>
                    <td>{order.paymentresult?'paid':'Not paid'}</td>
                    <td>{order.isdeliverd?'deliverd':'not deliverd'}</td>
                    <td><Link to={`/placeorder/${order._id}`}>details</Link></td>

                </tr>
            ))}
        </thead>
    </Table>
    </Col>
    </Row>
    </>
  )
}

export default Adminorders