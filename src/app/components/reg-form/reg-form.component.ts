import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-reg-form",
  templateUrl: "./reg-form.component.html",
  styleUrls: ["./reg-form.component.scss"]
})
export class RegFormComponent implements OnInit {
  @ViewChild("inputFile", { static: false }) inputFile: ElementRef;
  private userRegForm: FormGroup;
  private inputValue: string;
  private positions: Position[];

  constructor(private api: ApiService) {}

  ngOnInit() {
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
          "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|'([]!#-[^-~ \t]|(\\[\t -~]))+')@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
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
  submit(e) {
    e.preventDefault();
    const formData: FormData = new FormData();
    const photo = this.inputFile.nativeElement.files[0];
    const values = this.userRegForm.value;

    values.photo = photo;
    values.phone = "+380" + values.phone;
    values.position_id = +values.position_id;
    for (let key in values) {
      formData.append(key, values[key]);
    }
    this.api.postUser(formData);
  }
  validateOnChanges(formControlName) {
    return (
      this.userRegForm.get(formControlName).dirty ||
      this.userRegForm.get(formControlName).touched
    );
  }
  private uploadFile(e) {
    e.preventDefault();
    this.inputFile.nativeElement.click();
  }
  private changeFile() {
    this.inputValue = this.inputFile.nativeElement.value;
    console.log(
      "this.inputFile.nativeElement.value ",
      this.inputFile.nativeElement.value
    );
  }
  private onFileChange(event) {
    let valid = { size: null };
    const img = new Image();

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
}
interface Position {
  id: string;
  name: string;
}
