import React from 'react';

const Navigation = ({isSignedIn, onRouteChange}) => {
    if (isSignedIn) {
        return (
            <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('Signout')} className='f4 fw6 ph0 mh4 link dim black pa3 pointer'>
                Sign Out
            </p>
        </nav>
        );


    } else {
        return (
            <nav style ={{display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('Signin')} className='f4 fw6 ph0 mh4 link dim black pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('Register')} className='f4 fw6 ph0 mh4 link dim black pa3 pointer'>Register</p>
            </nav>
        );
    }

}

export default Navigation;