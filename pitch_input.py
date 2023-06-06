import pyaudio
import numpy as np
import librosa
import os
import sys
import time



# Create PyAudio stream
audio = pyaudio.PyAudio()
FORMAT = pyaudio.paFloat32
CHANNELS = 1
DEVICE = 1
d_info = audio.get_device_info_by_index(DEVICE)
RATE = int(d_info['defaultSampleRate'])
CHUNK = 1024

stream = audio.open(format=FORMAT, channels=CHANNELS, rate=RATE, input=True, frames_per_buffer=CHUNK,input_device_index=2)

# Function to calculate pitch from audio frames
def calculate_note(frames):
    y = np.frombuffer(frames, dtype=np.float32)
    freq= librosa.pyin(y, fmin=80, fmax=1500, sr = RATE)
    sorted_prob, sorted_bool, sorted_freq = zip(*sorted(zip(freq[2],freq[1],freq[0]), reverse=True))
    if sorted_bool[0]:
        # dev = librosa.pitch_tuning(sorted_freq[0])
        return librosa.hz_to_note(sorted_freq[0], cents=True)
    return None


# Start recording and pitch detection
print("Listening for pitch... (Press Ctrl+C to stop)")
try:
    while True:
        data = stream.read(CHUNK,exception_on_overflow=False)
        note = calculate_note(data)
        if note:
        # if not np.isnan(note) and not np.isinf(note):
            print(f"Note: {note}")
except KeyboardInterrupt:
    pass

# Stop and close the audio stream
stream.stop_stream()
stream.close()
audio.terminate()