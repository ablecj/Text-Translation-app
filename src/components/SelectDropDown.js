import React from 'react'

const SelectDropDown = ({selectedLanguage, style, setShowModal}) => {
  return (
    <div className='select-drop-down' onClick={()=>setShowModal(style)}>
      <input value={selectedLanguage} />
      <div className="down-arrow">
      <svg
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M7 10l5 5 5-5z"></path>
        </svg>
      </div>
    </div>
  )
}

export default SelectDropDown
