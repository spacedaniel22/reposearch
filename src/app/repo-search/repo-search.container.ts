import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
    ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription, Subject, merge } from "rxjs";
import {
    map,
    switchMap,
    filter,
    distinctUntilChanged,
    debounceTime
} from "rxjs/operators";

import { GithubService } from "../services/github/github.service";
import { RepoInfo } from "../services/github/github.model";

@Component({
    selector: "repo-search",
    templateUrl: "./repo-search.container.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class RepoSearchContainer implements OnInit, OnDestroy {
    repos: RepoInfo[];

    private data$$: Subscription;
    private searchTerms = new Subject<string>();

    constructor(
        private githubService: GithubService,
        private changeDetector: ChangeDetectorRef,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const route$ = this.route.paramMap.pipe(
            map((params: ParamMap) => params.get("term")),
            filter((term: string) => !!term),
            switchMap((term: string) => {
                return this.githubService.searchRepo(term);
            }));

        const repos$ = this.searchTerms.pipe(
            filter(term => !!term),
            debounceTime(500),
            distinctUntilChanged(),
            switchMap((term: string) => this.githubService.searchRepo(term))
        );

        this.data$$ = merge(
            route$,
            repos$
        ).subscribe((repos: RepoInfo[]) => {
            this.repos = repos;
            this.changeDetector.detectChanges();
        });
    }

    ngOnDestroy() {
        if (this.data$$) {
            this.data$$.unsubscribe();
        }
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    trackByRepoId(_index: number, repo: RepoInfo) {
        return repo.id;
    }
}
