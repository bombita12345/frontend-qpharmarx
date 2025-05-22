import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  imports: [CommonModule],
})
export class UserAvatarComponent {
  @Input() initials: string = '';
  @Input() isBot: boolean = false;
}