import { Component, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UtilityService } from 'src/app/services/utility.service';
import * as swal from 'sweetalert2';
import { emailPattern } from '../../constants';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: [
  ]
})
export class SignInComponent {

  constructor(
    protected readonly accountService: AccountService,
    protected readonly router: Router,
    protected readonly utilityService: UtilityService,
    protected readonly activatedRoute: ActivatedRoute
  ) {

  }

  protected emailPattern = emailPattern;

  protected formData: any = {
    userName: isDevMode() ? "admin@shipbu.com" : null,
    password: isDevMode() ? "1" : null
  }

  protected async signin() {
    this.utilityService.loadingPanelVisible = true;
    var response = await this.accountService.signin(this.formData);
    this.utilityService.loadingPanelVisible = false;

    if (response.result.succeeded) {
      const returnUrl = this.activatedRoute.paramMap.subscribe({
        next: (e) => {
          this.router.navigate(['']);
        }
      })
    }
    else {
      swal.default.fire({
        icon: 'error',
        title: 'Hata!',
        html: "Geçersiz kullanıcı girişi",
        confirmButtonText: 'Kapat',
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      }).then((response) => {

      });
    }
  }
}
