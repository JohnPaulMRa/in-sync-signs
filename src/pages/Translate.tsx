
import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Copy, Volume2, RotateCcw, PauseCircle, Play, Loader, SwitchCamera } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const Translate: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [webcamActive, setWebcamActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [translatedText, setTranslatedText] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startWebcam = async () => {
    setIsLoading(true);
    setCameraError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: facingMode
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setWebcamActive(true);
        setIsPaused(false);
        toast.success("Camera connected successfully");
        simulateTranslation();
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setCameraError(
        errorMsg.includes("Permission denied") 
          ? "Camera access was denied. Please allow camera access in your browser settings."
          : "Couldn't connect to your camera. Please make sure it's connected and working properly."
      );
      toast.error("Camera connection failed");
    } finally {
      setIsLoading(false);
    }
  };

  const switchCamera = async () => {
    // Stop the current stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
    }
    
    // Toggle facing mode
    const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(newFacingMode);
    
    // Restart with new facing mode
    setWebcamActive(false);
    setTimeout(() => {
      startWebcam();
    }, 300);
    
    toast.info(`Switched to ${newFacingMode === 'user' ? 'front' : 'back'} camera`);
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      streamRef.current = null;
      setWebcamActive(false);
      setTranslatedText('');
      toast.info("Camera disconnected");
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (videoRef.current) {
      if (!isPaused) {
        videoRef.current.pause();
        toast.info("Video paused");
      } else {
        videoRef.current.play();
        toast.info("Video resumed");
      }
    }
  };

  const copyToClipboard = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText)
        .then(() => {
          setCopySuccess(true);
          toast.success("Text copied to clipboard");
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          toast.error("Failed to copy text");
        });
    }
  };

  const speakText = () => {
    if (translatedText && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      window.speechSynthesis.speak(utterance);
      toast.info("Speaking text");
    }
  };

  const resetTranslation = () => {
    setTranslatedText('');
    toast.info("Translation reset");
  };

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

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />

      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                ASL to Text Translator
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Enable your camera and start signing. Our technology will translate your gestures into text in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {/* Left Panel - Camera */}
              <div className="animate-fade-in">
                <div className="rounded-xl overflow-hidden border bg-card shadow-md relative aspect-video">
                  {webcamActive ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      muted 
                      playsInline
                      className="w-full h-full object-cover"
                    ></video>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-16">
                      {isLoading ? (
                        <>
                          <Loader size={48} className="mx-auto mb-4 text-primary animate-spin" />
                          <p className="text-muted-foreground mb-4">Connecting to camera...</p>
                        </>
                      ) : (
                        <>
                          <Camera size={64} className="mx-auto mb-4 text-primary/60" />
                          <p className="text-muted-foreground text-lg mb-5">Camera is currently off</p>
                          <Button 
                            onClick={startWebcam}
                            disabled={isLoading}
                            className="bg-primary hover:bg-primary/90 text-white rounded-md py-2 px-4 flex items-center gap-2"
                          >
                            <Camera size={18} />
                            Start Camera
                          </Button>
                        </>
                      )}
                    </div>
                  )}

                  {webcamActive && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
                      <Button 
                        onClick={togglePause}
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        aria-label={isPaused ? "Resume" : "Pause"}
                      >
                        {isPaused ? <Play size={20} /> : <PauseCircle size={20} />}
                      </Button>
                      <Button 
                        onClick={switchCamera}
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        aria-label="Switch camera"
                      >
                        <SwitchCamera size={20} />
                      </Button>
                      <Button 
                        onClick={stopWebcam}
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
                        aria-label="Stop camera"
                      >
                        <CameraOff size={20} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Panel - Translated Text */}
              <div className="animate-fade-in">
                <div className="rounded-xl border bg-card h-full shadow-md flex flex-col">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-medium">Translated Text</h2>
                  </div>
                  <div className="flex-1 p-4 overflow-auto">
                    {translatedText ? (
                      <p className="whitespace-pre-wrap break-words">{translatedText}</p>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center">
                        <p className="text-muted-foreground bg-card rounded-lg p-4 w-full">
                          Enable your camera to start translating...
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 pt-0 flex flex-wrap justify-center gap-2">
                    <Button 
                      onClick={copyToClipboard}
                      disabled={!translatedText}
                      variant="default"
                      className="rounded-md py-2 px-4 flex items-center gap-2"
                      aria-label="Copy to clipboard"
                    >
                      <Copy size={16} />
                      Copy
                    </Button>
                    <Button 
                      onClick={speakText}
                      disabled={!translatedText}
                      variant="default"
                      className="rounded-md py-2 px-4 flex items-center gap-2"
                      aria-label="Read aloud"
                    >
                      <Volume2 size={16} />
                      Speak
                    </Button>
                    <Button 
                      onClick={resetTranslation}
                      disabled={!translatedText}
                      variant="outline"
                      className="rounded-md py-2 px-4 flex items-center gap-2"
                      aria-label="Reset translation"
                    >
                      <RotateCcw size={16} />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/20 rounded-xl p-6 border animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">How to use the translator</h2>
              <ol className="space-y-3 list-decimal pl-5">
                <li>Click "Start Camera" to allow access to your webcam</li>
                <li>Position yourself in the frame where your hand gestures are clearly visible</li>
                <li>Start signing using American Sign Language (ASL)</li>
                <li>Your signs will be translated to text in real-time in the panel on the right</li>
                <li>Use the controls to copy, have the text read aloud, or reset the translation</li>
              </ol>
              <div className="mt-4 p-4 bg-card rounded-lg border">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> For best results, ensure good lighting and a clear background. The translator works best with standard ASL signs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Translate;
