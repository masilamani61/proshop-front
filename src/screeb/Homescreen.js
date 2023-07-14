import { Button, Col, Container, Pagination, Row } from "react-bootstrap"
import products from "../product"
import { useGetProductQuery } from "../slices/apislice"
import Productcard from "../componnents/product"
import { useEffect, useState } from "react" 
import axios from 'axios'
import { producturl } from "../constants"
import { useNavigate, useParams } from "react-router"
import { Link } from "react-router-dom"

function Homescreen(){
    const [product,setproduct]=useState([])
    const [pagelength,setpagelength]=useState()
    const {pagenumber}=useParams()
    const {keyword}=useParams()
    console.log(keyword)
    
     const navigate=useNavigate()

    useEffect(()=>{
        const fetch=async()=>{
        const res=await axios.get('https://proapi.onrender.com/api/product?pagenumber='+pagenumber+'&keyword='+keyword)
        console.log(res)
        setproduct(res.data.product1)
        setpagelength(res.data.pageno)
}
    fetch();
}  

,[pagenumber,keyword])
    const handleclick = (a)=>{
        if (a==0){
            if (pagenumber){
                var pagenum=parseInt(pagenumber)+1

            navigate('/page/'+pagenum)
            window.location.reload()

            }
            else{
                navigate('/page/2')
                window.location.reload()
            }

        }
        else {
            if (pagenumber){
                var pagenum=parseInt(pagenumber)-1
                navigate('/page/'+pagenum)
                window.location.reload()
            }
        }
    }


return (
        <>
        <h1>Latest Products</h1>
        <Row >
            {product.map((product)=>(
                
                <Col sm={12} lg={3} md={6}>
                <Productcard products={product}/>
                </Col>
            ))}
            
           
        </Row>
        <Pagination>
            <Container  >
                <Row><Col md={4}  >
                {[...Array(pagelength).keys()].map(x=>(
                    <Link to={`/page/${x+1}`} style={{textDecoration:'none',backgroundColor:'black',borderRightColor:'white',paddingRight:'13px',fontSize:'36px'}}>
                    {x+1}
                    </Link>
                ))}
                </Col></Row>
            </Container>
        </Pagination>
        </>
    )

}
export default Homescreen