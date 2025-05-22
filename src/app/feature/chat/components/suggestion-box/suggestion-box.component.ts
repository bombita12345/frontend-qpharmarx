import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuggestionItem } from '../../../../core/models/chat.model';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.scss'],
  imports: [CommonModule],
})
export class SuggestionBoxComponent {
  @Input() suggestion!: SuggestionItem;
  @Output() select = new EventEmitter<SuggestionItem>();

  onSelect(): void {
    this.select.emit(this.suggestion);
  }
}