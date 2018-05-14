import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "repo-search-item",
    templateUrl: "./repo-search-item.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    preserveWhitespaces: false
})
export class RepoSearchItemComponent {
    title = "";
}
