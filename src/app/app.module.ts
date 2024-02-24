import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountService } from './services/account.service';
import { AppHttpInterceptor } from './app-httpinterceptors';
import { SharedModule } from './modules/shared/shared.module';
import { UtilityService } from './services/utility.service';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (accountService: AccountService, utilityService: UtilityService) => {
        accountService.init();
        utilityService.init();
      },
      deps: [AccountService, UtilityService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      deps: [AccountService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
