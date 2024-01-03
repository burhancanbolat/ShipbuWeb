import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TransportAcademyVideosService } from 'src/app/services/transport-academy-videos.service';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styles: [
  ]
})
export class AcademyComponent implements OnInit {
  constructor(
    protected readonly transportAcademyVideosService: TransportAcademyVideosService,
    protected readonly sanitizer: DomSanitizer,
  ) {

  }

  items: any[] = [];
  current?: any;
  async ngOnInit() {
    await this.transportAcademyVideosService.store.load({ 'filter': ['enabled', '=', true] })
      .then((result: any) => {
        this.items = result.data;
        if (this.items.length > 0) {
          this.setCurrent(this.items[0].url);
        }
      })
  }
  private getVideoId(d: any): string {
    return (new URLSearchParams(new URL(d).search)).get('v')!;
  }
  protected setCurrent(u: any) {
    const url = `https://www.youtube.com/embed/${this.getVideoId(u)}`;
    this.current = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
