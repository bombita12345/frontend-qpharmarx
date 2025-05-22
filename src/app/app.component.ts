import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { ChatbotComponent } from './feature/chat/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, ChatbotComponent],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ai-chatbot';
}