import React from 'react'
import { Stack, Typography} from '@mui/material';   
import { categories } from '../utils/constants';
function SideBar({selectedCategory, setselectedCategory}) {
 
  return (
    <Stack direction="row" sx={{overflow:"auto",
        height:{sx:'auto', md:'92vh'},
        flexDirection:{md:'column',
          minWidth:{md:'200px'}
        },
    }}>
        {categories.map((category,index)=>(
           <button className='category-btn'
           style={{backgroundColor:category.name===selectedCategory?'#FC1503':'',color:'#fff'}}
           key={index}
           onClick={()=> setselectedCategory(category.name)}
           >
            <span className='flex' style={{marginRight:'6px',color:category.name===selectedCategory?'white':'red'}}>{category.icon}</span>
            {/* <span>{category.name}</span> */}
          <span style={{width:'max-content'}}><Typography variant="h6" sx={{overflow:"hidden"}}>{category.name}</Typography></span>
           </button>
        ))}
        </Stack>

  )
}

export default SideBar

