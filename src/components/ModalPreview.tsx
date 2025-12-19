import React from 'react'
import './ModalPreview.css'

interface MediaPreviewProps{
  contentPath: string,
  onClose: React.Dispatch<React.SetStateAction<string>>
}

const MediaPreview: React.FC<MediaPreviewProps> = ({contentPath, onClose}) => {

  return (
    <>
      <div className='overlay'>
        <div className='close-button' onClick={() => {onClose('')}}>閉じる</div>
        <img src={contentPath} className='image'></img>
      </div>
    </>
  )
}

export default MediaPreview