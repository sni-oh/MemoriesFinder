import React from 'react'
import './ModalPreview.css'
import PostReaction from './PostReaction'
import type { FileInfo } from '../types/types'

interface MediaPreviewProps{
  contentPath: string,
  contentFile: FileInfo,
  onClose: (file: FileInfo | null, path: string) => void
}

const AccessPath = import.meta.env.VITE_API_BASE;

const MediaPreview: React.FC<MediaPreviewProps> = ({contentPath, contentFile, onClose}) => {

  return (
    <>
      <div className='overlay'>
        <div className='close-button' onClick={() => {onClose(null, '')}}>閉じる</div>
        {contentFile.fileType === "picture" ?
          <img src={AccessPath + "/pics" + contentPath} className='image' /> :
          <video src={AccessPath + "/pics" + contentPath} className='image' controls autoPlay/>}
        <PostReaction reactionTargetPath={contentPath} contentFile={contentFile}/>
      </div>
    </>
  )
}

export default MediaPreview