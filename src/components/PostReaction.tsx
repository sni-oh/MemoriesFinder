import { useState } from 'react';
import './PostReaction.css'
import React from 'react';
import type { FileInfo, Reaction } from '../types/types';

const REACTIONTYPE_LIKE = "Like"
//const REACTIONTYPE_COMMENT = "Comment"

interface PostReactionProps{
  reactionTargetPath: string,
  contentFile: FileInfo,
  updateIndexInfo: (path: string, func: (f: FileInfo) => void) => void
}

const AccessPath = import.meta.env.VITE_API_BASE;

const PostReaction: React.FC<PostReactionProps> = ({reactionTargetPath, contentFile, updateIndexInfo}) => {
  const [isLikeActive, setIsLikeActive] = useState(contentFile.Reactions?.filter(x => x.reactionType === REACTIONTYPE_LIKE).length > 0)

  // リアクションをアップロードする
  const uploadReaction = (reactionType: string, path: string, message: string = "") => {

    if(isLikeActive){
      alert("すでにLikeされています")
      return;
    }

    setIsLikeActive(true)
    

    fetch(`${AccessPath}/main/api/postdata`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: 
      JSON.stringify({
        content: message, 
        reactionType: reactionType,
        user: "",
        target: path
      })
    })
    .then(res => {
      if(res.status === 200){
        updateIndexInfo(path, (x) => {
          const emptyReaction: Reaction = {
            reactionType: 'Like',
            content: '',
            id: '',
            user: '',
            target: path,
            uploadDate: ''
          };
          (x['Reactions'] ||= [emptyReaction]).push(emptyReaction)
        })
      }else{
        alert("通信に失敗しました。")
        setIsLikeActive(false)
      }
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <div className={`right_down_pos_flexbox`}>
        <div 
          onClick={() => uploadReaction(REACTIONTYPE_LIKE, reactionTargetPath)}
          className={`round_background  ${isLikeActive && 'background_pink'}`}
        >{isLikeActive ? "❤️" : "🤍"}</div>
      </div>
    </>
  )
}

export default PostReaction;