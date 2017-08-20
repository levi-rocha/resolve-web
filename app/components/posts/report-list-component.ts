import {Component, OnInit} from "@angular/core";
import {PostService} from "../../services/post-service";
import {Report} from "../../models/report";
import {MdSnackBar} from "@angular/material";

@Component({
    selector: 'report-list',
    templateUrl: 'app/views/post/report-list.html',
    providers: [PostService]
})
export class ReportListComponent implements OnInit {

    private reports: Report[];

    constructor(private postService: PostService,
                public snackBar: MdSnackBar) {
    }

    ngOnInit() {
        this.refreshList();
    }

    refreshList() {
        this.postService.listReports().subscribe(
            data => this.reports = data,
            error => this.snackBar.open("Erro: " + error._body, "OK")
        );
    }

    removePost(id: number) {
        this.postService.remove(id).subscribe(
            data => {
                this.snackBar.open("Post removido com sucesso", "OK");
                this.refreshList();
            },
            error => this.snackBar.open("Erro: " + error._body, "OK")
        );
    }

}