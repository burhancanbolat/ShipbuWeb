import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UtilityService } from 'src/app/services/utility.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [
  ]
})
export class ResetPasswordComponent {
  constructor(
    protected readonly utilityService: UtilityService,
    protected readonly accountService: AccountService,
    protected readonly router: Router,
  ) {

  }

  tokenMode: boolean = false;

  formData: any = {
    userName: null
  };

  formDataToken: any = {};

  async request() {
    this.utilityService.loadingPanelVisible = true;
    var result = await this.accountService.forgotpassword(this.formData)
      .then((response) => {
        this.formDataToken.userId = response.id;
        this.tokenMode = true;
      })
      .catch((response) => {
        Swal.fire({
          icon: 'error',
          title: 'Kullanıcı Bulunamadı!',
          html: 'Lütfen sisteme kayıt olduğunuz e-posta adresinizi yazdıktan sonra tekrar deneyiniz.',
          heightAuto: false,
          confirmButtonText: 'Tamam'
        });
      })
      .finally(() => {
        this.utilityService.loadingPanelVisible = false;
      });
  }

  async resetPassword() {
    this.utilityService.loadingPanelVisible = true;
    var result = await this.accountService.resetpassword(this.formDataToken)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Tamam!',
          html: 'Parolanız başarıyle yenilenmiştir!',
          heightAuto: false,
          confirmButtonText: 'Tamam'
        })
          .then((result) => {
            this.router.navigate(['', 'main', 'signin']);
          });
      })
      .catch((response) => {
        Swal.fire({
          icon: 'error',
          title: 'Hata!',
          html: 'Yenileme kodunu doğru yazdığınızdan emin olduktan sonra tekrar deneyiniz!',
          heightAuto: false,
          confirmButtonText: 'Tamam'
        });
      })
      .finally(() => {
        this.utilityService.loadingPanelVisible = false;
      });
  }
}
