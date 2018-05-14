import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    OnDestroy,
    OnInit,
    ChangeDetectorRef,
} from "@angular/core";
import { Subscription, Subject } from "rxjs";
import {
    switchMap,
    filter,
    distinctUntilChanged,
    debounceTime,
    throttleTime
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

    repos$: Subscription;
    private searchTerms = new Subject<string>();

    constructor(
        private githubService: GithubService,
        private changeDetector: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.repos$ = this.searchTerms.pipe(
            filter(term => !!term),
            throttleTime(1000),
            distinctUntilChanged(),
            switchMap((term: string) => this.githubService.searchRepo(term))
        ).subscribe(repos => {
            this.repos = repos;
            this.changeDetector.detectChanges();
        });
    }

    ngOnDestroy(): void {
        if (this.repos$) {
            this.repos$.unsubscribe();
        }
    }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    trackByRepoId(_index: number, repo: RepoInfo) {
        return repo.id;
    }
}
