import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Paper,IconButton} from '@mui/material'
import {SearchOff} from '@mui/icons-material'
function SearchBar() {
  const [searchTerm, setsearchTerm] = useState("")
  const navigate=useNavigate()
  function submithandler(e){

    
    e.preventDefault()
    if(searchTerm){
      navigate(`/search/${searchTerm}`)
        // setsearchTerm('')
      
    }

  }
  return (
   < Paper component="form" 
   onSubmit={submithandler}
    sx={{borderRadius: 20, 
        border:'1px solid red',
        pl:2,
        boxShadow:1,
        mr:{sm:5},
    }}>
    <input className='search-bar' type="text" placeholder="Search" sx={{border:'none',outline:'none',width:'100%'}}
    value={searchTerm}
    onChange={(e)=>{setsearchTerm(e.target.value)}}/>
    <IconButton type="submit" 
    sx={{p:'10px',color:'red'}}>
    <SearchOff/>
    </IconButton>
        </Paper>
  )
}

export default SearchBar
