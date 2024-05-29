import sounddevice as sd
import soundfile as sf
import speech_recognition as sr
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db as firebase_db

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://jarvis-systems-commons-default-rtdb.firebaseio.com/'
})

def store_data_in_firestore(data):
    ref = firebase_db.reference('/voice_inputs')
    ref.set(data)
    print("Data written to Realtime Database.")


def take_voice_input():
    filename = "voice_input.wav"
    duration = 4
    print("Recording...")
    audio_data = sd.rec(int(duration * 44100), samplerate=44100, channels=1, dtype='int16')
    sd.wait()
    sf.write(filename, audio_data, 44100)
    recognizer = sr.Recognizer()
    with sr.AudioFile(filename) as source:
        audio = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio)
        return text.lower()
    except sr.UnknownValueError:
        print("Sorry, I could not understand what you said.")
    except sr.RequestError as e:
        print(f"Could not request results from Google Speech Recognition service; {e}")

while True:
    voice_input = take_voice_input()
    print("You said:", voice_input)
    data = "yes"
    if "yes" in str(voice_input).lower():
        data = "yes"
    elif "bold" in str(voice_input).lower():
        data = "bold"
    elif "no" in str(voice_input).lower():
        data = "no"
    elif "zoom in" in str(voice_input).lower():
        data = "zoom in"
    elif "zoom out" in str(voice_input).lower():
        data = "zoom out"
    elif "italic" in str(voice_input).lower():
        data = "italic"
    elif "underline" in str(voice_input).lower():
        data = "underline"
    elif "delete" in str(voice_input).lower():
        data = "delete"
    elif "print" in str(voice_input).lower():
        data = "print"
    else:
        data = "no"

    store_data_in_firestore(data)
