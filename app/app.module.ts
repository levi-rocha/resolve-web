import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { APP_ROUTES } from "./app-routes";
import { RouterModule } from "@angular/router";
import { NewPostComponent } from "./components/posts/new-post-component";
import { PostListComponent } from "./components/posts/post-list-component";
import { PostDetailComponent } from "./components/posts/post-detail-component";
import { ReportListComponent } from "./components/posts/report-list-component";
import { AuthGuard } from "./auth-guard";
import { SigninService } from "./services/signin-service";
import { NgProgressModule } from 'ngx-progressbar';

import {
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdSidenavModule,
    MdSnackBarModule,
    MdToolbarModule,
    MdTabsModule,
    MdIconModule,
    MdSelectModule
} from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(APP_ROUTES),
        FormsModule,
        HttpModule,
        MdButtonModule,
        MdSidenavModule,
        MdToolbarModule,
        MdCardModule,
        MdInputModule,
        BrowserAnimationsModule,
        MdSnackBarModule,
        MdMenuModule,
        MdProgressBarModule,
        MdListModule,
        MdTabsModule,
        MdIconModule,
        MdSelectModule,
        NgProgressModule
    ],
    declarations: [
        AppComponent,
        NewPostComponent,
        PostListComponent,
        PostDetailComponent,
        ReportListComponent],
    providers: [AuthGuard, SigninService],
    bootstrap: [AppComponent]
})

export class AppModule {
}