import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { GithubService } from "./services/github.service";
import { GithubConfig } from "./services/github.config";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [GithubService, GithubConfig],
    bootstrap: [AppComponent]
})
export class AppModule { }
