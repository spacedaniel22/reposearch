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
    switchMap,
    filter,
    distinctUntilChanged,
    debounceTime,
    tap,
} from "rxjs/operators";

import { GithubService } from "../services/github/github.service";
import { RepoInfo } from "../services/github/github.model";

@Component({
    selector: "repo-search",
    templateUrl: "./repo-search.container.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
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

    ngOnInit(): void {
        const route$ = this.route.paramMap.pipe(
            filter((params: ParamMap) => !!params && !!params.get("term")),
            switchMap((params: ParamMap) => {
                return this.githubService.searchRepo(params.get("term"));
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
        ).subscribe(repos => {
            this.repos = repos;
            this.changeDetector.detectChanges();
        });
    }

    ngOnDestroy(): void {
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
