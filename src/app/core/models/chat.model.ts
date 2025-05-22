export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    isProcessing?: boolean;
}

export interface UserInfo {
    name: string;
    initials: string;
}

export interface SuggestionItem {
    title: string;
    subtitle?: string;
}