import { TestBed, async } from "@angular/core/testing";
import { APP_BASE_HREF } from "@angular/common";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RepoSearchModule } from "./repo-search/repo-search.module";
import { IssuesModule } from "./issues/issues-module";
describe("AppComponent", () => {
    const title = "Repo Search";
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [{provide: APP_BASE_HREF, useValue : "/" }],
            imports: [
                AppRoutingModule,
                RepoSearchModule,
                IssuesModule
            ]
        }).compileComponents();
    }));
    it("should create the app", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title '${title}'`, async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual(title);
    }));
    it("should render title in a h1 tag", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector("h1").textContent).toContain(`Welcome to ${title}!`);
    }));
});
