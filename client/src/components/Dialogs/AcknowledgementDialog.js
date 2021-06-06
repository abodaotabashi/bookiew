import React from 'react';
import { Dialog, DialogTitle, DialogContent }  from '@material-ui/core';

import './Dialogs.css';
import { FaCheck } from 'react-icons/fa'

const AcknowledgementDialog = (props) => {
  const {title, content, contentSpan, openAckDialog, ok, okFunction} = props;

  let spanDiv = null;
  if(typeof(contentSpan) !== 'undefined'){
    spanDiv = (<p className='dialogContentSpan'>{contentSpan}</p>);
  }
  let titleDiv = null;
  if(typeof(title) !== 'undefined'){
    titleDiv = ( <DialogTitle>
                  <div className='dialogTitle'>
                    {title}
                  </div>
                </DialogTitle>);
  }

  return (
    <Dialog open={openAckDialog} maxWidth='md'>
      {titleDiv}
      <DialogContent>
        <div className='dialogAckContainer'>
          <div className='dialogAckWrapper'>
            <div className='dialogAckTickWrapper'>
              <div className='dialogAckTick'>
              <FaCheck  
                      color="#209915cc" 
                      size={64}/>
              </div>
            </div>
            <div className='dialogAckContentWrapper'>
              <p className='dialogContentText'>{content}</p>
              {spanDiv}
            </div>
          </div>
          <div className='dialogOkButtonsWrapper'>
            <button className='dialogOkButton' onClick={okFunction}>{ok}</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AcknowledgementDialog;
