import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import * as swal from 'sweetalert2';
@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styles: [
  ]
})
export class ConfirmEmailComponent implements OnInit {
  constructor(
    protected readonly accountService: AccountService,
    protected readonly activatedRoute: ActivatedRoute,
    protected readonly router: Router,
  ) { }

  protected formData: any = {};
  protected ready: boolean = true;

  protected async confirm() {
    const response = await this.accountService.confirm(this.formData);
    if (response.succeeded) {
      swal.default.fire({
        icon: 'success',
        title: 'Teşekkürler',
        html: 'E-Posta adresniz başarıyla doğrulanmıştır',
        confirmButtonText : 'Devam',
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      }).then((response)=>{
        this.router.navigate(['main', 'signin']);
      });
    }else {
      swal.default.fire({
        icon: 'error',
        title: 'Hata!',
        html: 'Lütfen doğrulama kodunu doğru yazdığınızdan emin olduktan sonra tekrar deneyiniz.',
        confirmButtonText : 'Kapat',
        customClass: {
          confirmButton: "btn btn-primary",
        },
        buttonsStyling: false,
      }).then((response)=>{
        
      });
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (e: any) => {
        this.formData.userName = e.params["userName"];
      }
    });
  }

}
