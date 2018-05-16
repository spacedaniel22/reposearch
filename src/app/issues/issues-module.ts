import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IssuesPage } from "./issues.page";

@NgModule({
    imports: [
        CommonModule
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
