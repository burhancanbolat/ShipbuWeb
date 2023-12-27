import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import * as swal from 'sweetalert2';

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
  ) {

  }

  protected ready: boolean = true;

  protected formData: any = {
    email: null
  }

  protected async signin() {
    this.ready = false;
    var response = await this.accountService.signin(this.formData);
    this.ready = true;
    if (response.result.succeeded) {
      this.router.navigate(['']);
    }
    else{
      swal.default.fire({
        icon: 'error',
        title: 'Hata!',
        html: response.result.errors[0].description,
        confirmButtonText : 'Kapat',
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      }).then((response)=>{
        
      });
    }
  }
}
