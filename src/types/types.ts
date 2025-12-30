export type FolderNode = {
    folderName: string;
    files: FileInfo[];
    childrenFolder: FolderNode[];
};

export type FileInfo = {
    fileName: string;
    fileType: string;
    Reactions: Reaction[];
}

export type Reaction = {
    reactionType: string;
    content: string;
    id: string;
    user: string;
    target: string;
    uploadDate: string;
}

export type IndexJson = {
    childrenFolder: FolderNode[];
};
