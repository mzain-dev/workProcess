import os
from mutagen.mp3 import MP3

AUDIO_DIR = os.path.join(os.path.dirname(__file__), 'public', 'audio')

files = ['hook.mp3', 'step1.mp3', 'step2.mp3', 'step3.mp3', 'step4.mp3', 'cta.mp3']

print("Exact audio durations:")
for lang in ['en', 'ur', 'ml', 'ar']:
    print(f"\n--- Language: {lang.upper()} ---")
    for name in files:
        path = os.path.join(AUDIO_DIR, lang, name)
        if os.path.exists(path):
            audio = MP3(path)
            duration_sec = audio.info.length
            duration_frames = round(duration_sec * 30)
            print(f"{name}: {duration_sec:.2f} seconds ({duration_frames} frames)")
        else:
            print(f"{lang}/{name}: File not found!")
