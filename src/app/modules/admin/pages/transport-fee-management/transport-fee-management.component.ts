import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { TransportRegionsService } from 'src/app/services/transport-regions.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-transport-fee-management',
  templateUrl: './transport-fee-management.component.html',
  styles: [
  ]
})
export class TransportFeeManagementComponent implements OnInit {
  constructor(
    protected readonly transportRegionsService: TransportRegionsService,
    protected readonly utilityService: UtilityService,
  ) {
    this.onRegionValueChanged = this.onRegionValueChanged.bind(this);
    this.onMethodValueChanged = this.onMethodValueChanged.bind(this);
    this.onDistrictValueChanged = this.onDistrictValueChanged.bind(this);
  }

  @ViewChild('feeGrid')
  feeGrid!: DxDataGridComponent;

  destinations: any[] = [];
  methods: any[] = [];
  districts: any[] = [];
  fees: any[] = [];

  formData: any = {
    region: null,
    district: null,
    method: null,
    fee: null,
  };

  formDataFees: any = {

  };

  async ngOnInit() {
    this.destinations = await this.transportRegionsService.getDestinations();
  }

  async onRegionValueChanged(e: any) {
    this.utilityService.loadingPanelVisible = true;
    this.methods = await this.transportRegionsService.getTransportMethods(e.value.id);
    this.utilityService.loadingPanelVisible = false;
  }
  async onMethodValueChanged(e: any) {
    this.utilityService.loadingPanelVisible = true;
    this.districts = await this.transportRegionsService.getDistricts(this.formData.region.id);
    this.utilityService.loadingPanelVisible = false;
  }

  async onDistrictValueChanged(e: any) {
    this.utilityService.loadingPanelVisible = true;
    this.fees = await this.transportRegionsService.getTransportFees(this.formData.district.id, this.formData.method.id);
    this.utilityService.loadingPanelVisible = false;
  }

  async feeUpdated(e: any) {
    this.utilityService.loadingPanelVisible = true;
    await this.transportRegionsService.updateFee(e.data.id, e.data.value);
    this.utilityService.loadingPanelVisible = false;
  }
}
