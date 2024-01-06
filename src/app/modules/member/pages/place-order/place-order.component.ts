import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { isEmpty } from 'rxjs';
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
    this.validateTransportValue = this.validateTransportValue.bind(this);
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
  protected orderItemTypeTabs: any[] = [
    {
      id: 0,
      text: 'Koli',
      icon: 'bi bi-box',
    },
    {
      id: 1,
      text: 'Palet',
      icon: 'bi bi-boxes',
    },
    {
      id: 2,
      text: 'Konteyner',
      icon: 'bi bi-stack',
    },
  ];
  protected currentOrderItemType: any = this.orderItemTypeTabs[0];
  protected validationMessage = "Lütfen geçerli bir değer giriniz!";

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

  protected hasFeature(feature: any) {
    return this.newOrderItem.features.find((e: any) => e == feature);
  }
  protected hasFeatureAttachment(feature: any) {
    const f = this.newOrderItem.features.find((e: any) => e == feature);
    return f && f?.type != 0;
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
      if (this.newOrderItemForm.instance.validate().isValid) {
        this.newOrderItem.type = { ...this.currentOrderItemType };
        this.items.push({ ...this.newOrderItem });
        this.resetForm();
        this.newOrderItemForm.instance.clear();
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
      quantity: null,
      weight: null,
      height: null,
      width: null,
      length: null,
      contents: null,
      products: null,
      features: [],
      image: null
    };
  }

  protected orderItemTypeTabChanged(e: any) {
    this.currentOrderItemType = e.itemData;
  }

  protected validateTransportValue(e: any) {
    let result = false;
    switch (e.formItem.dataField) {
      case "quantity":
        result = (e.value > 0);
        break;
      case "weight":
        result = (e.value > 0);
        break;
      case "width":
        result = (e.value > 0) || this.currentOrderItemType.id == 2;
        break;
      case "height":
        result = (e.value > 0) || this.currentOrderItemType.id == 2;
        break;
      case "length":
        result = (e.value > 0) || this.currentOrderItemType.id == 2;
        break;
      case "contents":
        result = e.value?.length >= 0 || this.currentOrderItemType.id == 2;
        break;
      case "products":
        result = (e.value > 0) || this.currentOrderItemType.id != 0;
        break;

    }
    return result;
  }
  attachmentChanged(e: any, feature: any) {
    console.log(e, feature);
    const reader = new FileReader();
    reader.onloadend = (event) => {
      feature.attachment = reader.result;
      feature.attachmentFileName = e[0].name;
    };
    reader.readAsDataURL(e[0]);
  }

}
