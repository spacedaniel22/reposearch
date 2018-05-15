import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IssuesPage } from "./issues.page";

import { GithubService } from "../services/github/github.service";
import { GithubConfig } from "../services/github/github.config";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        IssuesPage
    ],
    providers: [],
    exports: [
        IssuesPage
    ]
})
export class IssuesModule { }
