import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { confirm } from 'devextreme/ui/dialog';
import { UsersService } from 'src/app/services/users-service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent {
  constructor(
    protected readonly utilityService: UtilityService,
    protected readonly usersService: UsersService,
  ) { }

  @ViewChild('mainGrid')
  mainGrid!: DxDataGridComponent;

  async banUser(id: any) {
    var result = await confirm("Kullanıcı yasaklanacaktır. Devam etmek istiyor musunuz?", "Uyarı!");
    if (result) {
      this.utilityService.loadingPanelVisible = true;
      await this.usersService.banUser(id);
      this.mainGrid.instance.refresh();
      this.utilityService.loadingPanelVisible = false;
    }
  }

  async unBanUser(id: any) {
    var result = await confirm("Kullanıcı yasağı kaldırılacaktır. Devam etmek istiyor musunuz?", "Uyarı!");
    if (result) {
      this.utilityService.loadingPanelVisible = true;
      await this.usersService.unBanUser(id);
      this.mainGrid.instance.refresh();
      this.utilityService.loadingPanelVisible = false;
    }
  }

}
