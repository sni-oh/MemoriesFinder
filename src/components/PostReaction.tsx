import { useState, useEffect } from 'react';
import './PostReaction.css'
import React from 'react';

const REACTIONTYPE_LIKE = "Like"
const REACTIONTYPE_COMMENT = "Comment"

interface PostReactionProps{
  reactionTargetPath: string
}

const PostReaction: React.FC<PostReactionProps> = ({reactionTargetPath}) => {
  const [commentOpen, setCommentOpen] = useState(false)
  const [isLikeActive, setIsLikeActive] = useState(false)

  // リアクションをアップロードする
  const uploadReaction = (reactionType: string, path: string, message: string = "") => {

    if(isLikeActive){
      alert("すでにLikeされています")
      return;
    }

    fetch('/cf/main/api/postdata', {
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
        <div
          onClick={() => setCommentOpen(() => !commentOpen)}
          className='round_background'
        >💬</div>
        <p className='sample'>{commentOpen ? "OPEN" : "CLOSE"}</p>
      </div>
    </>
  )
}

export default PostReaction;