import { Component, Input, OnInit, Output } from '@angular/core';
import { Gifs } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html'
})
export class CardListComponent implements OnInit{

  @Input()
  public gifsInput: Gifs[] = [];
   
  ngOnInit(): void {
    if( !this.gifsInput ) throw new Error('Gifs property is required');
  }

}
