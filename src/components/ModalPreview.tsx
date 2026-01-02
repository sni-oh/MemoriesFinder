import React from 'react'
import './ModalPreview.css'
import PostReaction from './PostReaction'
import type { FileInfo } from '../types/types'

interface MediaPreviewProps{
  contentPath: string,
  contentFile: FileInfo,
  onClose: (path: string) => void,
  updateIndexInfo: (path: string, func: (f: FileInfo) => void) => void
}

const AccessPath = import.meta.env.VITE_API_BASE;

const MediaPreview: React.FC<MediaPreviewProps> = ({contentPath, contentFile, onClose, updateIndexInfo}) => {

  return (
    <>
      <div className='overlay'>
        <div className='close-button' onClick={() => {onClose('')}}>✕閉じる</div>
        {contentFile.fileType === "picture" ?
          <img src={AccessPath + "/pics" + contentPath} className='image' /> :
          <video src={AccessPath + "/pics" + contentPath} className='image' controls autoPlay/>}
        <PostReaction reactionTargetPath={contentPath} contentFile={contentFile} updateIndexInfo={updateIndexInfo}/>
      </div>
    </>
  )
}

export default MediaPreview