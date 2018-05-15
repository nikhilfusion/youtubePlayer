import React from "react"
import Video_list_item from "./Video_list_item"

const Video_list = (props) => {

  const videoItems = props.videos.map( video => {
      return <Video_list_item
        onVideoSelect = {props.onVideoSelect}
        key = {video.etag}
        video = {video}
        addRemoveItem = {props.addRemoveItem}
        isPlayList = {props.isPlayList}
        />
  })

  return(
    <ul className='video-list list-group'>
      {videoItems}
    </ul>
  )
}

export default Video_list;
