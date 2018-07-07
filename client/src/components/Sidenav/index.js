import React from 'react';
import ReactSideNav from 'react-simple-sidenav';

const Sidenav = (props) => {
    return (
       <ReactSideNav
            showNav={props.showNav}
            onHideNav={props.onHideNav}
            navStyle={{
                background:'#242424',
                maxWidth:'220px'
            }}
       >
           <div>Item 1</div>
           <div>Item 2</div>
           <div>Item 3</div>
           <div>Item 4</div>
           <div>Item 5</div>
           <div>Item 6</div>
           <div>Item 7</div>
        </ReactSideNav>
    );
};

export default Sidenav;