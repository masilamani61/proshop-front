import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'

function Search() {
    const [keyword,setkeyword]=useState()
    const navigate=useNavigate()
    const handleclick=()=>{
        if (keyword){
        
        navigate(`/search/${keyword}`)
        }
        else{
            navigate('/')
        }
        
    }
  return (
    <Form style={{display:'flex',height:'45px'}}>
    <Form.Control style={{marginRight:'10px',borderColor:'blue'}} placeholder='search product' onChange={e=>setkeyword(e.target.value)}>

    </Form.Control>
    <Button  onClick={handleclick}>submit</Button>
    </Form>
  )
}

export default Search