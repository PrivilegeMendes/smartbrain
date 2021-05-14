import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/faceRecognition/faceRecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/rank';
import {particlesOptions} from './components/particles/particles';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';


import './App.css';


const app = new Clarifai.App({
  apiKey: '0fa7abea606d4bbf8f1ba8dc848326e8'
 });

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '', // This is what the user will input
      imageUrl: '',
      box: {},
      route: 'Signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
   const image = document.getElementById('inputimage');
   const width = Number(image.width);
   const height = Number(image.height);
    // console.log(clarifaiFace);
   return {
     leftCol: clarifaiFace.left_col * width,
     topRow: clarifaiFace.top_row * height,
     rightCol: width - (clarifaiFace.right_col * width),
     bottomRow: height - (clarifaiFace.bottom_row * height)
   }
  }

  displayFaceBox = (box) => {
    //console.log(box);
    this.setState({box: box});
  }

  // When we recieve an input, what do we want to do?
  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({input: event.target.value});
  }

  onRouteChange = (route, isSignedIn) => {
    if (route === 'Signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  // When detect button is pressed, what do we want to do?
  // update imager URl with the input and retrieve
  //https://www.byrdie.com/thmb/Jjj54SaUGDzwW7h5MxQI8hsNXnw=/1000x1000/filters:fill(auto,1)/Stocksy_txp67ff3d0fWrz200_Medium_3514532-crop-29154df0578b40309acce7c668e12faa.jpg
  onButtonPress = () => {
    // console.log('click');
    this.setState({imageUrl: this.state.input});
    // Face detection modele
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input) // ES6
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        // .then(response => console.log(response.outputs[0].data.regions[0].region_info.bounding_box))
        .catch(err => console.log(err));
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles' 
        params={particlesOptions} />
        <Navigation 
        isSignedIn={isSignedIn} 
        onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
              <Logo/>
              <Rank/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonPress={this.onButtonPress} />
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (this.state.route === 'Signin'
              ? <SignIn onRouteChange = {this.onRouteChange}/>
              : <Register onRouteChange = {this.onRouteChange}/>

            )
        }
      </div>
    );
  }
}

export default App;
