import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";

import { RepoSearchModule } from "./repo-search/repo-search.module";
import { IssuesModule } from "./issues/issues-module";

import { GithubService } from "./services/github/github.service";
import { GithubConfig } from "./services/github/github.config";

import { RepoSearchContainer } from "./repo-search/repo-search.container";
import { RepoSearchItemComponent } from "./repo-search/repo-search-item/repo-search-item.component";
import { IssuesPage } from "./issues/issues.page";

const appRoutes: Routes = [
    { path: "", redirectTo: "search", pathMatch: "full" },
    { path: "search", component: RepoSearchContainer },
    { path: "search/:term", component: RepoSearchContainer, pathMatch: "prefix" },
    { path: "issues/:name", component: IssuesPage, pathMatch: "full" },
    { path: "**", redirectTo: "search" }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // debug
        ),
        BrowserModule,
        HttpClientModule,
        RepoSearchModule,
        IssuesModule
    ],
    providers: [
        GithubConfig,
        GithubService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
