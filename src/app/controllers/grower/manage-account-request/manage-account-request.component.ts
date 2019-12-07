import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AccountRequest} from '../../../models/account-request';
import {ActivatedRoute} from '@angular/router';
import {AccountRequestService} from '../../../services/http/account-request/account-request.service';
import {SnackbarService} from '../../../services';

@Component({
  selector: 'app-manage-account-request',
  templateUrl: './manage-account-request.component.html',
  styleUrls: ['./manage-account-request.component.scss']
})
export class ManageAccountRequestComponent implements OnInit {
  form: FormGroup;
  minValidityDate = new Date();
  accountRequest: AccountRequest = null;

  constructor(protected formBuilder: FormBuilder,
              protected snackbarService: SnackbarService,
              protected route: ActivatedRoute,
              protected httpAccountRequestService: AccountRequestService) { }

  ngOnInit() {
    this.httpAccountRequestService.get(this.route.snapshot.params.id).subscribe({
      next: accountRequest => {
        this.accountRequest = accountRequest;
        this.initForm(this.accountRequest);
      }
    });
  }

  initForm(accountRequest: AccountRequest) {
    this.form = this.formBuilder.group({
      firstName: this.formBuilder.control({value: accountRequest.firstName, disabled: true}),
      lastName: this.formBuilder.control({value: accountRequest.lastName, disabled: true}),
      comment: this.formBuilder.control({value: accountRequest.comment, disabled: true})
    });
  }

  acceptAccountRequest() {
    this.httpAccountRequestService.accept(this.accountRequest.id).subscribe();
  }

  refuseAccountRequest() {
    this.httpAccountRequestService.delete(this.accountRequest.id).subscribe();
  }
}
