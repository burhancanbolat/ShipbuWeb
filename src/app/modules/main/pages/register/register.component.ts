import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import * as swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  constructor(
    protected readonly accountService: AccountService,
    protected readonly router: Router,
  ) {

  }

  protected ready: boolean = true;

  protected formData: any = {
    email: null
  }
  protected async register() {
    this.ready = false;
    var response = await this.accountService.register(this.formData);
    this.ready = true;
    if (response.succeeded) {
      this.router.navigate(['main', 'confirmemail', this.formData.userName]);
    }
    else{
      swal.default.fire({
        icon: 'error',
        title: 'Hata!',
        html: response.errors[0].description,
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
