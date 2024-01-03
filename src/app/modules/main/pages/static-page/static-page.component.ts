import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransportStaticPagesService } from 'src/app/services/transport-static-pages.service';

@Component({
  selector: 'app-static-page',
  templateUrl: './static-page.component.html',
  styles: [
  ]
})
export class StaticPageComponent {
  constructor(
    protected readonly transportStaticPagesService: TransportStaticPagesService,
    protected readonly router: Router,
  ) {
    if (!transportStaticPagesService.currentPage)
      router.navigate(['']);
  }
}
