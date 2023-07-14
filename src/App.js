import { Container } from "react-bootstrap";
import Header from "./componnents/header";
import Footer from "./componnents/footer";
import Homescreen from "./screeb/Homescreen";
import './App.css'
function App() {
  return (
    <>
      <Header/>
      <main className="py-3">
        <Container>
          <h1>welcome to Shopcart</h1>
          <Homescreen/>
        </Container>
        <Footer/>
      </main>
      </>
    
    
  );
}

export default App;
