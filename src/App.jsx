import React, { useState, useEffect } from 'react';
import { Dumbbell, Bike, StretchHorizontal, Sun, Moon, Calendar, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultPlan = [
  {
    day: 'Day 1 – Technique & Strength',
    exercises: [
      'Kettlebell Snatch – 10 reps per side',
      'Goblet Squat – 12–15 reps',
      'One-Arm Press – 6–8 reps per side',
      'Plank with Kettlebell Pull – 6–8 per side'
    ]
  },
  {
    day: 'Day 2 – Conditioning',
    exercises: [
      'Kettlebell Swings – 20 reps',
      'Snatch Intervals – 10 per side',
      'Goblet Lunges – 8–10 per leg',
      'Burpees – 10 reps'
    ]
  },
  {
    day: 'Day 3 – Strength & Core',
    exercises: [
      'Front Rack Squats – 8–10 reps',
      'Renegade Rows – 6–8 per side',
      'Suitcase Carry – 30 sec per side',
      'Overhead Walk – 20–30 sec per side'
    ]
  }
];

const weeklyOverview = [
  { day: 'Monday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Training – Strength' },
  { day: 'Tuesday', icon: <Bike size={24} />, activity: '1h Cycling + Mobility' },
  { day: 'Wednesday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Training – Conditioning' },
  { day: 'Thursday', icon: <Bike size={24} />, activity: '1h Cycling + Core Training' },
  { day: 'Friday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Training – Core & Carries' },
  { day: 'Saturday', icon: <Bike size={24} />, activity: 'Relaxed Cycling 1h' },
  { day: 'Sunday', icon: <StretchHorizontal size={24} />, activity: 'Very Easy Cycling or Full Rest' }
];

export default function App() {
  const [log, setLog] = useState({});
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [plan, setPlan] = useState(() => {
    const stored = localStorage.getItem('kettlebellPlan');
    return stored ? JSON.parse(stored) : defaultPlan;
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('kbDarkMode') === 'true');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kettlebellLog');
    if (saved) setLog(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('kettlebellLog', JSON.stringify(log));
    if (Object.keys(log).length > 0) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, [log]);

  useEffect(() => {
    localStorage.setItem('kettlebellPlan', JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem('kbDarkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const jumpToToday = () => {
    setSelectedDate(new Date().toISOString().slice(0, 10));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const colors = darkMode
    ? { bg: '#121212', text: '#f5f5f5', card: '#1e1e1e', input: '#2c2c2e', border: '#3a3a3c', accent: '#0a84ff', highlight: '#292929', hover: '#1f1f1f' }
    : { bg: '#f2f2f7', text: '#1c1c1e', card: '#ffffff', input: '#ffffff', border: '#d1d1d6', accent: '#007aff', highlight: '#e0e0e0', hover: '#d0d0d0' };

  const styles = {
    page: { backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', padding: 20, fontFamily: '-apple-system', maxWidth: 600, margin: '0 auto' },
    input: { backgroundColor: colors.input, color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '10px 12px', width: '100%', marginTop: 6 },
    card: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    btn: { backgroundColor: colors.accent, color: '#fff', border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', marginTop: 8 },
    overviewCard: { backgroundColor: colors.highlight, borderRadius: 12, padding: 12, marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }
  };

  return (
    <motion.div style={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      {/* Navigation and Toast */}
    </motion.div>
  );
}
