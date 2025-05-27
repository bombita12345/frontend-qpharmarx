import { Component, EventEmitter, Input, Output, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ChatInputComponent {
  @Input() isDisabled = false;
  @Input() isGenerating = false;  // Add this line
  @Output() sendMessage = new EventEmitter<string>();

  inputText = '';
  isListening = false;
  recognition: any;

  constructor(private zone: NgZone) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;

    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      this.recognition.onstart = () => {
        this.zone.run(() => {
          this.isListening = true;
        });
      };

      this.recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }

        this.zone.run(() => {
          this.inputText = transcript.slice(0, 300);
        });


        if (event.results[event.results.length - 1].isFinal) {
          this.recognition.stop(); // Auto-stop after speech finishes
        }
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        this.zone.run(() => {
          this.isListening = false;
        });
      };

      this.recognition.onend = () => {
        this.zone.run(() => {
          this.isListening = false;
        });
      };
    } else {
      console.warn('Speech recognition not supported in this browser.');
    }
  }

  onSubmit(): void {
    if (this.inputText.trim() && !this.isDisabled && this.inputText.length <= 300) {
      this.sendMessage.emit(this.inputText);
      this.inputText = '';
    }
  }


  toggleMic(): void {
    if (!this.recognition) return;

    if (this.isListening) {
      this.recognition.stop(); // Stop listening if already started
    } else {
      this.recognition.start(); // Start listening if not started
    }
  }

}
