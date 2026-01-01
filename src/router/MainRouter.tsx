import React, { useEffect, useState } from "react";
import MainHeader from "../components/MainHeader";
import ModalPreview from "../components/ModalPreview";
import type { FolderNode, Reaction, FileInfo } from '../types/types';
import HierarchView from "../components/HierarchyView";
import ModeSelectionTab from "../components/ModeSelectionTab";
import LikeThumbsContainer from "../components/LikeThumbsContainer";

// 開発用パス
const AccessPath = import.meta.env.VITE_API_BASE;

// フェッチを実行して結果を返却する
const fetchIndex = async ()  => {
  const res = await fetch(AccessPath + '/info/index.json');

  if(res.status === 200){
    return await res.json()
  }else{
    console.log("http error!! status: " + res.status)
    return null
  }
}

const fetchReactions = async () => {
  const res = await fetch(AccessPath + '/info/reactions.json')
  if(res.status === 200){
    return await res.json()
  }else{
    console.log("http error!! status: " + res.status)
    return null
  }
}

const MainRouter: React.FC = () => {
  const [indexInfo, setIndexInfo] = useState<FolderNode>();
  const [previewFile, setPreviewFile] = useState<FileInfo | null>(null);
  const [previewPath, setPreviewPath] = useState<string>("");
  const [mode, setMode] = useState<string>("ByYM")

  const changePreviewFile = (path: string): void => {
    setPreviewPath(path);
    const pathArr = path.split('/');
    const item = indexInfo?.childrenFolder.find(x => x.folderName === pathArr[1])
                ?.childrenFolder.find(x => x.folderName === pathArr[2])
                ?.files.find((x => x.fileName === pathArr[3]));
    setPreviewFile(item ?? null);
  }

  const switchSelectedMode = (modeString: string) => {
    setMode(modeString);
  }

  useEffect(() => {
    fetchIndex()
      .then(res => {
        fetchReactions()
          .then(reactionRes => {
            const reactions = reactionRes as Reaction[];

            const base = JSON.parse(JSON.stringify(res)) as FolderNode;

            for(let i=0; i<reactions.length; i++){
              const path = reactions[i].target.split("/")
              // 更新する要素の抽出
              const item = base.childrenFolder.find(x => x.folderName === path[1])
                ?.childrenFolder.find(x => x.folderName === path[2])
                ?.files.find((x => x.fileName === path[3]));
              // 抽出した要素のReactionを追加
              if(item){
                if(item.Reactions){
                  item.Reactions.push(reactions[i])
                }else{
                  item.Reactions = [reactions[i]]
                }
              }
            }
            setIndexInfo(base);
          })
      })
      .catch(e => console.log("error:" + e));
  },[]);

  return (
    <>
      <div>
        <MainHeader/>
      </div>
      {indexInfo && mode === 'ByYM'
        && <HierarchView key={"root"} node={indexInfo as FolderNode} path={""} onSelectImg={changePreviewFile}/>}
      {indexInfo && mode === 'Like'
        && <LikeThumbsContainer onSelectImg={changePreviewFile} indexInfo={indexInfo} />}
      {previewFile && <ModalPreview contentPath={previewPath} contentFile={previewFile} onClose={changePreviewFile}/>}
      {!previewFile && <ModeSelectionTab changeMode={switchSelectedMode}/>}
    </>
  )
}

export default MainRouter;