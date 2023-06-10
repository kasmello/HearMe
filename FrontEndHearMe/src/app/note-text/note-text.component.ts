import { Component } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-note-text',
  templateUrl: './note-text.component.html',
  styleUrls: ['./note-text.component.css']
})
export class NoteTextComponent {
  visibility?: boolean;
  note? : string;
  private socket: WebSocketSubject<any>;
  private mediaStream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;

  constructor(private hearModeChange: DataServiceService) {
    this.socket = webSocket('ws://localhost:8000/');
  }

  async startStreaming() {
    try {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.audioContext = new AudioContext();

        const audioSource = this.audioContext.createMediaStreamSource(this.mediaStream);
        await this.audioContext.audioWorklet.addModule('path/to/audio-worklet-processor.js');
        const audioProcessor = new AudioWorkletNode(this.audioContext, 'audio-worklet-processor');

        audioProcessor.port.onmessage = (event: MessageEvent) => {
          const audioData = event.data;
          // Send audio data over WebSocket
          this.socket.next(audioData);
        };

        audioSource.connect(audioProcessor);
        audioProcessor.connect(this.audioContext.destination);
      } catch (error) {
        console.error('Error accessing microphone:', error);
      }
    }
  }

  ngOnInit() {
    
    this.hearModeChange.currHearMode.subscribe((value: number) => {
      this.visibility = value===1?true:false});
  }

  
  

}
