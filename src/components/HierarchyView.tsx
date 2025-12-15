import React, { useEffect } from "react"
import { useState } from "react";
import type { FolderNode, IndexJson } from '../types/types';

interface HierarchViewProps{
  node: FolderNode
}

const HierarchView: React.FC<HierarchViewProps> = ({node}) => {
  
  return (
    <>
      <p>{node.folderName}</p>
      {node.childrenFolder && node.childrenFolder.map((child) => {
        return <HierarchView key={child.folderName} node={child}/>
      })}
    </>
  )
}

export default HierarchView;