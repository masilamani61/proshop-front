import { Card ,Image} from "react-bootstrap"
import Rating from "./rating "

function Productcard({products}){
    return (<>
    <Card className="my-3 p-3  rounded" fluid>
        <a href={`/products/${products._id}`}>
            <Card.Img src={products.image} style={{objectFit:"cover",height:'30vh'}}/>
        </a>
      
      
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