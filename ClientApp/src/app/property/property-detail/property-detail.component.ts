import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryImage, NgxGalleryAnimation, NgxGalleryOptions}  from '@kolkov/ngx-gallery';

import { Property } from './../../models/property';
import { HousingService } from './../../services/housing.service';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})

export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  property = new Property();
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    //this.propertyId = Number(this.route.snapshot.params['id']);
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) => {
        this.property = data['prp'];
      });

      this.galleryOptions = [
        {
          width: '100%',
          height: '465px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: true
        }
        /* // max-width 800
        {
          breakpoint: 800,
          width: '100%',
          height: '250px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        },
        // max-width 400
        {
          breakpoint: 400,
          preview: true
        } */
      ];

      this.galleryImages = [
        {
          small: 'assets/images/default_house.png',
          medium: 'assets/images/default_house.png',
          big: 'assets/images/default_house.png'
        },
        {
          small: 'assets/images/default_house.png',
          medium: 'assets/images/default_house.png',
          big: 'assets/images/default_house.png'
        },
        {
          small: 'assets/images/default_house.png',
          medium: 'assets/images/default_house.png',
          big: 'assets/images/default_house.png'
        },
        {
          small: 'assets/images/default_house.png',
          medium: 'assets/images/default_house.png',
          big: 'assets/images/default_house.png'
        },
        {
          small: 'assets/images/default_house.png',
          medium: 'assets/images/default_house.png',
          big: 'assets/images/default_house.png'
        }
      ];

    /* this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id'];
        this.housingService.getProperty(this.propertyId).subscribe(
          (data: Property) => {
            this.property = data;
          }, error => this.router.navigate(['/'])
        )
      }); */
  }

  /* onSelectNext() {
    this.propertyId += 1;
    //this.router.navigate(['property-detail/' + this.propertyId]);
    this.router.navigate(['property-detail', this.propertyId]);
  } */

}
