import React from 'react';

const Loader = () => {
    return (
        <div className="ui segment" style={{height: '400px'}}>
            <div className="ui inverted active dimmer">
                <div className="ui large text loader">Loading</div>
            </div>
            <p></p>
        </div>
    );
}

export default Loader;