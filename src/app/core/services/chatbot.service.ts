import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ChatMessage, SuggestionItem, UserInfo } from '../models/chat.model';
import { StringUtils } from '../utils/string-utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {
    private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
    public messages$ = this.messagesSubject.asObservable();

    private userInfoSubject = new BehaviorSubject<UserInfo>({
        name: 'Sophia',
        initials: 'S'
    });
    public userInfo$ = this.userInfoSubject.asObservable();

    private initialSuggestions: SuggestionItem[] = [
        { title: 'Do you have product Y?', subtitle: 'for a pharmacy company' },
        { title: 'When did I last place an order?', subtitle: 'for whom' },
        { title: 'How often can I place an order?', subtitle: 'statuses' },
        { title: 'Which products are my top sellers?', subtitle: 'among doctors' }
    ];

    private suggestionsSubject = new BehaviorSubject<SuggestionItem[]>(this.initialSuggestions);
    public suggestions$ = this.suggestionsSubject.asObservable();

    public setUserInfo(name: string): void {
        const initials = StringUtils.getInitials(name);
        this.userInfoSubject.next({ name, initials });
    }

    public addUserMessage(text: string): void {
        const message: ChatMessage = {
            id: uuidv4(),
            text,
            sender: 'user',
            timestamp: new Date()
        };

        const currentMessages = this.messagesSubject.getValue();
        this.messagesSubject.next([...currentMessages, message]);

        // Simulate bot thinking
        this.simulateBotResponse(text);
    }

    private addBotMessage(text: string): void {
        const message: ChatMessage = {
            id: uuidv4(),
            text,
            sender: 'bot',
            timestamp: new Date()
        };

        const currentMessages = this.messagesSubject.getValue();
        this.messagesSubject.next([...currentMessages, message]);
    }

    private simulateBotResponse(userQuery: string): void {
        // Add a processing message first
        const processingId = uuidv4();
        const processingMessage: ChatMessage = {
            id: processingId,
            text: '',
            sender: 'bot',
            timestamp: new Date(),
            isProcessing: true
        };

        const currentMessages = this.messagesSubject.getValue();
        this.messagesSubject.next([...currentMessages, processingMessage]);

        // Simulate API call delay
        setTimeout(() => {
            // Remove processing message
            const updatedMessages = this.messagesSubject.getValue().filter(m => m.id !== processingId);
            this.messagesSubject.next(updatedMessages);

            // Add actual response
            if (userQuery.toLowerCase().includes('top sellers')) {
                this.addBotMessage(`1. Merck & Co. (Kenilworth, NJ)
• Keytruda: An immunotherapy for various cancers; generated $7.3 billion in Q2 2024 alone, marking a 16% year-over-year increase.
• Gardasil/Gardasil 9: Vaccines for HPV; contributed $8.9 billion in 2023.
• Januvia/Janumet: Treatments for type 2 diabetes; brought in $3.4 billion in 2023.
ReutersInvestopedia

2. Johnson & Johnson (New Brunswick, NJ)
• Stelara: Used for autoimmune diseases like psoriasis and Crohn's disease.
• Invega: An antipsychotic medication.
• Tylenol: A widely used over-the-counter pain reliever. Investopedia+1capsulepack.com+1

3. Bristol Myers Squibb (Princeton/Lawrenceville, NJ)
• Eliquis: An anticoagulant for preventing blood clots and strokes; earned approximately $6.7 billion in 2022.`);
            } else if (userQuery.toLowerCase().includes('product')) {
                this.addBotMessage('Yes, we have several products available for pharmacy companies. Would you like me to list our top pharmaceutical products?');
            } else if (userQuery.toLowerCase().includes('order')) {
                this.addBotMessage('You can place orders as often as needed. Your last order was placed on May 15, 2024 for Princeton Medical Center.');
            } else {
                this.addBotMessage('I understand you\'re asking about "' + userQuery + '". How can I provide more specific information to help you?');
            }
        }, 1500);
    }



}