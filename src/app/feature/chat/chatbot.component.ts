import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../../core/services/chatbot.service';
import { ChatMessage, SuggestionItem, UserInfo } from '../../core/models/chat.model';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { SuggestionBoxComponent } from './components/suggestion-box/suggestion-box.component';
import { ChatMessageComponent } from './components/chat-messages/chat-messages.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';

@Component({
    selector: 'app-chatbot',
    standalone: true,
    imports: [CommonModule, SuggestionBoxComponent, ChatMessageComponent, ChatInputComponent],
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit, AfterViewInit {
    @ViewChild('messagesContainer') messagesContainer!: ElementRef;


    messages$!: Observable<ChatMessage[]>;
    suggestions$!: Observable<SuggestionItem[]>;
    userInfo$!: Observable<UserInfo | null>;

    private messagesSub!: Subscription;
    conversationStarted = false;

    constructor(private chatbotService: ChatbotService) { }

    ngOnInit(): void {
        this.messages$ = this.chatbotService.messages$;
        this.suggestions$ = this.chatbotService.suggestions$;
        this.userInfo$ = this.chatbotService.userInfo$;

        this.chatbotService.setUserInfo('Rick Marcus');
    }

    ngAfterViewInit(): void {
        this.messagesSub = this.messages$.subscribe(() => {
            this.scrollToBottom();
        });
    }

    ngOnDestroy(): void {
        if (this.messagesSub) {
            this.messagesSub.unsubscribe();
        }
    }

    scrollToBottom(): void {
        try {
            setTimeout(() => {
                this.messagesContainer.nativeElement.scrollTop =
                    this.messagesContainer.nativeElement.scrollHeight;
            }, 0);
        } catch (err) {
            console.error('Scroll error:', err);
        }
    }

    botIsTyping = false;
    onSendMessage(text: string): void {
        this.chatbotService.addUserMessage(text);
        this.conversationStarted = true;

        this.botIsTyping = true;

        // Simulate bot response delay
        setTimeout(() => {
            // Handle bot logic...
            this.botIsTyping = false;
        }, 3000);
    }


    onSelectSuggestion(suggestion: SuggestionItem): void {
        this.chatbotService.addUserMessage(suggestion.title);
        this.conversationStarted = true;

        this.botIsTyping = true;

        // Simulate bot response delay
        setTimeout(() => {
            // Handle bot logic...
            this.botIsTyping = false;
        }, 3000);

        
    }
}

