import React from 'react'
import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { logo } from '../utils/constants'
import SearchBar from './SearchBar'
function Navbar() {
  return (
    
      <Stack direction="row"
       p={2}
        alignItems="center"
         sx={{position:'sticky',background:'#000', top:0, justifyContent:'space-between' }} >
            <Link to='/' style={{display:'flex', alignItems:'center'}}>
            <img src={logo} alt="logo" style={{marginLeft:''}}  height={40}/>
            </Link>
            <SearchBar/>
        </Stack>
    
  )
}

export default Navbar
