import type { FolderNode } from '../types/types';

interface HierarchViewProps{
  // この要素に関連づけられたノード
  node: FolderNode
  // この要素を含むパス
  path: string
}

const HierarchView: React.FC<HierarchViewProps> = ({node, path}) => {

  node.childrenFolder.sort((a, b) => {
    const numa = Number(a.folderName);
    const numb = Number(b.folderName)
    return numa - numb;
  })

  return (
    <>
      <p>{path}</p>
      {node.childrenFolder && node.childrenFolder.map((child) => {
        return <HierarchView key={child.folderName} node={child} path={`${path}/${child.folderName}`}/>
      })}
      {node.files.map((imgName) => {
        return (
          <>
            <img width='200px' src={`${path}/${imgName}`} loading="lazy"></img>
          </>
        )
      })}
    </>
  )
}

export default HierarchView;