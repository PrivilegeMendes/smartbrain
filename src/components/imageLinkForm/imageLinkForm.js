import React from 'react';  
import './imageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonPress}) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will detect faces in your pictures. Git it a try!'}
            </p>
            {/* Input the image */}
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button 
                        className='w-30 grow ma2 f4 link ph2 pv2 dib white bg-light-purple' 
                        onClick={onButtonPress}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
        
    );
}

export default ImageLinkForm;