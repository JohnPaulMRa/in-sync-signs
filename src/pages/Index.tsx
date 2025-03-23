import React from 'react';
import { Link } from 'react-router-dom';
import { Mic, Video, BookOpen, Activity, ChevronRight, Hand, MessageSquare, Brain } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const Index: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-background via-background/80 to-background' : 'bg-gradient-to-b from-background via-background to-background/30'}`}></div>
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-primary/5' : 'bg-primary/10'} blur-3xl transform -translate-y-1/4 translate-x-1/2`}></div>
            <div className={`absolute top-0 left-1/3 w-80 h-80 rounded-full ${theme === 'dark' ? 'bg-accent/5' : 'bg-accent/10'} blur-3xl transform translate-y-1/4`}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
              Breaking communication barriers
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              ASL to Text Translation. <br /> 
              <span className="text-primary">Accessible for everyone.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              InSync translates American Sign Language into text in real-time, making communication seamless for everyone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/translate" className="button-primary text-base py-6 px-8">
                Start Translating
                <ChevronRight size={16} className="ml-2" />
              </Link>
              <Link to="/learn" className="button-outline text-base py-6 px-8">
                Learn ASL
                <BookOpen size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Breaking Barriers with Technology
            </h2>
            <p className="text-xl text-muted-foreground">
              Our platform combines powerful features to create a seamless translation experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="feature-item p-6 rounded-xl bg-background border shadow-sm">
              <div className="feature-icon">
                <Hand />
              </div>
              <h3 className="feature-title">ASL Recognition</h3>
              <p className="feature-description">
                Advanced computer vision technology to accurately recognize American Sign Language gestures.
              </p>
            </div>

            <div className="feature-item p-6 rounded-xl bg-background border shadow-sm">
              <div className="feature-icon">
                <Brain />
              </div>
              <h3 className="feature-title">Real-time Processing</h3>
              <p className="feature-description">
                Instantaneous translation of signs to text with our high-performance machine learning model.
              </p>
            </div>

            <div className="feature-item p-6 rounded-xl bg-background border shadow-sm">
              <div className="feature-icon">
                <MessageSquare />
              </div>
              <h3 className="feature-title">Text Output</h3>
              <p className="feature-description">
                Clean, accurate text display of translated sign language for seamless communication.
              </p>
            </div>

            <div className="feature-item p-6 rounded-xl bg-background border shadow-sm">
              <div className="feature-icon">
                <Video />
              </div>
              <h3 className="feature-title">Webcam Integration</h3>
              <p className="feature-description">
                Easy-to-use webcam interface that works with any standard camera on your device.
              </p>
            </div>

            <div className="feature-item p-6 rounded-xl bg-background border shadow-sm">
              <div className="feature-icon">
                <BookOpen />
              </div>
              <h3 className="feature-title">Learning Resources</h3>
              <p className="feature-description">
                Comprehensive guides and tutorials to help you learn and practice ASL effectively.
              </p>
            </div>

            <div className="feature-item p-6 rounded-xl bg-background border shadow-sm">
              <div className="feature-icon">
                <Activity />
              </div>
              <h3 className="feature-title">Progress Tracking</h3>
              <p className="feature-description">
                Monitor your learning journey with detailed stats and improvement metrics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                See it in action
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our real-time ASL translator converts sign language to text instantly. Try it yourself or watch our demo.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-primary/10 p-1 rounded-full">
                    <ChevronRight size={16} className="text-primary" />
                  </div>
                  <p className="ml-3">Enable your webcam and start signing</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-primary/10 p-1 rounded-full">
                    <ChevronRight size={16} className="text-primary" />
                  </div>
                  <p className="ml-3">Watch as your signs are translated to text in real-time</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 bg-primary/10 p-1 rounded-full">
                    <ChevronRight size={16} className="text-primary" />
                  </div>
                  <p className="ml-3">Copy the text or have it read aloud for others</p>
                </div>
              </div>
              <div className="mt-10">
                <Link to="/translate" className="button-primary text-base py-3 px-6">
                  Try it now
                </Link>
              </div>
            </div>
            
            <div className="animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border">
                <div className="aspect-video bg-muted animate-pulse-subtle"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 rounded-full bg-primary text-primary-foreground">
                    <Video size={24} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Ready to break communication barriers?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join thousands of users who are already using InSync to communicate more effectively.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup" className="button-primary text-base py-5 px-8">
                Get Started For Free
              </Link>
              <Link to="/learn" className="button-outline text-base py-5 px-8">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
