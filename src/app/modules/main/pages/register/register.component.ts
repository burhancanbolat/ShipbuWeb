import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { UtilityService } from 'src/app/services/utility.service';
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
    protected readonly utilityService : UtilityService,
  ) {

  }


  protected formData: any = {
    email: null
  }
  protected async register() {
    this.utilityService.loadingPanelVisible = true;
    var response = await this.accountService.register(this.formData);
    this.utilityService.loadingPanelVisible = false;
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
