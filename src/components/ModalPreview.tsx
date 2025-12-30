import React from 'react'
import './ModalPreview.css'
import PostReaction from './PostReaction'

interface MediaPreviewProps{
  contentPath: string,
  onClose: React.Dispatch<React.SetStateAction<string>>
}

const MediaPreview: React.FC<MediaPreviewProps> = ({contentPath, onClose}) => {

  return (
    <>
      <div className='overlay'>
        <div className='close-button' onClick={() => {onClose('')}}>閉じる</div>
        <img src={"/cf" + contentPath} className='image'></img>
        <PostReaction reactionTargetPath={contentPath} />
      </div>
    </>
  )
}

export default MediaPreview