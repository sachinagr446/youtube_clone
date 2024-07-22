import React, { useCallback } from 'react'
import {useState,useEffect} from 'react'
import {Box, Stack, Typography} from '@mui/material';
import SideBar from './SideBar';
import axios from 'axios';
import VideoCard from './VideoCard';

function Feed() {
  const [selectedCategory, setselectedCategory] = useState("New")
  const [video, setvideo] = useState([])
  const options = {
  
    url: 'https://youtube-v31.p.rapidapi.com/search',
    params: {
      // relatedToVideoId: '7ghhRHRP6t4',
      // part: 'id,snippet',
      // type: 'video',
      maxResults: '50'
    },
    headers: {
      'x-rapidapi-key': process.env.REACT_APP_YOUTUBE_API_KEY,
      'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
    }
  };
  const fetchData =  useCallback(async(url)=>{
    try {
        const response = await axios.get(`${options.url}${url}`,options);
        
        return response.data;     
    } catch (error) {
        console.error(error);
    }
},[selectedCategory])
useEffect(()=>{
    fetchData(`?q=${selectedCategory}&part=snippet%2Cid`)
    .then(data=>setvideo(data.items))
},[selectedCategory,fetchData])
  return (
    <Stack className='slideup' sx={{flexDirection:{sx:'column',md:'row'}}}>
        <Box sx={{height:{sx:'12px', md:'auto',flexDirection:{sx:'column',md:'row'}}, borderRight:'1px solid red', px:{sx:0, md:2},
     overflow:'auto',minWidth:'12rem', }}>
            <SideBar 
            selectedCategory={selectedCategory}
            setselectedCategory={setselectedCategory}
            /> <Typography className='copyright' variant="body2" style={{color:'white'}}>Copyright 2024 </Typography>
        </Box>
        <Box p={2} >
            <Typography variant='h4' fontWeight="bold"
            mb={2} sx={{color:'white'}} >
              <span className='category' >{selectedCategory}</span>
            <span className='color'>videos</span>
            </Typography>
           <Stack sx={{color:'white', marginLeft:'5px' }} flexDirection={'row'} flexWrap={'wrap'} 
           justifyContent={'center'} gap={3}>
            {video.map((video,index)=>{
              return  <Box key={index} justifyContent={'center'} >            
                  {video.id.videoId && <VideoCard video={video}/>}
                  

              </Box>
            })}

           </Stack>
        </Box>
    </Stack>
  )
}

export default Feed
