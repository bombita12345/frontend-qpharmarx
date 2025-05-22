// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Components
import { ChatbotComponent } from './feature/chat/chatbot.component';
import { ChatInputComponent } from './feature/chat/components/chat-input/chat-input.component';
import { ChatMessageComponent } from './feature/chat/components/chat-messages/chat-messages.component';
import { SuggestionBoxComponent } from './feature/chat/components/suggestion-box/suggestion-box.component';
import { UserAvatarComponent } from './feature/chat/components/user-avatar/user-avatar.component';
import { HeaderComponent } from './shared/components/header/header.component';

// Pipes
import { LineBreaksPipe } from './shared/pipes/line-breaks.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        AppComponent,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        ChatbotComponent,
        ChatInputComponent,
        ChatMessageComponent,
        SuggestionBoxComponent,
        UserAvatarComponent,
        HeaderComponent,
        LineBreaksPipe
    ],
})
export class AppModule { }