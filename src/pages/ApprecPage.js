import React from 'react';
// import classes from './A';
import './Apprec.module.css'; 

const Apprec = ({isOpen, setOpen}) => {

  const handleClose = () => {
    setOpen(false);
  }
  return (
    <>
      {isOpen && (
        <div className="apprec-container">
        <p style={{textAlign:'right'}} onClick={handleClose}>X</p>
        <h2 className="apprec-heading">Thank you for your purchase! ;) </h2>
        </div>
      )}
    </>
    
  );
};

export default Apprec;
