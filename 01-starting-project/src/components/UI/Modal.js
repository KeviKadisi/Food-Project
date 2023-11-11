import React from "react";
import classes from './Modal.module.css';
import RectDom from 'react-dom';

const Backdrop= (props) =>{
    return <div onClick={props.onClick} className={classes.backdrop}  />
};

const ModalOverlay= props =>{
    return (
         <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
    );
};

const portalElement= document.getElementById('overlays');

const Modal= (props)=>{
    return <React.Fragment>
       {RectDom.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
       {RectDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement )}
    </React.Fragment>
};
export default Modal;