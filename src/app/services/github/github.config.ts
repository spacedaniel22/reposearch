import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class GithubConfig {

    private baseUrl = "https://api.github.com/";
    private searchUri = "search/";
    private repoSearchUri = "repositories?q=";
    private issuesSearchUri = "issues?q=repo:";

    getRepoSearchEndpoint(): string {
        return `${this.baseUrl}${this.searchUri}${this.repoSearchUri}`;
    }

    getIssuesSearchEndpoint(): string {
        return `${this.baseUrl}${this.searchUri}${this.issuesSearchUri}`;
    }

}


