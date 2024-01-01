import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { TransportOrderItemFeaturesService } from 'src/app/services/transport-order-item-features.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styles: [
  ]
})
export class PlaceOrderComponent implements OnInit {

  constructor(
    protected readonly utilityService: UtilityService,
    protected readonly transportOrderItemFeaturesService: TransportOrderItemFeaturesService,
  ) {

  }


  @ViewChild('imagePreview')
  protected imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('newOrderItemForm')
  protected newOrderItemForm!: DxFormComponent;

  protected features!: any[];
  protected featureDescriptionPopupVisible: boolean = false;
  protected currentFeature?: any;
  protected dropZoneEnter: boolean = false;
  protected items: any[] = [];
  protected newOrderItem!: any;

  async ngOnInit(): Promise<any> {
    this.resetForm();
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrderItemFeaturesService.store.load({ filter: ['enabled', '=', 'true'] }).then((result: any) => {
      this.features = result.data;
      this.utilityService.loadingPanelVisible = false;
    });
  }

  protected showFeatureDescriptionPopup(feature: any) {
    this.currentFeature = feature;
    this.featureDescriptionPopupVisible = true;
  }

  protected switchFeature(f: any) {
    const feature = this.newOrderItem.features.find((e: any) => e == f);
    if (feature)
      this.newOrderItem.features = this.newOrderItem.features.filter((e: any) => e != feature);
    else
      this.newOrderItem.features.push(f);
  }

  protected imageDropzoneEnter(e: any) {
    this.dropZoneEnter = true;
  }

  protected imageDropzoneLeave(e: any) {
    this.dropZoneEnter = false;
  }

  protected imageDropzoneValueChange(e: any) {
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      this.newOrderItem.image = fileReader.result as string;
    }
    fileReader.readAsDataURL(e.value[0]);
  }

  protected get getAmount() {
    return this.newOrderItem.quantity && this.newOrderItem.weight ? this.newOrderItem.quantity * this.newOrderItem.weight : 0;
  }

  protected add() {
    if (!this.newOrderItem.image) {
      notify({
        message: 'Lütfen görsel yükleyiniz.',
        duration: 3000,
        type: 'error'
      });
    } else {
      const result = this.newOrderItemForm.instance.validate();

      if (result.isValid) {
        this.items.push({ ...this.newOrderItem });
        this.newOrderItemForm.instance.clear();
        this.newOrderItem.image = undefined;
        //this.resetForm();
      }
      else {
        notify({
          message: 'Lütfen gerekli alanları doldurunuz',
          duration: 3000,
          type: 'error'
        });
      }
    }
  }

  private resetForm() {
    this.newOrderItem = {
      quantity: undefined,
      weight: undefined,
      height: undefined,
      width: undefined,
      length: undefined,
      contents: undefined,
      products: undefined,
      features: [],
      image: undefined,
    };
  }

}
