import React, { useEffect } from "react"
import { useState } from "react";
import MainHeader from "../components/MainHeader";
import ModalPreview from "../components/ModalPreview";
import type { FolderNode } from '../types/types';
import HierarchView from "../components/HierarchyView";

// 開発用パス
const AccessPath = "/cf";

// フェッチを実行して結果を返却する
const fetchIndex = async () => {
  const res = await fetch(AccessPath + '/index.json');
  if(res.status === 200){
    return await res.json()
  }else{
    console.log("http error!! status: " + res.status)
    return null
  }
}

const MainRouter: React.FC = () => {
  const [indexInfo, setIndexInfo] = useState<FolderNode>();
  const [previewPath, setPreviewPath] = useState("");
  // 0:通常　1:戻るボタン有効
  const [headerState, setHeaderState] = useState(0);

  useEffect(() => {
    fetchIndex()
      .then(res => {
        // console output
        console.log(res);
        // set response urls
        setIndexInfo(res);
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
      {previewPath && <ModalPreview contentPath={AccessPath + previewPath} onClose={setPreviewPath}/>}
    </>
  )
}

export default MainRouter;