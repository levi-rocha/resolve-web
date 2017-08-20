import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {NgModule} from "@angular/core";
import {APP_ROUTES} from "./app-routes";
import {AUTH_PROVIDERS} from "./components/auth/signin-routes";
import {RouterModule} from "@angular/router";
import {UserListComponent} from "./components/users/user-list-component";
import {NewPostComponent} from "./components/posts/new-post-component";
import {UserSignupComponent} from "./components/users/user-signup-component";
import {UserEditComponent} from "./components/users/user-edit-component";
import {UserViewComponent} from "./components/users/user-view-component";
import {SigninComponent} from "./components/auth/signin-component";
import {PostListComponent} from "./components/posts/post-list-component";
import {PostDetailComponent} from "./components/posts/post-detail-component";
import {ReportListComponent} from "./components/posts/report-list-component";
import {AuthGuard} from "./auth-guard";
import {SigninService} from "./services/signin-service";
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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
    imports: [BrowserModule, RouterModule.forRoot(APP_ROUTES, AUTH_PROVIDERS), FormsModule, HttpModule,
        MdButtonModule, MdSidenavModule, MdToolbarModule, MdCardModule, MdInputModule, BrowserAnimationsModule,
        MdSnackBarModule, MdMenuModule, MdProgressBarModule, MdListModule, MdTabsModule, MdIconModule, MdSelectModule],
    declarations: [AppComponent, UserListComponent, UserSignupComponent, UserEditComponent, UserViewComponent,
        SigninComponent, NewPostComponent, PostListComponent, PostDetailComponent, ReportListComponent],
    providers: [AuthGuard, SigninService],
    bootstrap: [AppComponent]
})

export class AppModule {
}