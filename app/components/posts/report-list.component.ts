import {Component, OnInit} from "@angular/core";
import {PostService} from "../../services/post-service";
import {Report} from "../../models/report";
import {MdSnackBar} from "@angular/material";
import {NgProgressService} from 'ngx-progressbar';

@Component({
    selector: 'report-list',
    templateUrl: 'app/views/post/report-list.html',
    providers: [PostService]
})
export class ReportListComponent implements OnInit {

    private reports: Report[];

    constructor(private postService: PostService,
                public snackBar: MdSnackBar,
                private progressService: NgProgressService) {
    }

    ngOnInit() {
        this.refreshList();
    }

    refreshList() {
        this.progressService.start();
        this.postService.listReports().subscribe(
            data => {
                this.reports = data;
                this.progressService.done();
            },
            error => {
                this.snackBar.open("Erro: " + error._body, "OK");
                this.progressService.done();
            }
        );
    }

    removeReportPost(id: number) {
        this.progressService.start();
        this.postService.remove(id).subscribe(
            data => {
                this.snackBar.open("Post removido com sucesso", "OK");
                this.progressService.done();
                this.refreshList();
            },
            error => {
                this.snackBar.open("Erro: " + error._body, "OK");
                this.progressService.done();
            }
        );
    }

}