import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountService } from './services/account.service';
import { LoadingPanelComponent } from './shared/loading-panel/loading-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (accountService: AccountService) => accountService.init(),
      deps: [AccountService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
