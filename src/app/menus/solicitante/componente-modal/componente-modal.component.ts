import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-componente-modal',
  templateUrl: './componente-modal.component.html',
  styleUrls: ['./componente-modal.component.css']
})
export class ComponenteModalComponent {

  @Input() mensaje: String;
  modalRef?: BsModalRef;


  constructor(private modalService: BsModalService){
    this.mensaje='';
    this.modalRef=new BsModalRef();
  }

  cambiar(){
    this.modalRef?.hide();
  }

}
