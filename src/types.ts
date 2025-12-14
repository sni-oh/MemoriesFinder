export type FolderNode = {
    folderName: string;
    files: string[];
    childrenFolder: FolderNode[];
};

export type IndexJson = {
    childrenFolder: FolderNode[];
};
