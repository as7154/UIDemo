import React from 'react'
import ReactDom from 'react-dom'
import './ResultModal.css'

export default function ResultModal({open, onClose}) {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
        <div className="overlay-layout" />
        <div className="modal-layout">
            <button onClick={onClose}> CLOSE</button>
            <div>HELLO</div>
        </div>
    </>,
    document.getElementById('portal')
  )
}
