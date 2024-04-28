export interface ServerInfo {
    fileInfo: string;
    updateTime: string;
    contentType: string;
    contentList: ContentList[];
}

export interface ContentList {
    isAd: boolean;
    stat: string;
    name: string;
    desc: string;
    addr: string[];
    cont: string[];
    tags: string[];
}
