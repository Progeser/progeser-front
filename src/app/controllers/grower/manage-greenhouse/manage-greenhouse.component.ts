import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Greenhouse} from '../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {GreenhouseService} from '../../../services/http';
import {map, switchMap, tap} from 'rxjs/operators';
import {BenchesFormComponent} from '../../../components';

@Component({
  selector: 'app-manage-greenhouse',
  templateUrl: './manage-greenhouse.component.html',
  styleUrls: ['./manage-greenhouse.component.scss']
})
export class ManageGreenhouseComponent implements OnInit {
  form: FormGroup;
  greenhouse: Greenhouse;

  @ViewChild('benchesForm', {static: false})
  benchesForm: BenchesFormComponent;

  constructor(protected formBuilder: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute,
              protected httpGreenhouseService: GreenhouseService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.httpGreenhouseService.get(id))
    ).subscribe({
      next: greenhouse => {
        this.greenhouse = greenhouse;
        this.initForm();
      },
      error: () => this.router.navigate(['/grower/greenhouses-list'])
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(this.greenhouse.name, [
        Validators.required
      ]),
      height: this.formBuilder.control(this.greenhouse.height, [
        Validators.required
      ]),
      width: this.formBuilder.control(this.greenhouse.width, [
        Validators.required
      ])
    });
  }

  submitForm() {
    if (this.form.invalid || null == this.benchesForm || !this.benchesForm.valid()) {
      return;
    }

    this.httpGreenhouseService.saveForm(this.greenhouse, this.form.value).pipe(
      tap(greenhouse => this.greenhouse = greenhouse),
      switchMap(greenhouse => this.benchesForm.saveBenches(greenhouse))
    ).subscribe();
  }
}
