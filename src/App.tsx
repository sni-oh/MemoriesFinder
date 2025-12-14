import { useState, useEffect } from 'react';
import './App.css';
import MediaPreview from './MediaPreview';
import HierarchyNavigator from './HierarchyNavigator';
import type { FolderNode, IndexJson } from './types';

const AccessPath = "/cf"; // "https://d2pbdl8x41rdu4.cloudfront.net";

// This function is well-defined and can be reused.
// It recursively builds full URLs for all files within a given folder structure.
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
            result.push(`${AccessPath}${currentPath}/${file}`);
        }
        // Recurse for children, passing the current node's path as the new parent path.
        if (node.childrenFolder && node.childrenFolder.length > 0) {
            result.push(...createUrls(node.childrenFolder, currentPath));
        }
    }
    return result;
}

function App() {
  const [indexData, setIndexData] = useState<IndexJson | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<{ node: FolderNode, parentPath: string } | null>(null);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the main index file on mount
  useEffect(() => {
    const fetchIndex = async () => {
      try {
        setIsLoading(true);
        const result = await fetch(`${AccessPath}/index.json`);
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const resJson: IndexJson = await result.json();
        setIndexData(resJson);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred while fetching index.json");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchIndex();
  }, []);

  // Update media URLs when a folder is selected
  useEffect(() => {
    if (selectedInfo) {
      // We want to display all files within the selected folder and its subfolders.
      // The original createUrls function does exactly this.
      // We pass the selected node as the root of a new, single-node tree,
      // and provide its parent's path to ensure the URLs are built correctly.
      const urls = createUrls([selectedInfo.node], selectedInfo.parentPath);
      setMediaUrls(urls);
    } else {
      // No folder selected, clear media URLs
      setMediaUrls([]);
    }
  }, [selectedInfo]);

  const handleNodeSelect = (node: FolderNode, parentPath: string) => {
    setSelectedInfo({ node, parentPath });
  };

  const handleBackToHierarchy = () => {
    setSelectedInfo(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return <p>Loading Memories Index...</p>;
    }

    if (error) {
      return <p>Error loading memories: {error}</p>;
    }

    if (selectedInfo) {
      return (
        <div>
          <button onClick={handleBackToHierarchy} className="back-button">
            &larr; Back to Folders
          </button>
          <h2>{selectedInfo.node.folderName}</h2>
          <hr />
          <MediaPreview urls={mediaUrls} />
        </div>
      );
    }

    if (indexData && indexData.childrenFolder) {
      return (
        <div>
          <h2>Our Memories</h2>
          <hr />
          {indexData.childrenFolder.map((rootNode, index) => (
            <HierarchyNavigator
              key={index}
              node={rootNode}
              parentPath={""} // Root nodes have no parent path, so it starts empty
              onNodeSelect={handleNodeSelect}
            />
          ))}
        </div>
      );
    }

    return <p>No memories found. Check if index is available.</p>;
  };

  return (
    <>
      <header>MemoriesFinder</header>
      <div className="card">
        {renderContent()}
      </div>
    </>
  );
}

export default App;
