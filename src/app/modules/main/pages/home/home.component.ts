import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {
  protected slides = [
    {
      img: "slide1.jpg",
      label: 'First slide label',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse rem sed neque debitis odit cum assumenda suscipit? Iste incidunt fuga eum. Quaerat ipsum delectus doloremque voluptates sequi vero obcaecati inventore.'
    },
    {
      img: "slide2.jpg",
      label: 'Second slide label',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse rem sed neque debitis odit cum assumenda suscipit? Iste incidunt fuga eum. Quaerat ipsum delectus doloremque voluptates sequi vero obcaecati inventore.'
    },
    {
      img: "slide3.jpg",
      label: 'Third slide label',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse rem sed neque debitis odit cum assumenda suscipit? Iste incidunt fuga eum. Quaerat ipsum delectus doloremque voluptates sequi vero obcaecati inventore.'
    },
    
  ];
}
