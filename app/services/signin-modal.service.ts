import { Injectable, TemplateRef } from  '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';

@Injectable()
export class SigninModalService {

    template: TemplateRef<any>;
    signinModal:BsModalRef;
    constructor(private bsModalService:BsModalService){}

    open(){
        this.signinModal = this.bsModalService.show(this.template)
    }

    close(){
        this.signinModal.hide();
    }
}