import React from 'react'

import { Link} from 'react-router-dom'
import {Typography,Card, CardContent,CardMedia} from '@mui/material'


import {demoThumbnailUrl,demoVideoUrl,} from '../utils/constants'
function VideoCard({video:{id:{videoId},snippet}}) {
   
  return (
      <Card sx={{width:{xs:'90vw', md: '18rem'}}} >
            <Link to={videoId?`/video/${videoId}`:demoVideoUrl}>
                <CardMedia 
                src={snippet?.thumbnails?.high?.url || demoThumbnailUrl}
                p={0}
                component='img'
                sx={{height:'15rem', width:{xs:'90vw', md: '20rem'},padding:0 }} />
            </Link>
            <CardContent sx={{backgroundColor:'#1e1e1e', height:'fitcontent', width:{xs:'90vw', md: '20rem'},minHeight:'5rem',justifyContent:'center'}}>
              <Link to={videoId?`/video/${videoId}`:demoVideoUrl}>
              <Typography color={'white'} variant='body1' > {snippet.title.slice(0,70)}</Typography>
              </Link>
              <Link to={snippet.channelId?`/channel/${snippet.channelId}`:demoVideoUrl}>
              <Typography color={'white'} variant='caption' > {snippet.channelTitle}</Typography>
              </Link>
            </CardContent>
          
        </Card>
  )
}

export default VideoCard
