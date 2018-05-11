import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const config = {
    baseUrl: "https://api.github.com/",
    searchUri: "search/",
    repoSearchUri: "repositories?q=",
    issuesSearchUri: "issues?q=repo:"
};

@Injectable()
export class GithubConfig {

    getRepoSearchEndpoint(): string {
        return `${config.baseUrl}${config.searchUri}${config.repoSearchUri}`;
    }

    getIssuesSearchEndpoint(): string {
        return `${config.baseUrl}${config.searchUri}${config.issuesSearchUri}`;
    }

}


