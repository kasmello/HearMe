import { Component,HostListener } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { PitchDetector } from 'pitchy';

@Component({
  selector: 'app-note-text',
  templateUrl: './note-text.component.html',
  styleUrls: ['./note-text.component.css']
})
export class NoteTextComponent {
  visibility?: boolean;
  prevVisibility?: boolean;
  noteName: string;
  cents: number;
  mediaStream? : any;
  pitch? : number;
  clarity? : number;
  playing = false;

  constructor(private hearModeChange: DataServiceService) {
    this.prevVisibility = false;
    
  }
  
  @HostListener('window:visibilitychange', ['$event'])
  onVisibilityChange(event: Event): void {
    if (document.hidden) {
      // User switched tabs/apps
      this.hearModeChange.turnOff();
      // Add your logic here
    }
  }

  ngOnInit() {
    this.hearModeChange.currHearMode.subscribe((value: number) => {
      this.visibility = value===1?true:false;
    });
  }

  

  ngDoCheck() {
    this.hearModeChange.changeCent(this.cents);
    if(this.visibility!==this.prevVisibility) {
      this.prevVisibility = this.visibility
      if(this.visibility) {
        this.startAudioInput();
      } else {
        this.stopAudioInput();
      }
    }
  }


  startAudioInput() {
    this.noteName = "";
    this.cents = 0;
    let waitingSteps = 0;
    this.playing = true;
    const updatePitch = (analyserNode, detector, input, sampleRate) => {
      analyserNode.getFloatTimeDomainData(input);
      const [newPitch, newClarity] = detector.findPitch(input, sampleRate);
      if (newClarity > 0.98) {
        
        [this.pitch,this.clarity] = [newPitch,newClarity];
        this.noteName = noteToNoteName(frequencyToNote(newPitch,440));
        this.cents = calculateCentsOff(newPitch);
        // console.log(this.cents)
        // console.log({pitch: this.pitch, clarity: this.clarity, note: this.noteName, cents: this.cents});
        waitingSteps = 0;
      } else {
        waitingSteps += 1;
        if (waitingSteps === 19) {
          this.noteName = "";
          this.cents = 0;
          console.log("No singing detected, resetting")
        }
      }
      
      window.setTimeout(
        () => {if(this.playing) {
          updatePitch(analyserNode, detector, input, sampleRate)
        }},
        50
      );
    }
    const noteToNoteName = (note) => {
      const o = Math.floor(note / 12) - 1;
      const p = Math.round(note) % 12;
      const notes = ["C", "C#", "D", "D#/E♭", "E", "F", "F#", "G", "G#/A♭", "A", "B♭", "B"];
      const noteName = notes[p];
  
      return noteName+o.toString();
    }

    const frequencyToNote=(frequency: number, referenceFrequency: number = 440) => {
      const n = Math.round(12 * Math.log2(frequency / referenceFrequency)) + 69;
      return n
    }

    const calculateCentsOff = (frequency) => {
      const referenceFrequency: number = 440; // A4 reference frequency
      const fClosest: number = referenceFrequency * Math.pow(2, (frequencyToNote(frequency) - 69) / 12);
      return Math.floor( 1200 * Math.log( frequency / fClosest)/Math.log(2) );;
    }


    const audioContext = new AudioContext();
    const analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 1024;
    navigator.mediaDevices.getUserMedia({audio: true})
    .then((stream) => {
      this.mediaStream = stream
      
      audioContext.createMediaStreamSource(stream).connect(analyserNode);
      const detector = PitchDetector.forFloat32Array(analyserNode.fftSize);
      const input = new Float32Array(detector.inputLength);
      updatePitch(analyserNode, detector, input, audioContext.sampleRate);
      })
    .catch((error) => {
      console.error('Error accessing microphone:',error)
    });
    // } else {
    //   this.mediaStream.getTracks().forEach(track => track.enabled=true)
    // }
    // this.mediaStream.removeTrack(this.mediaStream.getTracks()[0])
    console.log('Started!')
    
  }
  
  stopAudioInput() {
    if (typeof this.mediaStream !== 'undefined') {
      this.mediaStream.getTracks().forEach(track => track.stop())
      // this.mediaStream.removeTrack(this.mediaStream.getTracks()[0])
      console.log('Stopped!')
      this.playing = false
    }
  }
  
  

}
