import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    OnDestroy,
} from "@angular/core";
import { of, Subscription } from "rxjs";
import { switchMap, filter, distinctUntilChanged } from "rxjs/operators";

import { GithubService } from "../services/github/github.service";
import { RepoInfo } from "../services/github/github.model";

@Component({
    selector: "repo-search",
    templateUrl: "./repo-search.container.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class RepoSearchContainer implements OnDestroy {
    repos: RepoInfo[];

    private inputValue$: Subscription;

    constructor(
        private githubService: GithubService
    ) { }

    ngOnDestroy() {
        if (this.inputValue$) {
            this.inputValue$.unsubscribe();
        }
    }

    onChange(value: string) {
        this.inputValue$ = of(value)
            .pipe(
                distinctUntilChanged(),
                filter(text => !!text && text.length >= 3),
                switchMap(text => this.githubService.searchRepo(text)),
        )
            .subscribe(repos => this.repos = repos);
    }
}
