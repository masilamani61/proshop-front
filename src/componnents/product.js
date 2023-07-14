import { Card ,Image} from "react-bootstrap"
import Rating from "./rating "
import {Link} from 'react-router-dom'

function Productcard({products}){
    return (<>
    <Card className="my-3 p-3  rounded" fluid>
        <Link to={`products/${products._id}`}>
            <Card.Img src={products.image} style={{objectFit:"cover",height:'30vh'}}/>
    </Link>
      
      
        <Card.Body>
        <Card.Title className="product-title">
            {products.name}
            </Card.Title>
            <Rating value={products.rating} />
    
            <Card.Text as="h3">
                {products.price}
            </Card.Text>
           
               </Card.Body>
    </Card>

    </>)
}
export default Productcard
