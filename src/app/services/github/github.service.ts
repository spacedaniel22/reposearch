import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, mapTo, catchError } from "rxjs/operators";

import { GithubConfig } from "./github.config";
import { IssueInfo, SearchResponse, RepoInfo } from "./github.model";

@Injectable()
export class GithubService {

    constructor(
        private httpClient: HttpClient,
        private githubConfig: GithubConfig
    ) {
    }

    searchRepo(searchParam: string): Observable<RepoInfo[]> {
        return this.httpClient.get<SearchResponse>
            (`${this.githubConfig.getRepoSearchEndpoint()}${searchParam}`)
            .pipe(
                map(x => x.items.map(r => ({
                    id: r.id,
                    fullName: r.full_name,
                    url: r.html_url,
                    description: r.description,
                    stargazersCount: r.stargazers_count,
                    forksCount: r.forks_count,
                    openIssuesCount: r.open_issues_count
                }))),
                catchError(this.handleError)
            );
    }

    searchIssues(searchParam: string): Observable<IssueInfo[]> {
        return this.httpClient.get<SearchResponse>
            (`${this.githubConfig.getIssuesSearchEndpoint()}${searchParam}`)
            .pipe(
                map(x => x.items.map(i => ({
                    id: i.id,
                    title: i.title,
                    body: i.body,
                    htmlUrl: i.html_url,
                    state: i.state,
                    userName: i.user.login
                }))),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error("An error occurred:", error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }
        return throwError("Something bad happened; please try again later.");
    }

}
