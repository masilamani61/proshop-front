import {Badge, Container, InputGroup, Nav, NavDropdown, NavLink, Navbar, NavbarBrand} from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import {FaPaintBrush, FaSearch, FaShoppingCart,} from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router';
import {logout} from '../slices/authslices'

import { Link } from 'react-router-dom';
import Search from './search';

function Header(){
    const {cartitem}=useSelector((state)=>state.cart)
    const {userinfo}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const logoutclick=async()=>{
        

        dispatch(logout({}))
        navigate('/login')

    }
    
    return (
        <header>
            <Navbar bg='dark' expand='md' collapseOnSelect>
                <Container className='text-white'>
                    <NavbarBrand className='text-white'><FaPaintBrush style={{cursor:'pointer',fontSize:'30px'}} onClick={()=>navigate('/')}/> Shopcart</NavbarBrand>
                    <NavbarToggle style={{backgroundColor:'white'}} arials-aria-controls='navbar-id'/>
                    <Navbar.Collapse id='navbar-id'>
                        <Nav className='ms-auto'  >
                            <Search />
                            <NavLink href='/cart' style={{width:'100px',color:'white',fontSize:'20px'}} ><FaShoppingCart/>cart
                            { cartitem.length>0 &&                   <Badge pill>{cartitem.reduce((a,c)=>a+Number(c.quantity),0)}</Badge>}</NavLink>
                            {userinfo?(<NavDropdown  style={{backgroundColor:'gray',color:'green',fontSize:'19px',borderRadius:'5px',marginRight:'10px'}}  title={userinfo.name} id='username'>
                            
                             <NavDropdown.Item>
                                <Link style={{textDecoration:'none',fontSize:'17px'}} to='/profile'>profile</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item style={{textDecoration:'none',fontSize:'17px'}} onClick={logoutclick}>
                                logout
                            </NavDropdown.Item>
                           </NavDropdown>): <NavLink className='text-white'><Link to='/login' style={{textDecoration:'none',fontSize:'17px'}}>Sign in</Link></NavLink>}
                           {userinfo && userinfo.isadmin &&<NavDropdown title='admin' style={{backgroundColor:'green',color:'black',fontSize:'18px',borderRadius:'5px',marginRight:'10px'}} className='bg-white border-1px-solid-black'>
                            <NavDropdown.Item  className='items'>
                                <Link style={{textDecoration:'none',fontSize:'17px'}} to='/allorders'>orders</Link>
                            </NavDropdown.Item>
                            <NavDropdown.Item >
                                <Link style={{textDecoration:'none',fontSize:'17px'}} to='/productlist'>products</Link>
                            </NavDropdown.Item>

                           </NavDropdown>}
                         
                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
        
        </header>

    )
}
export default Header