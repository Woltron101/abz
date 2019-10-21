import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent {
  @Input() content: string[];
  @Output() onClose = new EventEmitter<boolean>();
  ngOnChanges() {
    console.log("content ", this.content);
  }
  close() {
    this.onClose.emit();
  }
}
