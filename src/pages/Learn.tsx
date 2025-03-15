
import React, { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, ChevronRight, Search, CheckCircle, Filter, GraduationCap, Hand, Clock } from 'lucide-react';

interface LessonCard {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  completed?: boolean;
}

const lessons: LessonCard[] = [
  {
    id: '1',
    title: 'ASL Alphabet Basics',
    description: 'Learn the foundational hand shapes for each letter of the alphabet in American Sign Language.',
    level: 'Beginner',
    duration: '15 min',
    completed: true
  },
  {
    id: '2',
    title: 'Common Greetings',
    description: 'Master everyday greetings and introductions to start conversations in ASL.',
    level: 'Beginner',
    duration: '20 min',
    completed: true
  },
  {
    id: '3',
    title: 'Numbers and Counting',
    description: 'Learn how to count and express numerical values in American Sign Language.',
    level: 'Beginner',
    duration: '25 min'
  },
  {
    id: '4',
    title: 'Family and Relationships',
    description: 'Signs for family members and expressing relationships between people.',
    level: 'Intermediate',
    duration: '30 min'
  },
  {
    id: '5',
    title: 'Food and Dining',
    description: 'Learn vocabulary related to food, drinks, and restaurant interactions.',
    level: 'Intermediate',
    duration: '35 min'
  },
  {
    id: '6',
    title: 'Travel and Directions',
    description: 'Signs for locations, transportation, and giving/receiving directions.',
    level: 'Intermediate',
    duration: '40 min'
  },
  {
    id: '7',
    title: 'Emotional Expressions',
    description: 'Communicate feelings and emotions with nuanced facial expressions and signs.',
    level: 'Advanced',
    duration: '45 min'
  },
  {
    id: '8',
    title: 'Medical and Emergency Terms',
    description: 'Essential vocabulary for health-related situations and emergencies.',
    level: 'Advanced',
    duration: '50 min'
  }
];

const Learn: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string | null>(null);
  
  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter ? lesson.level === levelFilter : true;
    
    return matchesSearch && matchesLevel;
  });
  
  const resetFilters = () => {
    setSearchQuery('');
    setLevelFilter(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar toggleTheme={toggleTheme} isDarkTheme={theme === 'dark'} />

      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-block px-3 py-1 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full">
                Learning Resources
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Master American Sign Language
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive library of ASL lessons and practice exercises to improve your signing skills.
              </p>
            </div>
            
            {/* Progress Section */}
            <div className="mb-12 animate-fade-in">
              <div className="bg-muted/30 rounded-2xl p-6 md:p-8 border">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Your Learning Progress</h2>
                    <p className="text-muted-foreground">Continue where you left off</p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <div className="w-full md:w-48 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    <span className="ml-3 text-sm font-medium">25%</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-background rounded-xl p-4 border shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-semibold">2/8</p>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <CheckCircle size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-4 border shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Time Spent</p>
                        <p className="text-2xl font-semibold">1.5 hrs</p>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Clock size={20} />
                      </div>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-4 border shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Signs Learned</p>
                        <p className="text-2xl font-semibold">48</p>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Hand size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Search and Filters */}
            <div className="mb-8 animate-fade-in">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search lessons..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <select
                      value={levelFilter || ''}
                      onChange={(e) => setLevelFilter(e.target.value === '' ? null : e.target.value)}
                      className="appearance-none pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      aria-label="Filter by level"
                    >
                      <option value="">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <Filter size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                  {(searchQuery || levelFilter) && (
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 border rounded-lg hover:bg-muted transition-colors"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Lessons Grid */}
            <div className="animate-fade-in">
              {filteredLessons.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredLessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="group border rounded-xl overflow-hidden bg-background hover:shadow-md transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              lesson.level === 'Beginner' ? 'bg-green-100 text-green-600' :
                              lesson.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              <GraduationCap size={16} />
                            </div>
                            <span className="ml-2 text-xs font-medium text-muted-foreground">
                              {lesson.level}
                            </span>
                          </div>
                          {lesson.completed && (
                            <div className="bg-primary/10 text-primary px-2 py-1 text-xs font-medium rounded-full">
                              Completed
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{lesson.title}</h3>
                        <p className="text-muted-foreground text-sm mb-6">{lesson.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock size={14} className="mr-1" />
                            <span>{lesson.duration}</span>
                          </div>
                          <a 
                            href={`/learn/${lesson.id}`}
                            className="flex items-center text-primary hover:underline text-sm font-medium"
                          >
                            Start lesson
                            <ChevronRight size={16} className="ml-1 transform group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-xl bg-muted/30">
                  <BookOpen size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No lessons found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  <button
                    onClick={resetFilters}
                    className="mt-4 button-outline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Learn;
