import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    OnInit,
    OnDestroy,
    ChangeDetectorRef
} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { map, tap, filter, switchMap } from "rxjs/operators";

import { IssueInfo } from "../services/github/github.model";
import { GithubService } from "../services/github/github.service";

@Component({
    selector: "issues-page",
    templateUrl: "./issues.page.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class IssuesPage implements OnInit, OnDestroy {
    issues: IssueInfo[];
    repoName: string;
    private route$: Subscription;

    constructor(
        private route: ActivatedRoute,
        private changeDetector: ChangeDetectorRef,
        private githubService: GithubService
    ) { }

    ngOnInit() {
        this.route$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get("name")),
            filter((term: string) => !!term),
            tap(term => this.repoName = term),
            switchMap(term => this.githubService.searchIssues(term)),
            map((issues: IssueInfo[]) => issues.filter(i => i.state === "open"))
        ).subscribe((issues: IssueInfo[]) => {
            this.issues = issues;
            this.changeDetector.markForCheck();
        });
    }

    ngOnDestroy() {
        if (this.route$) {
            this.route$.unsubscribe();
        }
    }

    trackByIssueId(_index: number, issue: IssueInfo) {
        return issue.id;
    }
}
