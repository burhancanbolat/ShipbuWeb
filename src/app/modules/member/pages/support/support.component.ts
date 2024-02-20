import { Component, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import { alert } from 'devextreme/ui/dialog';
import { AccountService } from 'src/app/services/account.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styles: [
  ]
})
export class SupportComponent {

  constructor(
    protected readonly utilityService: UtilityService,
    protected readonly accountService : AccountService,
  ) { }

  @ViewChild('form')
  form!:DxFormComponent;

  formData: any = {
    subject: '',
    message: '',
  };

  sendButtonOptions: any = {
    text: 'Gönder',
    type: 'default',
    icon: 'bi bi-send',
    onClick: async () => {
      this.utilityService.loadingPanelVisible = true;
      await this.accountService.supportMessage(this.formData);
      this.form.instance.reset();
      this.utilityService.loadingPanelVisible = false;
      alert('Talebiniz tarafımıza ulaşmıştır. En kısa süre içinde sizinle irtibata geçilecektir.', 'Teşekkürler!');
    }
  };


}
