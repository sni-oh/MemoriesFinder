import React, { useEffect } from "react"
import { useState } from "react";
import MainHeader from "../components/MainHeader";
import type { FolderNode } from '../types/types';
import HierarchView from "../components/HierarchyView";

// 開発用パス
const AccessPath = "/cf"; // "https://d2pbdl8x41rdu4.cloudfront.net";

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
        <MainHeader/>
      </div>
      <div>
        {indexInfo && <HierarchView key={"root"} node={indexInfo as FolderNode} path=""/>}
      </div>
    </>
  )
}

export default MainRouter;