export type EditorBlock = {
    id: string;
    type: string;
    data: any;
};

export type EditorData = {
    time: number;
    blocks: EditorBlock[];
    version: string;
};