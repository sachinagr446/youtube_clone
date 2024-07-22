import React, { useCallback } from 'react'
import {useParams,} from 'react-router-dom'
import ReactPlayer from 'react-player'
import { useEffect,useState } from 'react'
import { Typography,Box,Stack } from '@mui/material'

import VideoCard from './VideoCard'
import axios from 'axios'
function VideoDetail() {

  const [VideoDetail, setVideoDetail] = useState([])
  const [Videos, setVideos] = useState([])
  const {id} = useParams()
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Toggle function
  const toggleDropdown = useCallback(() => {
    // If the clicked dropdown is already active, set it to null to close it. Otherwise, open the clicked dropdown.
    setActiveDropdown(activeDropdown  ? null : 1);
  },[activeDropdown]);
  const options = {
  
    url: 'https://youtube-v31.p.rapidapi.com/',
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
  const fetchData = useCallback(async(url)=>{
    try {
        const response = await axios.get(`${options.url}${url}`,options);
        
        return response.data;     
    } catch (error) {
        console.error(error);
    }
},[id])
  useEffect(()=>{
    fetchData(`videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`)
    .then(data=>setVideoDetail(data.items[0]))
    fetchData(`search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=50`)
    .then(data=>setVideos(data.items))
  },[id,fetchData])
  
  if(!VideoDetail) return <Typography variant='h4' fontWeight="bold" mb={2} sx={{color:'white'}} >
            <span className='category' >Loading</span>  
            </Typography>
  return (
   <Box minHeight="100vh">
     <Stack direction={{xs:'column', md:'row'}} >
      <Box >
        <Box sx={{width:'100%', top:'86px'}}>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}  className="react-player" controls/>
        </Box>
        <Box  p={2}>
          <Typography variant='h6' fontWeight="bold" mb={2} sx={{color:'white'}} >
            <span className='category' >{VideoDetail.snippet?.title}</span>
            <span className='color'>videos</span>
          </Typography>
            <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between', alignItems:'center'} }>
            <Typography color={'white'}>
            {VideoDetail.snippet?.channelTitle}
          </Typography>
          <Box sx={{marginRight:'10px', flexDirection:'row'}}>
             <Typography color={'white'}>{parseInt(VideoDetail.statistics?.viewCount).toLocaleString()} views</Typography>
          <Typography color={'white'}>{parseInt(VideoDetail.statistics?.likeCount).toLocaleString()} likes</Typography>
          </Box>
            </Box>
         
            <button className="des-btn" onClick={() => toggleDropdown()}>
              {activeDropdown  ? 'Hide Description' : 'Show Description'}
            </button ><div className='dropdown-arrow'></div>
            {/* Conditionally render the description */}
            {activeDropdown && (
              <Box color={'white'}>
                {/* Render the video description here */}
                <p>{VideoDetail?.snippet?.description}</p>
              </Box>
            )}

      </Box>
      </Box>
      <Box width={'max-content'}  px={4} justifyContent={'center'} alignItems={'center'} gap={2} sx={{minWidth:'max-content',height:'100vh',overflowY:'auto', }} >
      {Videos.map((video,index)=>{
              return  <Box key={index} width={'min-content'}>            
                  {video.id.videoId && <VideoCard video={video}/>}
              </Box>
            })}
      </Box>
      </Stack>
   </Box>
  )
}

export default VideoDetail
