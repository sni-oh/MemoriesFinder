import { useState } from 'react';
import './PostReaction.css'
import React from 'react';
import type { FileInfo } from '../types/types';

const REACTIONTYPE_LIKE = "Like"
//const REACTIONTYPE_COMMENT = "Comment"

interface PostReactionProps{
  reactionTargetPath: string,
  contentFile: FileInfo
}

const AccessPath = import.meta.env.VITE_API_BASE;

const PostReaction: React.FC<PostReactionProps> = ({reactionTargetPath, contentFile}) => {
  const [isLikeActive, setIsLikeActive] = useState(contentFile.Reactions?.filter(x => x.reactionType === REACTIONTYPE_LIKE).length > 0)

  // リアクションをアップロードする
  const uploadReaction = (reactionType: string, path: string, message: string = "") => {

    if(isLikeActive){
      alert("すでにLikeされています")
      return;
    }

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
      console.log(res.body)
      if(res.status === 200){
        setIsLikeActive(true)
      }else{
        alert("通信に失敗しました。")
      }
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <>
      <div className='right_down_pos_flexbox'>
        <div 
          onClick={() => uploadReaction(REACTIONTYPE_LIKE, reactionTargetPath)}
          className='round_background'
        >{isLikeActive ? "❤️" : "🤍"}</div>
      </div>
    </>
  )
}

export default PostReaction;