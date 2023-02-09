
import { useRef } from 'react'
import './modal.css'

export const Modal = ({modal, setModal, title, children}) => {
  const overlay = useRef();

  const handleOverlay = (evt) => {
    if(evt.target == overlay.current){
      setModal(false)
    }
  }

  return (
    <div onClick={(evt) => handleOverlay(evt)} ref={overlay} className={`overlay ${modal ? 'open' : ''}`}>
      <div className="add-modal">
        <button onClick={() => setModal(false)} className="modal-btn btn btn-danger rounded-0">&times;</button>
        <div className="modal-header">
          <h3 className='mb-4'>{title}</h3>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  )
}