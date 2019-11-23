import {Component, OnInit} from '@angular/core';
import {Shape} from '../../../models/shape';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-manage-pot',
  templateUrl: './manage-pot.component.html',
  styleUrls: ['./manage-pot.component.scss']
})
export class ManagePotComponent implements OnInit {
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(null, [
        Validators.required
      ]),
      shape: this.formBuilder.control(null, [
        Validators.required
      ]),
      dimensions: this.formBuilder.array([], [
        Validators.required
      ])
    });
  }

  submitForm() {
  }
}
