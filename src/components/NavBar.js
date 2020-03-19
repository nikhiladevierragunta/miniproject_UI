import React from 'react';

const NavBar = () => {
    return (
        <div className="ui blue inverted menu" style={{borderRadius:0, marginBottom: 0}}>
            {/* eslint-disable-next-line */}
            <a className="item active" href="#">
                Home
            </a>
        </div>
    );
}

export default NavBar;