import React from 'react';
import { Dialog, DialogTitle, DialogContent }  from '@material-ui/core';

import './Dialogs.css';
import { FaTimesCircle } from 'react-icons/fa';

const WarningDialog = (props) => {
  const {title, content, contentSpan, openWarningDialog, yes, no, yesFunction, noFunction} = props;

  let spanDiv = null;
  if(typeof(contentSpan) !== 'undefined'){
    spanDiv = (<p className='dialogContentSpan'>{contentSpan}</p>);
  }
  
  return (
    <Dialog open={openWarningDialog} maxWidth='md'>
      <DialogTitle>
        <div className='dialogTitle'>
          {title}
        </div>
      </DialogTitle>
      <DialogContent>
        <div className='dialogContainer'>
          <div className='dialogWrapper'>
            <FaTimesCircle className='dialogContentIcon' size={82} color='#df3630e6'/>
            <div className='dialogContentWrapper'>
              <p className='dialogContentText'>{content}</p>
              {spanDiv}
            </div>
          </div>
          <div className='dialogButtonsWrapper'>
            <button className='dialogCancelButton' onClick={noFunction}>{no}</button>
            <button className='dialogDeleteButton' onClick={yesFunction}>{yes}</button>
          </div>
        </div>
        
      </DialogContent>
    </Dialog>
  );
}

export default WarningDialog;
