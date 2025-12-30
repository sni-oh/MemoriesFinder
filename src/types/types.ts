export type FolderNode = {
    folderName: string;
    files: File[];
    childrenFolder: FolderNode[];
};

export type File = {
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
