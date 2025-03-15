
import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Copy, Volume2, Check, RotateCcw, PauseCircle, Play } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Translate: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [webcamActive, setWebcamActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start webcam feed
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setWebcamActive(true);
        setIsPaused(false);
        // In a real app, this is where you would start the sign language detection
        simulateTranslation();
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  // Stop webcam feed
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
      setWebcamActive(false);
      setTranslatedText('');
    }
  };

  // Toggle pause/resume
  const togglePause = () => {
    setIsPaused(!isPaused);
    if (videoRef.current) {
      if (!isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  // Copy text to clipboard
  const copyToClipboard = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  // Text-to-speech function
  const speakText = () => {
    if (translatedText && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Reset the translation
  const resetTranslation = () => {
    setTranslatedText('');
  };

  // Simulate translation (in a real app, this would be replaced with actual ML model)
  const simulateTranslation = () => {
    const phrases = [
      "Hello, how are you?",
      "My name is John",
      "Nice to meet you",
      "Thank you for your help",
      "I am learning sign language",
      "Can you help me?",
      "I understand",
      "I don't understand",
      "Please repeat that",
      "Good morning"
    ];
    
    let index = 0;
    
    const interval = setInterval(() => {
      if (!isPaused && webcamActive) {
        setTranslatedText(current => {
          const newPhrase = phrases[index % phrases.length];
          index++;
          return current ? `${current} ${newPhrase}` : newPhrase;
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                ASL to Text Translator
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Enable your camera and start signing. Our technology will translate your gestures into text in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Webcam Display */}
              <div className="animate-fade-in">
                <div className="rounded-2xl overflow-hidden border bg-muted/30 shadow-lg aspect-video relative">
                  {webcamActive ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted 
                      playsInline
                      className="w-full h-full object-cover"
                    ></video>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-6">
                        <CameraOff size={48} className="mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-4">Camera is currently disabled</p>
                        <button 
                          onClick={startWebcam}
                          className="button-primary"
                        >
                          <Camera size={16} className="mr-2" />
                          Enable Camera
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Camera controls overlay */}
                  {webcamActive && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
                      <button 
                        onClick={togglePause}
                        className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background text-foreground transition-colors"
                        aria-label={isPaused ? "Resume" : "Pause"}
                      >
                        {isPaused ? <Play size={20} /> : <PauseCircle size={20} />}
                      </button>
                      <button 
                        onClick={stopWebcam}
                        className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background text-foreground transition-colors"
                        aria-label="Stop camera"
                      >
                        <CameraOff size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Text Output */}
              <div className="animate-fade-in">
                <div className="rounded-2xl border bg-background h-full shadow-lg flex flex-col">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-medium">Translated Text</h2>
                    <div className="flex space-x-2">
                      <button 
                        onClick={resetTranslation}
                        disabled={!translatedText}
                        className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-50"
                        aria-label="Reset translation"
                      >
                        <RotateCcw size={16} />
                      </button>
                      <button 
                        onClick={speakText}
                        disabled={!translatedText}
                        className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-50"
                        aria-label="Read aloud"
                      >
                        <Volume2 size={16} />
                      </button>
                      <button 
                        onClick={copyToClipboard}
                        disabled={!translatedText}
                        className="p-2 rounded-full hover:bg-muted transition-colors disabled:opacity-50"
                        aria-label="Copy to clipboard"
                      >
                        {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-auto">
                    {translatedText ? (
                      <p className="whitespace-pre-wrap break-words">{translatedText}</p>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center">
                        <p className="text-muted-foreground">
                          {webcamActive 
                            ? "Start signing to see translation here..." 
                            : "Enable your camera to start translating"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-muted/30 rounded-2xl p-6 border animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">How to use the translator</h2>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Click "Enable Camera" to allow access to your webcam</li>
                <li>Position yourself in the frame where your hand gestures are clearly visible</li>
                <li>Start signing using American Sign Language (ASL)</li>
                <li>Your signs will be translated to text in real-time in the panel on the right</li>
                <li>Use the controls to copy, have the text read aloud, or reset the translation</li>
              </ol>
              <div className="mt-4 p-4 bg-background rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> For best results, ensure good lighting and a clear background. The translator works best with standard ASL signs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Translate;
