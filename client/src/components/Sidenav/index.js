import React from 'react';
import ReactSideNav from 'react-simple-sidenav';

import { items } from './items';
import SidenavItem from './../../containers/SidenavItem/index';

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
            {
                items.map((item, i) =>
                    <div key={i} onClick={props.onHideNav}>
                        <SidenavItem item={item} />
                    </div>
                )
            }
        </ReactSideNav>
    );
};

export default Sidenav;