import React, { useState, useEffect } from 'react';
import { Dumbbell, Bike, StretchHorizontal, Sun, Moon, Calendar, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultPlan = [
  { day: 'Strength', exercises: ['Kettlebell Snatch', 'Goblet Squat', 'One-Arm Press', 'Plank with Pull'] },
  { day: 'Conditioning', exercises: ['Kettlebell Swings', 'Snatch Intervals', 'Goblet Lunges', 'Burpees'] },
  { day: 'Core & Carries', exercises: ['Front Rack Squats', 'Renegade Rows', 'Suitcase Carry', 'Overhead Walk'] }
];

const weeklyOverview = [
  { day: 'Monday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Training – Strength' },
  { day: 'Tuesday', icon: <Bike size={24} />, activity: 'Cycling + Mobility' },
  { day: 'Wednesday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Training – Conditioning' },
  { day: 'Thursday', icon: <Bike size={24} />, activity: 'Cycling + Core' },
  { day: 'Friday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Training – Core & Carries' },
  { day: 'Saturday', icon: <Bike size={24} />, activity: 'Relaxed Cycling 1h' },
  { day: 'Sunday', icon: <StretchHorizontal size={24} />, activity: 'Recovery or Easy Bike' }
];

function App() {
  const [log, setLog] = useState({});
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [plan, setPlan] = useState(() => {
    const stored = localStorage.getItem('kettlebellPlan');
    return stored ? JSON.parse(stored) : defaultPlan;
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('kbDarkMode') === 'true');
  const [showToast, setShowToast] = useState(false);
  const [expandedDay, setExpandedDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const jumpToToday = () => {
    setSelectedDate(new Date().toISOString().slice(0, 10));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const getPlanForDay = (day) => {
    if (day === 'Monday') return plan[0];
    if (day === 'Wednesday') return plan[1];
    if (day === 'Friday') return plan[2];
    return null;
  };

  const colors = darkMode
    ? { bg: '#111', text: '#eee', card: '#1a1a1a', input: '#222', border: '#333', accent: '#0a84ff', highlight: '#2a2a2a', hover: '#252525' }
    : { bg: '#fafafa', text: '#111', card: '#fff', input: '#fff', border: '#ccc', accent: '#007aff', highlight: '#f0f0f0', hover: '#e0e0e0' };

  const styles = {
  page: { backgroundColor: colors.bg, color: colors.text, minHeight: '100vh', padding: 16, fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, sans-serif', maxWidth: 500, margin: '0 auto' },
  nav: { display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' },
  navButton: { backgroundColor: colors.accent, color: '#fff', border: 'none', borderRadius: 8, padding: '6px 10px', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' },
  overviewCard: { backgroundColor: colors.card, borderRadius: 12, padding: 12, marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }
};

  if (loading) {
    return (
      <motion.div style={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.div initial={{ rotate: 0 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          style={{ textAlign: 'center', marginTop: '40vh', fontSize: 32, color: colors.accent }}>
          🏋️‍♂️
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div style={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div style={styles.nav}>...</div>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>Kettlebell Logbook</h1>
      <AnimatePresence>...</AnimatePresence>
      <motion.h2 style={{ fontSize: 18, marginTop: 20 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Weekly Overview</motion.h2>
      {weeklyOverview.map((entry, idx) => {
        const dayPlan = getPlanForDay(entry.day);
        return (
          <motion.div key={idx} style={styles.overviewCard} whileHover={{ scale: 1.02, backgroundColor: colors.hover }} transition={{ type: 'spring', stiffness: 300 }} onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
              {entry.icon}
              <div>
                <h3 style={{ margin: 0, fontSize: 16 }}>{entry.day}</h3>
                <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>{entry.activity}</p>
              </div>
            </div>
            <motion.div animate={{ rotate: expandedDay === idx ? 90 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronRight size={16} />
            </motion.div>
            {expandedDay === idx && dayPlan && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} style={{ width: '100%', marginTop: 10 }}>
                <ul style={{ paddingLeft: 20 }}>
                  {dayPlan.exercises.map((exercise, i) => (
                    <li key={i} style={{ fontSize: 13, marginBottom: 4 }}>{exercise}</li>
                  ))}
                </ul>
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default App;
