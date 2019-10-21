import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ApiService, Position } from "src/app/services/api.service";

@Component({
  selector: "app-reg-form",
  templateUrl: "./reg-form.component.html",
  styleUrls: ["./reg-form.component.scss"]
})
export class RegFormComponent implements OnInit {
  @ViewChild("inputFile", { static: false }) inputFile: ElementRef;
  userRegForm: FormGroup;
  inputValue: string;
  positions: Position[];
  modalContent: string[] = [];
  small: boolean = window.innerWidth < 480;

  constructor(private api: ApiService) {}

  ngOnInit() {
    console.log("small ", this.small);
    this.api.getPositions().subscribe((resp: any) => {
      this.positions = resp["positions"];
    });
    this.userRegForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(
          "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)$"
        )
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.minLength(9)
      ]),
      position_id: new FormControl("", [Validators.required]),
      photo: new FormControl("", [Validators.required])
    });
  }
  submit(event) {
    event.preventDefault();
    const formData: FormData = new FormData();
    const photo: string = this.inputFile.nativeElement.files[0];
    const values = this.userRegForm.value;
    console.log("this.userRegForm ", this.userRegForm);
    values.photo = photo;
    values.phone = "+380" + values.phone;
    values.position_id = +values.position_id;
    for (let key in values) formData.append(key, values[key]);
    this.api.postUser(formData).subscribe(
      resp =>
        (this.modalContent = ["You have successfully passed the registration"]),
      err => {
        console.log("err ", err.error.fails);

        for (let e in err.error.fails)
          err.error.fails[e].forEach(item => this.modalContent.push(item));
        console.log("this.modalContent ", this.modalContent);
      }
    );
  }

  validateOnChanges(formControlName: string): boolean {
    return (
      this.userRegForm.get(formControlName).dirty ||
      this.userRegForm.get(formControlName).touched
    );
  }
  uploadFile(event): void {
    event.preventDefault();
    this.inputFile.nativeElement.click();
  }
  changeFile(): void {
    this.inputValue = this.inputFile.nativeElement.value;
  }
  onFileChange(event) {
    let valid = { size: null };
    const img: HTMLImageElement = new Image();

    if (window.URL && event.target.files && event.target.files[0]) {
      img.src = window.URL.createObjectURL(
        event.target.files && event.target.files[0]
      );

      img.onload = () => {
        valid.size =
          img.naturalWidth > 70 &&
          img.naturalHeight > 70 &&
          event.target.files[0].size < 5 * 1024 * 1024;
        if (valid.size) this.userRegForm.get("photo").setErrors(null);
        else this.userRegForm.get("photo").setErrors({ incorrect: true });
      };
    }
  }
  closeModal() {
    this.modalContent = [];
  }
}
