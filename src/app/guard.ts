import { inject } from "@angular/core";
import { AccountService } from "./services/account.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

export const authGuardAdmin = async () => {
    const accountService = inject(AccountService);
    const router = inject(Router);
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe({
            next: (e) => e.url
        });
        return accountService.isInRole('Administrators') ? true : router.parseUrl(`/main/signin?returnUrl=/admin`);
    };
    export const authGuardMember = async () => {
    const accountService = inject(AccountService);
    const router = inject(Router);
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe({
            next: (e) => e.url
        });
    return accountService.isInRole('Members') ? true : router.parseUrl(`/main/signin?returnUrl=/member`);
};