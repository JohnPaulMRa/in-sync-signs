import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import { Award, Heart, BarChart, RefreshCw, MessageSquare, HandMetal } from 'lucide-react';

const About: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />

      <main className="flex-1 pt-32 pb-20">
        {/* Hero Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Our Mission
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Breaking Communication Barriers Through Technology
              </h1>
              <p className="text-xl text-muted-foreground">
                We're on a mission to make communication accessible for everyone, regardless of their hearing abilities.
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Our Vision</h2>
                <p className="text-muted-foreground">
                  At InSync, we envision a world where communication is effortless for everyone, regardless of hearing ability. Our platform is designed to break down the barriers between ASL and spoken language, using technology as the bridge.
                </p>
                <p className="text-muted-foreground">
                  We believe that through innovation, education, and accessibility, we can create a more inclusive society where every voice is heard and understood.
                </p>
              </div>
              <div className="animate-fade-in">
                <div className="aspect-video bg-gradient-to-br from-primary/5 to-primary/20 rounded-2xl flex items-center justify-center">
                  <HandMetal size={72} className="text-primary" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground">
                These principles guide everything we do, from product development to community engagement.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card border rounded-xl p-6 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Award size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for excellence in our technology, pushing the boundaries of what's possible to create the most accurate and reliable ASL translation tools.
                </p>
              </div>
              
              <div className="bg-card border rounded-xl p-6 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Heart size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Inclusivity</h3>
                <p className="text-muted-foreground">
                  We believe in creating products that are accessible to everyone, regardless of ability, background, or resources.
                </p>
              </div>
              
              <div className="bg-card border rounded-xl p-6 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <RefreshCw size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously innovate to improve our technology, embracing new ideas and approaches to solve complex communication challenges.
                </p>
              </div>
              
              <div className="bg-card border rounded-xl p-6 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <MessageSquare size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Communication</h3>
                <p className="text-muted-foreground">
                  We believe effective communication is a fundamental human right, and we're committed to making it accessible to all.
                </p>
              </div>
              
              <div className="bg-card border rounded-xl p-6 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <BarChart size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Impact</h3>
                <p className="text-muted-foreground">
                  We measure our success by the positive impact we have on people's lives, improving connections and opportunities through our technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground">
                A diverse group of passionate individuals dedicated to creating a more accessible world.
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Team Member 1 */}
              <div className="bg-card border rounded-xl overflow-hidden animate-fade-in">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground mb-2">Founder & CEO</p>
                  <p className="text-sm">
                    ASL advocate with 15+ years of experience in accessibility technology.
                  </p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-card border rounded-xl overflow-hidden animate-fade-in">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">David Chen</h3>
                  <p className="text-sm text-muted-foreground mb-2">CTO</p>
                  <p className="text-sm">
                    ML expert specializing in computer vision and gesture recognition.
                  </p>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-card border rounded-xl overflow-hidden animate-fade-in">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">Maya Patel</h3>
                  <p className="text-sm text-muted-foreground mb-2">Design Director</p>
                  <p className="text-sm">
                    UX specialist focused on creating accessible digital experiences.
                  </p>
                </div>
              </div>
              
              {/* Team Member 4 */}
              <div className="bg-card border rounded-xl overflow-hidden animate-fade-in">
                <div className="aspect-square bg-muted"></div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold">James Wilson</h3>
                  <p className="text-sm text-muted-foreground mb-2">Education Lead</p>
                  <p className="text-sm">
                    ASL educator with a passion for making sign language accessible to all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto bg-card border rounded-2xl p-8 md:p-12 text-center animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Join Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a user, developer, investor, or advocate, there are many ways to be part of our journey to make communication accessible for all.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/careers" className="button-primary">
                  View Open Positions
                </a>
                <a href="/contact" className="button-outline">
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
