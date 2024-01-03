import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { TransportAcademyVideosService } from 'src/app/services/transport-academy-videos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styles: [
  ]
})
export class AcademyComponent {
  constructor(
    protected readonly transportAcademyVideosService: TransportAcademyVideosService,
    protected readonly http: HttpClient
  ) {
    this.onReorder = this.onReorder.bind(this);
    this.setCellValue = this.setCellValue.bind(this);
  }


  onInitNewRow(e: any) {
    e.data.enabled = true;
  }

  onRowInserting(e: any) {

  }

  onRowUpdating(e: any) {
    e.newData = { ...e.oldData, ...e.newData };
  }

  onReorder(e: any) {
    e.promise = this.processReorder(e);
  }

  async processReorder(e: any) {
    const visibleRows = e.component.getVisibleRows();
    const from = visibleRows[e.fromIndex].data.id;
    const to = visibleRows[e.toIndex].data.id;

    await this.transportAcademyVideosService.reorder(from, to);
    await e.component.refresh();
  }

  setCellValue(rowData: any, n: any, r: any, k: any) {
    const params = new URLSearchParams(new URL(n).search);
    const id = params.get('v');
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${environment.youtubeApiKey}`;

    this.http.get<any>(url).subscribe({
      next: (response) => {
        if (response.items && response.items.length) {
          rowData.nameTr = response.items[0].snippet.title;
          rowData.nameEn = response.items[0].snippet.title;
          rowData.descriptionTr = response.items[0].snippet.description;
          rowData.descriptionEn = response.items[0].snippet.description;
          rowData.imageUrl = `https://i.ytimg.com/vi/${response.items[0].id}/hqdefault.jpg`;
        }
      },
      error: (e) => notify('Youtube Video getirmede hata oluştu!', 'error')
    });
  }


  protected applyUrl(cellInfo: any): void {

  }
}
