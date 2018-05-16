import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { RepoSearchModule } from "./repo-search/repo-search.module";
import { IssuesModule } from "./issues/issues-module";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        RepoSearchModule,
        IssuesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
