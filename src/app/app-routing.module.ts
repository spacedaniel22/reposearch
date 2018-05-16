import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RepoSearchContainer } from "./repo-search/repo-search.container";
import { IssuesPage } from "./issues/issues.page";

const appRoutes: Routes = [
    { path: "", redirectTo: "search", pathMatch: "full" },
    { path: "search", component: RepoSearchContainer },
    { path: "search/:term", component: RepoSearchContainer, pathMatch: "prefix" },
    { path: "issues/:name", component: IssuesPage, pathMatch: "full" },
    { path: "**", redirectTo: "search" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
