import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountService } from './services/account.service';
import { LoadingPanelComponent } from './shared/loading-panel/loading-panel.component';
import { AppHttpInterceptor } from './app-httpinterceptors';
import { SharedModule } from './modules/shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    LoadingPanelComponent,
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
      useFactory: (accountService: AccountService) => accountService.init(),
      deps: [AccountService]
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
