import { useState } from 'react';
import type { FolderNode } from '../types/types';

interface HierarchViewProps{
  // この要素に関連づけられたノード
  node: FolderNode
  // この要素を含むパス
  path: string
  // 画像が選択された時に呼ばれる関数
  onSelectImg: React.Dispatch<React.SetStateAction<string>>
}

const HierarchView: React.FC<HierarchViewProps> = ({node, path, onSelectImg}) => {
  // クリックで画像を展開するためのState
  const [isOpen, setIsOpen] = useState(false);
  const isMonth = 1 <= Number(node.folderName) && Number(node.folderName) <= 12;

  node.childrenFolder.sort((a, b) => {
    const numa = Number(a.folderName);
    const numb = Number(b.folderName)
    return numa - numb;
  })

  // ルートのフォルダの場合のみデフォルトで表示する
  if(node.folderName === ""){
    return (
      <>
        <div onClick={() => setIsOpen(() => !isOpen)}>
          <p>{node.folderName}</p>
        </div>
        {node.childrenFolder && node.childrenFolder.map((child) => {
          return <HierarchView key={child.folderName} node={child} path={`${path}/${child.folderName}`} onSelectImg={onSelectImg}/>
        })}
      </>
    )
  }

  // ルート以外の場合は画像、フォルダの展開を抑え、クリック時に展開する
  return (
    <>
      <div onClick={() => setIsOpen(() => !isOpen)}>
        <p>{isMonth ? "　":""}{isOpen ? "▼ " : "▶︎ "}{node.folderName}{isMonth ? "月" : "年"}</p>
      </div>
      {isOpen && node.childrenFolder && node.childrenFolder.map((child) => {
        return <HierarchView key={child.folderName} node={child} path={`${path}/${child.folderName}`} onSelectImg={onSelectImg}/>
      })}
      {isOpen && node.files.map((imgName) => {
        return <img key={imgName} width='100px' src={`/cf/thumbnails${path}/${imgName}`} loading="lazy" onClick={() => onSelectImg(`${path}/${imgName}`)}></img>
      })}
    </>
  )
}

export default HierarchView;