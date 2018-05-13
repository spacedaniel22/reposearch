export interface SearchResponse<T = any> {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
}

export interface RepoInfo {
    url: string;
    description: string;
    forksCount: number;
    stargazersCount: number;
    openIssuesCount: number;
}

export interface IssueInfo {
    id: number;
    title: string;
    htmlUrl: string;
    status: string;
    userName: string;
}
