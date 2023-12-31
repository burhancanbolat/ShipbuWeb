import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "./services/account.service";

@Injectable({
    providedIn: 'root'
})
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
        protected readonly accountService: AccountService
    ) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.accountService.isAuthenticated)
            return next.handle(req);
        else {
            const tokenizedReq = req.clone({
                headers: req.headers.set("Content-Type","application/json").set("Authorization", `Bearer ${this.accountService.user?.token}`)
            });
            return next.handle(tokenizedReq);
        }
    }

}