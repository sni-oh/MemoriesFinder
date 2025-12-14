import React from 'react';
import './HierarchyNavigator.css';
import type { FolderNode } from './types'; // Import from new types file

interface HierarchyNavigatorProps {
  node: FolderNode;
  parentPath: string;
  onNodeSelect: (node: FolderNode, parentPath: string) => void;
}

const HierarchyNavigator: React.FC<HierarchyNavigatorProps> = ({ node, parentPath, onNodeSelect }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  // The full path for the current node's children.
  const currentPath = parentPath ? `${parentPath}/${node.folderName}` : node.folderName;

  const handleSelect = (e: React.MouseEvent) => {
    // Stop propagation to prevent the toggle handler from firing if they are nested differently
    e.stopPropagation();
    // We select a folder to view its contents.
    // We pass the node itself and ITS PARENT's path.
    onNodeSelect(node, parentPath);
  };

  const hasChildren = node.childrenFolder && node.childrenFolder.length > 0;

  const toggleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="hierarchy-node">
      <div className="node-content">
        <span className="toggle-icon" onClick={toggleOpen}>
          {hasChildren ? (isOpen ? '▼' : '►') : ''}
        </span>
        <span className="node-name folder" onClick={handleSelect}>
          📁 {node.folderName}
        </span>
      </div>
      {hasChildren && isOpen && (
        <ul className="hierarchy-children">
          {node.childrenFolder.map((child, index) => (
            <li key={index}>
              <HierarchyNavigator
                node={child}
                parentPath={currentPath} // The current node's path is the parent for the child
                onNodeSelect={onNodeSelect}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HierarchyNavigator;
