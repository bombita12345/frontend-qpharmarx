import { Component, Input } from '@angular/core';
import { ChatMessage, UserInfo } from '../../../../core/models/chat.model';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { CommonModule } from '@angular/common';
import { LineBreaksPipe } from '../../../../shared/pipes/line-breaks.pipe';

@Component({
  standalone: true,
  selector: 'app-chat-message',
  templateUrl: './chat-messages.component.html',
  styleUrls: ['./chat-messages.component.scss'],
  imports: [CommonModule, UserAvatarComponent, LineBreaksPipe], //Removed the LineBreaksPipe import
})
export class ChatMessageComponent {
  @Input() message!: ChatMessage;
  @Input() userInfo!: UserInfo;
}