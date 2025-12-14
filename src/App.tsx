import { useState, useEffect } from 'react';
import './App.css';
import MediaPreview from './MediaPreview';

const AccessPath = "/cf"//"https://d2pbdl8x41rdu4.cloudfront.net";

const fetchRemoteMedia = async (): Promise<string[]> => {
  console.log("Fetching remote media...");
  
  const result: Response = await fetch(AccessPath + "/index.json");
  if(result.status != 200){
    console.log("access error: status" + result.status);
    return [];
  }

  const resJson = await result.json();

  const Urls = createUrls(resJson.childrenFolder, AccessPath);

  console.log(Urls);
  return Urls;
};

type FolderNode = {
    folderName: string;
    files: string[];
    childrenFolder: FolderNode[];
};

function createUrls(
    nodes: FolderNode[],
    parentPath: string = ""
): string[] {
    const result: string[] = [];

    for (const node of nodes) {
        const currentPath = `${parentPath}/${node.folderName}`;

        for (const file of node.files) {
            result.push(`${currentPath}/${file}`);
        }

        if (node.childrenFolder && node.childrenFolder.length > 0) {
            result.push(...createUrls(node.childrenFolder, currentPath));
        }
    }
    console.log(result)
    return result;
}


function App() {
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRemoteMedia()
      .then(urls => {
        setMediaUrls(urls);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch media:", error);
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <header>MemoriesFinder</header>
      <div className="card">
        <h2>Our Memories</h2>
        <hr />
        {isLoading ? (
          <p>Loading media from server...</p>
        ) : (
          <MediaPreview urls={mediaUrls} />
        )}
      </div>
    </>
  );
}

export default App;
