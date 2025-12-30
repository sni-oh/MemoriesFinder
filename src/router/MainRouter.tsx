import React, { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import ModalPreview from "../components/ModalPreview";
import type { FolderNode, Reaction } from '../types/types';
import HierarchView from "../components/HierarchyView";

// 開発用パス
const AccessPath = "/cf";

// フェッチを実行して結果を返却する
const fetchIndex = async ()  => {
  const res = await fetch(AccessPath + '/index.json');

  if(res.status === 200){
    return await res.json()
  }else{
    console.log("http error!! status: " + res.status)
    return null
  }
}

const fetchReactions = async () => {
  const res = await fetch(AccessPath + '/reactions.json')
  if(res.status === 200){
    return await res.json()
  }else{
    console.log("http error!! status: " + res.status)
    return null
  }
}

const pushReaction = (target: FolderNode, reaction: Reaction, path: string[]) => {
  
}

const MainRouter: React.FC = () => {
  const [indexInfo, setIndexInfo] = useState<FolderNode>();
  const [previewPath, setPreviewPath] = useState<string>("");
  // 0:通常　1:戻るボタン有効?
  const [headerState, setHeaderState] = useState(0);

  useEffect(() => {
    fetchIndex()
      .then(res => {
        fetchReactions()
          .then(reactionRes => {
            const reactions = reactionRes as Reaction[];
            const base = JSON.parse(JSON.stringify(res)) as FolderNode;

            for(let i=0; i<reactions.length; i++){
              const path = reactions[i].target.split("/")
              const item = base.childrenFolder.find(x => x.folderName === path[1])
              ?.childrenFolder.find(x => x.folderName === path[2])
              ?.files.find((x => x.fileName === path[3]));

              if(item){
                if(item.Reactions){
                  item.Reactions.push(reactions[i])
                }else{
                  item.Reactions = [reactions[i]]
                }
              }
            }
            console.log(base)

            setIndexInfo(base);
          })
      })
      .catch(e => console.log("error:" + e));
  },[]);

  return (
    <>
      <div>
        <MainHeader headerState={headerState}/>
      </div>
      <div>
        {indexInfo && <HierarchView key={"root"} node={indexInfo as FolderNode} path={""} onSelectImg={setPreviewPath}/>}
      </div>
      {previewPath && <ModalPreview contentPath={previewPath} onClose={setPreviewPath}/>}
      
    </>
  )
}

export default MainRouter;