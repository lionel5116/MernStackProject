import React from 'react'
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

function SideDrawer(props) {
    const content = 
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames='slide-in-left'
      mountOnEnter
      unmountOnExit
      >
    <aside className='side-drawer'
       onClick={props.onClick}>
         {props.children}
         
    </aside>
    </CSSTransition>

  //refer to Lesson 48 about using Portals, this is not necessary to know, but it is good for edification
  return ReactDOM.createPortal(content,document.getElementById('drawer-hook'))
}

export default SideDrawer