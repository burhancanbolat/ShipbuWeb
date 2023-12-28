import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UtilityService } from 'src/app/services/utility.service';
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
    protected readonly utilityService : UtilityService,
  ) {

  }


  protected formData: any = {
    userName: "deneme@deneme.com"
  }

  protected async signin() {
    this.utilityService.loadingPanelVisible = true;
    var response = await this.accountService.signin(this.formData);
    this.utilityService.loadingPanelVisible = false;
    
    if (response.result.succeeded) {
      this.router.navigate(['']);
    }
    else{
      swal.default.fire({
        icon: 'error',
        title: 'Hata!',
        html: "Geçersiz kullanıcı girişi",
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
