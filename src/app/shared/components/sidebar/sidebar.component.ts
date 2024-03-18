import { ChangeDetectionStrategy, Component, ElementRef, Output, ViewChild, viewChild } from '@angular/core';
import { GifsService } from '../../../gifs/components/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get tags(): string[] {
    return this.gifsService.tagHistory;
  }

  searchTagHistory(tag: string): void {
    this.gifsService.searchTag(tag);
  }

}
