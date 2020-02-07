import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PotService} from '../../../services/http/pot/pot.service';
import {map, switchMap} from 'rxjs/operators';
import {Pot} from '../../../models/pot';

@Component({
  selector: 'app-manage-pot',
  templateUrl: './manage-pot.component.html',
  styleUrls: ['./manage-pot.component.scss']
})
export class ManagePotComponent implements OnInit {
  pot: Pot = null;
  form: FormGroup;

  constructor(protected formBuilder: FormBuilder,
              protected router: Router,
              protected route: ActivatedRoute,
              protected httpPotService: PotService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      map(params => params.id),
      switchMap(id => this.httpPotService.get(id))
    ).subscribe({
      next: pot => {
        this.pot = pot;
        this.initForm();
      },
      error: () => this.router.navigate(['/grower/pots-list'])
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(this.pot.name, [
        Validators.required
      ]),
      shape: this.formBuilder.control(this.pot.shape, [
        Validators.required
      ]),
      dimensions: this.formBuilder.array(this.pot.dimensions),
      area: this.formBuilder.control(this.pot.area, [
        Validators.required
      ])
    });
  }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.httpPotService.saveForm(this.pot, this.form.value).subscribe();
  }
}
