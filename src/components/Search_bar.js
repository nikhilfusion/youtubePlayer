import React, { Component } from "react";
import {reactLocalStorage} from 'reactjs-localstorage';
import Video_list from "./Video_list"

export default class Search_bar extends Component{
  constructor(props){
    super(props);
    this.state = {
      term:'',
      playlistItem: reactLocalStorage.get('youtubeData') && JSON.parse(reactLocalStorage.get('youtubeData')),
      selectedVideo: '',
      showIframe: false
    }
  }
  render(){
    const  {
      playlistItem,
      selectedVideo,
      showIframe
    } = this.state;
    const videoURL = selectedVideo && selectedVideo.id.videoId && `https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`
    return(
      <div className="search-bar">
        <div className="search-header">
          <div className="searchInner">
            <input
              className = "search-term"
              value = {this.state.term}
              onChange = { (event) => this.onInputChange(event.target.value)}
              placeholder="type something"
              onFocus = {() => {this.setState({ showIframe: false })}}
            />
            {
              !showIframe &&
              <div className="search-list">
                <Video_list
                  onVideoSelect={selectedVideo => this.setState({ selectedVideo, showIframe: true })}
                  addRemoveItem={selectedVideo => this.addRemoveItem(selectedVideo)}
                  videos={this.props.videos} />
              </div>
            }
            {
              showIframe && videoURL &&
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className = "embed-responsive-item" src={videoURL}></iframe>
              </div>
            }
          </div>
          <button className="SearchBtn">Search</button>
        </div>
        {
          playlistItem && playlistItem.length > 0 &&
          <div className="playlist-container">
            <h4 className="my-playlist">My PlayList</h4>
              <Video_list
                videos={playlistItem}
                isPlayList="true"
                />
        </div>
        }
      </div>
    );
  }

  onInputChange(term) {
      this.setState({ term });
      if (term.length > 3) {
        this.props.onSearchTermChange(term);
      }
  }
  addRemoveItem(video) {
    const localDt = reactLocalStorage.get('youtubeData');
    const ytData = (localDt && JSON.parse(localDt)) || [];
    if(ytData.length === 0) {
      const videos = [];
      videos.push(video);
      reactLocalStorage.set('youtubeData', JSON.stringify(videos));
    } else {
      const vidIndex = ytData.findIndex(item => item.etag === video.etag);
      if(vidIndex > -1) {
        ytData.splice(vidIndex, 1);
      } else {
        ytData.push(video);
      }
      reactLocalStorage.set('youtubeData', JSON.stringify(ytData));
    }
    this.setState({ playlistItem: JSON.parse(reactLocalStorage.get('youtubeData'))})
  }
}
