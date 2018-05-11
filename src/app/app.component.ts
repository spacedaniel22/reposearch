import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { SearchRepoResponse, RepoInfo } from "./services/github.model";
import { GithubService } from "./services/github.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "app";
    test: string;

    private data$: Subscription;

    constructor(
        private githubService: GithubService
    ) { }

    ngOnInit() {
        this.data$ = this.githubService.searchRepo("ngrx")
            .subscribe(data => this.test = data[1].description);
    }
}
