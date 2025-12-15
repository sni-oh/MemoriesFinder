import React, { useEffect } from "react"
import { useState } from "react";
import MainHeader from "../components/MainHeader";
import type { FolderNode, IndexJson } from '../types/types';
import HierarchView from "../components/HierarchyView";

// 開発用パス
const AccessPath = "/cf"; // "https://d2pbdl8x41rdu4.cloudfront.net";

// 接続に必要なURLのリストを作成して返却する関数
// index.jsonをそのまま渡すことで作成される
function createUrls(
    nodes: FolderNode[],
    parentPath: string = ""
): string[] {
    const result: string[] = [];
    for (const node of nodes) {
        // The path for the current node is its parent's path plus its own name.
        const currentPath = parentPath ? `${parentPath}/${node.folderName}` : node.folderName;
        for (const file of node.files) {
            // Prepend the AccessPath and the folder's path to the filename.
            result.push(`${AccessPath}/thumbnails/${currentPath}/${file}`);
        }
        // Recurse for children, passing the current node's path as the new parent path.
        if (node.childrenFolder && node.childrenFolder.length > 0) {
            result.push(...createUrls(node.childrenFolder, currentPath));
        }
    }
    return result;
}

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
        {indexInfo && <HierarchView key={"root"} node={indexInfo as FolderNode}/>}
      </div>
    </>
  )
}

export default MainRouter;