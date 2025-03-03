import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import * as dialog from 'devextreme/ui/dialog';

import { TransportOrderItemFeaturesService } from 'src/app/services/transport-order-item-features.service';
import { UtilityService } from 'src/app/services/utility.service';
import { TransportOrderItemContainerTypesService } from 'src/app/services/transport-order-item-container-types.service';
import { TransportRegionsService } from 'src/app/services/transport-regions.service';
import ImageResize from 'image-resize';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

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
    protected readonly transportOrderItemContainerTypesService: TransportOrderItemContainerTypesService,
    protected readonly transportRegionsService: TransportRegionsService,
    protected readonly accountService: AccountService,
    protected readonly router: Router
  ) {
    this.validateTransportValue = this.validateTransportValue.bind(this);
  }


  @ViewChild('imagePreview')
  protected imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('newOrderItemForm')
  protected newOrderItemForm!: DxFormComponent;
  protected newOrder: any = {
    items: []
  };

  protected features!: any[];
  protected featureDescriptionPopupVisible: boolean = false;
  protected currentFeature?: any;
  protected dropZoneEnter: boolean = false;
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
  //protected currentOrderItemType: any = this.orderItemTypeTabs[0];
  protected validationMessage = "Lütfen geçerli bir değer giriniz!";
  protected step: 'contents' | 'destination' | 'offer' = 'contents';

  protected origins: any[] = [];
  protected destinations: any[] = [];
  protected districts: any[] = [];
  protected stepIndex = 0;
  protected offers: any[] = [];

  async ngOnInit(): Promise<any> {
    this.resetForm();
    this.utilityService.loadingPanelVisible = true;
    await this.transportOrderItemFeaturesService.store.load({ filter: ['enabled', '=', 'true'] }).then((result: any) => {
      this.features = result.data;
      this.loadFromStorage();
    });
    this.origins = await this.transportRegionsService.getOrigins();
    this.newOrder.origin = this.origins[0].id;
    this.destinations = await this.transportRegionsService.getDestinations();
    this.utilityService.loadingPanelVisible = false;

  }

  protected async nextStep() {
    this.stepIndex++;
    this.stepIndex %= 4;
    if (this.stepIndex == 2) {
      this.utilityService.loadingPanelVisible = true;
      this.offers = await this.accountService.transportoffers(this.newOrder);
      this.utilityService.loadingPanelVisible = false;
    }
  }

  protected prevStep() {
    if (this.stepIndex > 0)
      this.stepIndex--;
  }

  protected async transportorder(feeId: any, price: any) {
    this.utilityService.loadingPanelVisible = true;
    this.newOrder.transportFeeId = feeId;
    this.newOrder.price = price;
    await this.accountService.transportorder(this.newOrder);
    this.utilityService.loadingPanelVisible = false;
    this.stepIndex++;
  }

  async populateDistricts(e: any) {

    this.newOrder.district = null;
    if (e.value) {
      this.utilityService.loadingPanelVisible = true;
      this.districts = await this.transportRegionsService.getDistricts(e.value);
      this.utilityService.loadingPanelVisible = false;
    }

  }

  private loadFromStorage() {
    // let newOrder = localStorage.getItem('newOrder');
    // if (newOrder)
    //   this.newOrder = JSON.parse(newOrder);
  }

  private saveToStorage() {
    //localStorage.setItem('newOrder', JSON.stringify(this.newOrder));
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

  protected async imageDropzoneValueChange(e: any) {
    let imageResize = new ImageResize({
      format: 'webp',
      width: 320
    });
    this.newOrderItem.image = await imageResize.play(e.value[0]);

  }

  protected get getAmount() {
    return this.newOrderItem.quantity && this.newOrderItem.weight ? this.newOrderItem.quantity * (this.newOrderItem.type.id == 2 ? this.newOrderItem.weight * 1000 : this.newOrderItem.weight) : 0;
  }

  protected add() {
    if (this.newOrderItemForm.instance.validate().isValid) {
      if (!this.newOrderItem.image) {
        notify({
          message: 'Lütfen görsel yükleyiniz.',
          duration: 3000,
          type: 'error'
        });
      }
      else {
        //this.newOrderItem.type = { ...this.currentOrderItemType };
        if (this.newOrderItem.type.id == 2)
          this.newOrderItem.weight *= 1000;
        this.newOrder.items.push({ ...this.newOrderItem });
        this.resetForm();
        this.newOrderItemForm.instance.clear();
        this.saveToStorage();
      }
    }
    else {
      notify({
        message: 'Lütfen gerekli alanları doldurunuz',
        duration: 3000,
        type: 'error'
      });
    }

  }

  protected onRowRemoved(e: any) {
    this.saveToStorage();
  }

  protected clearItems() {
    dialog.confirm("Sevkiyat listesi temizlenecektir. Devam etmek istiyor musunuz?", "UYARI!").then((r) => {
      if (r) {
        this.newOrder.items = [];
        this.saveToStorage();
      }
    })
  }

  protected clear() {
    this.step = 'contents';
    this.stepIndex = 0;
    this.newOrder = { items: [] };
    this.resetForm();
  }

  protected resetForm() {

    this.newOrderItem = {
      quantity: null,
      weight: null,
      height: null,
      width: this.newOrderItem?.type.id == 1 ? 120 : null,
      length: this.newOrderItem?.type.id == 1 ? 80 : null,
      contents: "",
      products: null,
      features: [],
      image: null,
      type: this.newOrderItem?.type ?? { id: 0 }
    };
  }

  protected orderItemTypeTabChanged(e: any) {
    //this.currentOrderItemType = e;
    this.newOrderItem.type = e;
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
      case "height":
      case "length":
        result = (e.value > 0) || this.newOrderItem.type.id == 2;
        break;
      case "contents":
        result = e.value || this.newOrderItem.type.id == 2;
        break;
      case "products":
        result = (e.value > 0) || this.newOrderItem.type.id != 0;
        break;
      case "containerType":
        result = e.value && this.newOrderItem.type.id == 2;
        break;
    }
    return result;
  }

  protected attachmentChanged(e: any, feature: any) {
    feature.attachment = e[0];
    feature.attachmentFileName = e[0].name;
  }

  protected get getNextDisabled(): boolean {
    return this.newOrder.items.length < 1 ||
      this.stepIndex == 3 ||
      (this.stepIndex == 1 && this.newOrder.district == null) ||
      (this.stepIndex == 1 && !this.newOrder.district?.isAmazonDepot && (!this.newOrder.address || !this.newOrder.phoneNumber || !this.newOrder.name))
  }
}
