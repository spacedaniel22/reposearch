export interface SearchResponse<T = any> {
    total_count: number;
    incomplete_results: boolean;
    items: T[];
}

export interface RepoInfo {
    id: number;
    fullName: string;
    url: string;
    description: string;
    forksCount: number;
    stargazersCount: number;
    openIssuesCount: number;
}

export interface IssueInfo {
    id: number;
    title: string;
    body: string;
    htmlUrl: string;
    state: string;
    userName: string;
}
