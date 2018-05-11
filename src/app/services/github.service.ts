import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, mapTo } from "rxjs/operators";

import { GithubConfig } from "./github.config";
import { SearchRepoResponse, RepoInfo } from "./github.model";

@Injectable()
export class GithubService {

    constructor(
        private httpClient: HttpClient,
        private githubConfig: GithubConfig
    ) {
    }

    searchRepo(searchParam: string): Observable<RepoInfo[]> {
        return this.httpClient.get<SearchRepoResponse>(`${this.githubConfig.getRepoSearchEndpoint()}${searchParam}`)
            .pipe(
                map(x => x.items.map(r => ({
                    url: r.url,
                    description: r.description,
                    stargazers_count: r.stargazers_count,
                    forks_count: r.forks_count,
                    open_issues_count: r.open_issues_count
                })))
            );

        // data.items.map(i => ({
        //     url: i.url,
        //     description: i.description,
        //     forks_count: i.forks_count,
        //     stargazer_count: i.stargazers_count,
        //     open_issues_count: i.open_issues_count
        // })));
    }

    searchIssues(searchParam: string) {
        return this.httpClient.get(`${this.githubConfig.getIssuesSearchEndpoint()}ngrx/platform`);
    }

}
