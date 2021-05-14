import React from 'react';  
import './faceRecognition.css';


const FaceRecognition = ({box, imageUrl}) => {
    return (
        <div className='center pa5' >
            <div className='absolute mt2'>
                <img id='inputimage' alt={'face-detect'} 
                src={imageUrl} width='500px' height='auto'/>
                <div className='bounding-box' 
                style={{top: box.topRow, right: box.rightCol, left: box.leftCol, bottom: box.bottomRow}}></div>
            </div>
        </div>
        
    );
}

export default FaceRecognition;