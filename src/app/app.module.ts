import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { GithubService } from "./services/github/github.service";
import { GithubConfig } from "./services/github/github.config";
import { AppComponent } from "./app.component";
import { RepoSearchContainer } from "./repo-search/repo-search.container";
import { RepoSearchItemComponent } from "./repo-search/repo-search-item/repo-search-item.component";

@NgModule({
    declarations: [
        AppComponent,
        RepoSearchContainer,
        RepoSearchItemComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [GithubService, GithubConfig],
    bootstrap: [AppComponent]
})
export class AppModule { }
