export interface SearchRepoResponse {
    total_count: number;
    incomplete_results: boolean;
    items: RepoInfo[];
}

export interface RepoInfo {
    url: string;
    description: string;
    forks_count: number;
    stargazers_count: number;
    open_issues_count: number;
}
