import React, { useState, useRef, useEffect, useCallback } from 'react';
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
  const [autoStart, setAutoStart] = useState(false);

  const SIMULATED_TRANSLATION_INTERVAL = 5000;
  const translationIndexRef = useRef(0);

  // Add a ref for the text container
  const translationContainerRef = useRef<HTMLDivElement>(null);

  const checkCameraPermission = async () => {
    try {
      const result = await navigator.permissions.query({ name: "camera" as PermissionName });
      console.log("Camera permission status:", result.state);
      
      if (result.state === "denied") {
        setCameraError("Camera access is blocked. Please change your browser settings to allow camera access.");
        toast.error("Camera access blocked by browser settings", {
          duration: 6000,
          action: {
            label: "Help",
            onClick: () => window.open("https://support.google.com/chrome/answer/2693767", "_blank")
          }
        });
        return false;
      } else if (result.state === "prompt") {
        console.log("Camera permission will be requested when needed");
        return null; // Undetermined
      }
      
      return true; // Granted
    } catch (err) {
      console.error("Permission API not supported:", err);
      return null; // Unknown
    }
  };

  useEffect(() => {
    checkCameraPermission().then(status => {
      console.log("Initial camera permission:", status);
    });
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Your browser doesn't support webcam access. Try using Chrome, Firefox, or Edge.");
    }
  }, []);

  const startWebcam = useCallback(async (customFacingMode?: 'user' | 'environment') => {
    const mode = customFacingMode || facingMode;
    
    try {
      // Check if a previous stream exists and stop it
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      
      // Set loading state
      setIsLoading(true);
      setCameraError(null);
      
      // Request camera access
      console.log(`🎥 Requesting camera access with mode: ${mode}`);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
      });
      console.log("✅ Webcam stream obtained:", stream);

      // Store the stream in ref for later use
      streamRef.current = stream;

      if (videoRef.current) {
        console.log("✅ Video element found, assigning stream");
        
        // Assign stream to video element
        videoRef.current.srcObject = stream;
        
        // Setup metadata loading and playback
        videoRef.current.onloadedmetadata = () => {
          console.log("🎬 Video metadata loaded, attempting playback");
          
          videoRef.current
            ?.play()
            .then(() => {
              console.log("🎥 Video playback started successfully");
              setWebcamActive(true);
              setIsPaused(false);
              setCameraError(null);
              toast.success("Camera connected");
            })
            .catch((err) => {
              console.error("❌ Video playback error:", err);
              toast.error("Video playback failed. Try refreshing the page.");
              setCameraError("Could not play video stream. Try refreshing the page.");
            });
        };
        
        // Add error handler
        videoRef.current.onerror = (event) => {
          console.error("❌ Video element error:", event);
          setCameraError("Video element encountered an error");
        };
      } else {
        console.error("❌ Video element is missing. videoRef.current is null.");
        toast.error("Video element not found");
        setCameraError("Internal error: Video element not found");
      }
    } catch (err: unknown) {
      // Detailed error handling
      if (err instanceof DOMException) {
        if (err.name === 'NotAllowedError') {
          console.error("❌ Camera access denied by user");
          setCameraError("Camera access was denied. Please allow camera access in your browser settings.");
          toast.error("Camera permission denied");
        } else if (err.name === 'NotFoundError') {
          console.error("❌ No camera found");
          setCameraError("No camera was found on your device.");
          toast.error("No camera detected");
        } else {
          console.error(`❌ DOM Exception: ${err.name}`, err);
          setCameraError(`Camera error: ${err.message}`);
          toast.error("Camera error occurred");
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        console.error("❌ Error starting webcam:", errorMessage);
        setCameraError(`Could not access webcam: ${errorMessage}`);
        toast.error("Failed to start webcam");
      }
    } finally {
      setIsLoading(false);
    }
  }, [facingMode]);

  const switchCamera = async () => {
    setIsLoading(true);
    setCameraError(null);
    
    try {
      // Stop current tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      // Toggle facing mode
      const newFacingMode = facingMode === 'user' ? 'environment' : 'user';
      setFacingMode(newFacingMode);
      
      // Temporary disable webcam active state
      setWebcamActive(false);
      
      // Short delay for cleanup
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Re-enable webcam with new facing mode
      setWebcamActive(true);
      
      toast.success(`Switching to ${newFacingMode === 'user' ? 'front' : 'back'} camera`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setCameraError(`Failed to switch camera: ${errorMessage}`);
      toast.error("Camera switching failed");
    } finally {
      setIsLoading(false);
    }
  };

  const stopWebcam = () => {
    setWebcamActive(false); // This will trigger the cleanup in the first useEffect
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setTranslatedText('');
    toast.info("Camera disconnected");
  };

  const togglePause = () => {
    setIsPaused(prev => {
      const newPauseState = !prev;
      
      if (videoRef.current) {
        try {
          if (newPauseState) {
            videoRef.current.pause();
            toast.info("Video paused");
          } else {
            videoRef.current.play()
              .then(() => console.log("▶️ Video resumed"))
              .catch(err => console.error("❌ Error resuming video:", err));
            toast.info("Video resumed");
          }
        } catch (err) {
          console.error("Error toggling video playback:", err);
        }
      }
      
      return newPauseState;
    });
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
    if (!translatedText) return;
    
    if ('speechSynthesis' in window) {
      try {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(translatedText);
        // Set preferred voice and settings
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1.0;
        
        // Add start/end event handlers for better UX
        utterance.onstart = () => {
          console.log("🔊 Speech started");
        };
        
        utterance.onend = () => {
          console.log("🔊 Speech completed");
        };
        
        window.speechSynthesis.speak(utterance);
        toast.info("Speaking text");
      } catch (err) {
        console.error("Speech synthesis failed:", err);
        toast.error("Failed to speak text");
      }
    } else {
      toast.error("Speech synthesis is not supported in this browser");
    }
  };

  const resetTranslation = () => {
    setTranslatedText('');
    toast.info("Translation reset");
  };

  useEffect(() => {
    if (!webcamActive) return;
    
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
    
    // Only simulate in development mode
    if (process.env.NODE_ENV === 'development') {
      console.log("🔄 Starting translation simulation");
      const interval = setInterval(() => {
        if (!isPaused && webcamActive) {
          setTranslatedText(current => {
            const newPhrase = phrases[translationIndexRef.current % phrases.length];
            translationIndexRef.current++;
            return current ? `${current} ${newPhrase}` : newPhrase;
          });
        }
      }, SIMULATED_TRANSLATION_INTERVAL);
      
      return () => {
        console.log("🛑 Cleaning up translation simulation");
        clearInterval(interval);
      };
    }
    
    return () => {}; // Empty cleanup for production mode
  }, [webcamActive, isPaused]);

  // Add this useEffect to handle scrolling
  useEffect(() => {
    if (translationContainerRef.current && translatedText) {
      // Scroll to bottom when text changes
      translationContainerRef.current.scrollTop = translationContainerRef.current.scrollHeight;
    }
  }, [translatedText]);

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  useEffect(() => {
    if (autoStart) {
      startWebcam().catch((err) => console.error("Error starting webcam:", err));
      setAutoStart(false); // Reset flag after starting
    }
  }, [autoStart, startWebcam]);

  // 1. First effect: Get the media stream
  useEffect(() => {
    // Only attempt to get stream when user clicks the button (controlled by webcamActive)
    if (!webcamActive) return;
    
    const acquireMediaStream = async () => {
      try {
        setIsLoading(true);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode },
        });
        console.log("✅ Webcam stream obtained:", stream);
        streamRef.current = stream;
        setCameraError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        console.error("❌ Error starting webcam:", errorMessage);
        setCameraError("Could not access webcam. Please check permissions.");
        toast.error("Failed to start webcam");
        setWebcamActive(false); // Reset state on error
      } finally {
        setIsLoading(false);
      }
    };

    acquireMediaStream();
    
    // Cleanup function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [webcamActive, facingMode]);
  
  // 2. Second effect: Assign stream to video element
  useEffect(() => {
    if (!streamRef.current || !videoRef.current) return;
    
    console.log("✅ Assigning stream to video element");
    videoRef.current.srcObject = streamRef.current;
    
    const handleCanPlay = () => {
      console.log("🎥 Video can play now");
      videoRef.current?.play()
        .then(() => {
          console.log("🎥 Video playback started");
          setIsPaused(false);
        })
        .catch(err => {
          console.error("❌ Video playback error:", err);
          toast.error("Video playback failed");
        });
    };
    
    const videoElement = videoRef.current;
    videoElement?.addEventListener('loadedmetadata', handleCanPlay);
    
    return () => {
      videoElement?.removeEventListener('loadedmetadata', handleCanPlay);
    };
  }, []);

  useEffect(() => {
    if (webcamActive) {
      startWebcam().catch((err) => console.error("Error starting webcam:", err));
    }
  }, [webcamActive, startWebcam]);

  type ActionButtonProps = {
    onClick: () => void;
    disabled?: boolean;
    icon: React.ReactNode;
    label: string;
    variant?: "default" | "outline" | "secondary";
    ariaLabel?: string;
  };
  
  const ActionButton: React.FC<ActionButtonProps> = ({
    onClick,
    disabled = false,
    icon,
    label,
    variant = "default",
    ariaLabel,
  }) => (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={variant}
      className="rounded-md py-2 px-4 flex items-center gap-2"
      aria-label={ariaLabel || label}
    >
      {icon}
      {label}
    </Button>
  );

  const CameraControls: React.FC = () => (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
      {webcamActive ? (
        <>
          {/* Controls when camera is active */}
          <Button onClick={togglePause}>
            {isPaused ? <Play size={20} /> : <PauseCircle size={20} />}
          </Button>
          <Button onClick={switchCamera}>
            <SwitchCamera size={20} />
          </Button>
          <Button onClick={stopWebcam}>
            <CameraOff size={20} />
          </Button>
        </>
      ) : (
        // START CAMERA BUTTON IS HERE
        <Button
          onClick={() => setWebcamActive(true)}
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-4 py-2 flex items-center gap-2"
          disabled={isLoading}
          aria-label="Start camera"
        >
          {isLoading ? <Loader className="animate-spin" size={18} /> : <Camera size={18} />}
          {isLoading ? "Connecting..." : "Start Camera"}
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />

      <main className="flex-1 pt-16 pb-12">
        <div className="container mx-auto px-4 md:px-6"></div>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 animate-fade-in">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Left Panel - Camera */}
              <div className="animate-fade-in">
                <div className="rounded-xl overflow-hidden border bg-card shadow-md relative h-[450px]">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${!webcamActive ? 'hidden' : ''}`}
                  />
                  
                  {cameraError && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-center p-6">
                      <div className="bg-card p-4 rounded-lg max-w-md">
                        <CameraOff className="mx-auto mb-4 text-red-500" size={32} />
                        <p className="text-red-500 font-semibold mb-2">Camera Error</p>
                        <p className="text-sm text-muted-foreground">{cameraError}</p>
                      </div>
                    </div>
                  )}
                  
                  <CameraControls />
                </div>
              </div>

              {/* Right Panel - Translated Text */}
              <div className="animate-fade-in">
                <div className="rounded-xl border bg-card h-[450px] shadow-md flex flex-col">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-medium">Translated Text</h2>
                  </div>
                  <div 
                    ref={translationContainerRef} 
                    className="flex-1 p-4 overflow-auto"
                  >
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
                    <ActionButton
                      onClick={copyToClipboard}
                      disabled={!translatedText}
                      icon={<Copy size={16} />}
                      label="Copy"
                    />
                    <ActionButton
                      onClick={speakText}
                      disabled={!translatedText}
                      icon={<Volume2 size={16} />}
                      label="Speak"
                    />
                    <ActionButton
                      onClick={resetTranslation}
                      disabled={!translatedText}
                      icon={<RotateCcw size={16} />}
                      label="Reset"
                      variant="outline"
                    />
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

