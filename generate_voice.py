import asyncio
import os
import edge_tts

# Define target paths
AUDIO_DIR = os.path.join(os.path.dirname(__file__), 'public', 'audio')

# Ensure directory exists
os.makedirs(AUDIO_DIR, exist_ok=True)

tts_files = [
    {
        'name': 'hook.mp3',
        'text': "This is how easy it is to get the part you need from HMI."
    },
    {
        'name': 'step1.mp3',
        'text': "Step one — message us. Just a photo or part number, that's it."
    },
    {
        'name': 'step2.mp3',
        'text': "Step two — we confirm the exact part, the price, and if it's in stock. Usually takes minutes."
    },
    {
        'name': 'step3.mp3',
        'text': "Step three — pick it up at our Muscat or Salalah shop, or we deliver anywhere in Oman."
    },
    {
        'name': 'step4.mp3',
        'text': "Step four — fit the part and you're back to work the same day."
    },
    {
        'name': 'cta.mp3',
        'text': "Part number or photo — that's all we need. Message us on WhatsApp and we'll get back to you right away."
    }
]

# We will use Microsoft's highly realistic Neural male voice: en-US-GuyNeural or en-US-AndrewNeural
VOICE = "en-US-GuyNeural"

async def generate_tts(text, dest_path):
    communicate = edge_tts.Communicate(text, VOICE)
    await communicate.save(dest_path)
    print(f"Generated: {os.path.basename(dest_path)}")

async def main():
    print("Generating highly realistic male voiceovers using edge-tts...")
    tasks = []
    for file in tts_files:
        dest_path = os.path.join(AUDIO_DIR, file['name'])
        tasks.append(generate_tts(file['text'], dest_path))
    await asyncio.gather(*tasks)
    print("All realistic male voiceovers generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
