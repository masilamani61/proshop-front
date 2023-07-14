import { Col, Container, Row } from "react-bootstrap"
import { FaAd } from "react-icons/fa"

function Footer(){
    let currentyear=new Date().getFullYear()
    return (
        <>
        <footer>
            <Container className="">
                <Row>
                    <Col className="text-center py-3">
                    <p><FaAd/>Shopcart &copy;{currentyear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
        </>

    )
}
export default Footer