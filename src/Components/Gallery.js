import React, { Component } from 'react';
//import the variable apiKey from config.js
import apiKey from '../config';

//import our Components to be displayed in this render
import Photo from './Photo';
import NotFound from './NotFound';
import Loading from './Loading';

//Extending the class Gallery 
class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      isLoading: true //default state: photos empty array, isLoading boolean true
    };
  }

  fetchPhotos = (query) => {
    //when loading the page, empty the state variables
    //so the render will show default state while the images load
    this.setState({ photos: [], isLoading: true });

    const uri = "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=yourkey&tags=searchterm&extras=url_o,url_z,url_c&per_page=24&page=1&format=json&nojsoncallback=1".replace("yourkey", apiKey).replace("searchterm", query);


    //http gets the URI or website , this will convert the response data to JSON,
    fetch(uri)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ photos: responseData.photos.photo, isLoading: false });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  //construct the photo URI for this particular JSON photo item: use the flickr format, display using the Photo Component
  mapJsonToPhotoComponents = (photo, i) => {
    let uri = '';
    
    uri = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
    return <Photo src={uri} key={i} />;
  }

  //when the Gallery component mounts (fully loads), run fetchPhotos to get the photos for params 'type'
  //type being the text in /gallery/:type
  componentDidMount() {
    this.fetchPhotos(this.props.match.params.type);
  }

  //if this page route has changed, fetch the photos for that new type
  componentDidUpdate(prevProps) {
    if (this.props.location.key !== prevProps.location.key) {
      this.fetchPhotos(this.props.match.params.type);
    }
  }

  render() {
    let images = [];
    let content = '';

    //if the photos aren't loading, display the name
    if (!this.state.isLoading) {
      content = "Displaying " + this.props.match.params.type;
    }
    //if the photos array has content display them
    if (this.state.photos.length > 0) {
      images = this.state.photos.map(this.mapJsonToPhotoComponents);
    }
    //if there are no photos in the array, and the isLoading is false, then this must be an empty search: load NotFound component
    else if (!this.state.isLoading) {
      images = <NotFound />;
    }
    //otherwise, display the generic Loading panel
    else {
      images = <Loading />;
    }
    //render the photo-container with the content and images variables within
    return <div className="photo-container"><h2>{content}</h2><ul>{images}</ul></div>;
  }
}

export default Gallery;