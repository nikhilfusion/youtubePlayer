import React from "react"
import {reactLocalStorage} from 'reactjs-localstorage';

const Video_list_item = ( { video, onVideoSelect, addRemoveItem, isPlayList } ) => {

  const imageUrl = video.snippet.thumbnails.default.url;
  const localDt = reactLocalStorage.get('youtubeData');
  const localItems = localDt && JSON.parse(localDt);
  const isExist = localItems && localItems.length > 0 && localItems.findIndex(item => video.etag === item.etag) > -1
  return (
        <li className="list-group-item" onClick={ (e) => onVideoSelect(video)} >
            <div className="item-container">
                <div className="item-left">
                    <div className="img-container">
                        <img src={imageUrl} />
                    </div>
                    <div className="description">{video.snippet.description.substr(0, 60)}</div>
                </div>
                <div className="item-right">
                    <span>{video.snippet.title}</span>
                    {!isPlayList && <button className="addRemoveBtn" onClick = { (e) => { addRemoveItem(video), e.stopPropagation() }}>{isExist ? 'Remove' : 'Add'}</button>}
                </div>
            </div>
        </li>
    )
}

export default Video_list_item;
