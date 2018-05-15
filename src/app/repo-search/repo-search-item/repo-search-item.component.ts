import {
    Component,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    Input,
    OnChanges,
    SimpleChange
} from "@angular/core";
import { Router } from "@angular/router";

import { RepoInfo } from "../../services/github/github.model";

@Component({
    selector: "repo-search-item",
    templateUrl: "./repo-search-item.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class RepoSearchItemComponent implements OnChanges {
    @Input() repo: RepoInfo;

    constructor(
        private router: Router
    ) { }

    ngOnChanges(changes: { repo: SimpleChange }) {
        if (!!changes.repo.currentValue) {
            this.repo = changes.repo.currentValue;
        }
    }

    openIssues() {
        if (this.isDisabled) {
            return;
        }
        this.router.navigate(["issues", this.repo.fullName]);
    }

    get issuesWord(): string {
        return this.repo.openIssuesCount > 1 ? "issues" : "issue";
    }

    get isDisabled(): boolean {
        return this.repo.openIssuesCount === 0;
    }
}
