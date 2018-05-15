import React, { Component } from "react"
import ReactDOM from "react-dom"
//import lodah
import _ from "lodash"

import YTSearch from 'youtube-api-search'

import Search_bar from "./components/Search_bar"
import Video_list from "./components/Video_list"
import Video_detail from "./components/Video_detail"

//variable to hold the API Key
const API_KEY = 'AIzaSyBYf1d1OI9RrbBZ8ox-HppCUqyndH8herc';

// Create a new component
// This component should create some html
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
  }

  videoSearch(searchTerm) {
    //youtube search
    YTSearch({key: API_KEY, term:searchTerm}, (videos) => {
      this.setState({
        videos:videos,
        selectedVideo: videos[0]
       });
    });

  }

  render(){
    const videoSearch = _.debounce( (term) => {this.videoSearch(term)},400)
      return (<div>
            <Search_bar onSearchTermChange={videoSearch} videos={this.state.videos} />
          </div>
        )
  }
}

// Take this  component's generated HTML and render it on the page (In the DOM)
ReactDOM.render(<App />, document.querySelector('.container'))
