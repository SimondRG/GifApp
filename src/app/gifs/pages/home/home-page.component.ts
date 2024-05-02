import { Component } from '@angular/core';
import { GifsServices } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gisf-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {

  constructor( private gifsService: GifsServices ){}

  get gifsPadre(): Gif[] {
    return this.gifsService.gifList;
  }

}
