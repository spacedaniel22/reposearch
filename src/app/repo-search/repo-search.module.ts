import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RepoSearchContainer } from "./repo-search.container";
import { RepoSearchItemComponent } from "./repo-search-item/repo-search-item.component";

import { GithubService } from "../services/github/github.service";
import { GithubConfig } from "../services/github/github.config";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RepoSearchContainer,
        RepoSearchItemComponent
    ],
    providers: [
        GithubService,
        GithubConfig
    ],
    exports: [
        RepoSearchContainer,
        RepoSearchItemComponent
    ]
})
export class RepoSearchModule { }
