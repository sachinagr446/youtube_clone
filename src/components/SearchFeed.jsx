import React from 'react'
import {useState,useEffect} from 'react'
import {Box, Stack, Typography} from '@mui/material';
import axios from 'axios';
import VideoCard from './VideoCard';
import { useParams } from 'react-router-dom'; 
function SearchFeed() {

  const [video, setvideo] = useState([])
  const {searchTerm} = useParams()

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
  const fetchData = async(url)=>{
    try {
        const response = await axios.get(`${options.url}${url}`,options);
        
        return response.data;     
    } catch (error) {
        console.error(error);
    }
}
useEffect(()=>{
    fetchData(`?part=snippet%2Cid&q=${searchTerm}`)
    .then(data=>setvideo(data.items))
},[searchTerm])
  return (
    <>
    <Typography variant='h4' fontWeight="bold"
            mb={2} sx={{color:'white', marginLeft:'5px'}} >
            <span className='category'>Showing search result for:</span>
              <span className='color' >{searchTerm}</span>
            
            </Typography>
    <Stack sx={{color:'white',justifyContent:{md:'flex-start'},  }} flexDirection={'row'} flexWrap={'wrap'} 
           justifyContent={'center'} gap={3}>
            {video.map((video,index)=>{
              return  <Box key={index}>            
                  {video.id.videoId && <VideoCard video={video}/>}
                  

              </Box>
            })}

           </Stack>
           </>
  )
}

export default SearchFeed

