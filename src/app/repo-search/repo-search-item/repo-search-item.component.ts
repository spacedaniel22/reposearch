import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, OnChanges, SimpleChange } from "@angular/core";
import { RepoInfo } from "../../services/github/github.model";

@Component({
    selector: "repo-search-item",
    templateUrl: "./repo-search-item.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class RepoSearchItemComponent implements OnChanges {
    @Input() repo: RepoInfo;

    ngOnChanges(changes: { repo: SimpleChange }) {
        if (!!changes.repo.currentValue) {
            this.repo = changes.repo.currentValue;
        }
    }
}
