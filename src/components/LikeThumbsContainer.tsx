//import React, { useState } from 'react';
import type { FileInfo, FolderNode } from '../types/types';
import LikedThumbnail from './LikedThumbnail';
import './LikeThumbsContainer.css'

interface LikeThumbsContainerProps{
  onSelectImg: (path: string) => void,
  indexInfo: FolderNode
}

// Likeされたファイルを抽出する
const searchLikedNodeList = (node: FolderNode): FileInfo[] => {
  const ret: FileInfo[] = []
  for(const file of node.files){
    if(file.Reactions?.filter(r => r.reactionType ==='Like')?.length > 0){
      ret.push(file)
    }
  }
  for(const folder of node.childrenFolder){
    ret.push(...searchLikedNodeList(folder))
  }
  return ret
}

const LikeThumbsContainer: React.FC<LikeThumbsContainerProps> = ({indexInfo, onSelectImg}) => {
  //const [likedFileList, setLikedFileList] = useState<FileInfo[]>(searchLikedNodeList(indexInfo))
  const likedFileList = searchLikedNodeList(indexInfo)

  return (
    <>
      <div className='flexContainer'>
        {likedFileList.map(x => <LikedThumbnail key={x.fileName} file={x} onSelectImg={onSelectImg} />)}
      </div>
    </>
  )
}

export default LikeThumbsContainer;