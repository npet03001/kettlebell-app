
import React, { useState, useEffect } from 'react';
import { Dumbbell, Bike, StretchHorizontal, Sun, Moon, Calendar, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultPlan = [
  { day: 'Day 1 – Technique & Strength', exercises: ['Kettlebell Snatch', 'Goblet Squat', 'One-Arm Press', 'Plank with Pull'] },
  { day: 'Day 2 – Conditioning', exercises: ['Swings', 'Snatch Intervals', 'Goblet Lunges', 'Burpees'] },
  { day: 'Day 3 – Strength & Core', exercises: ['Front Rack Squats', 'Renegade Rows', 'Suitcase Carry', 'Overhead Walk'] }
];

const weeklyOverview = [
  { day: 'Monday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Strength' },
  { day: 'Tuesday', icon: <Bike size={24} />, activity: 'Cycling + Mobility' },
  { day: 'Wednesday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Conditioning' },
  { day: 'Thursday', icon: <Bike size={24} />, activity: 'Cycling + Core' },
  { day: 'Friday', icon: <Dumbbell size={24} />, activity: 'Kettlebell Core' },
  { day: 'Saturday', icon: <Bike size={24} />, activity: 'Relaxed Cycling' },
  { day: 'Sunday', icon: <StretchHorizontal size={24} />, activity: 'Easy Cycling or Rest' }
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

  const toggleDarkMode = () => setDarkMode(prev => !prev);
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
    nav: { display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' },
    navButton: { backgroundColor: colors.accent, color: '#fff', border: 'none', borderRadius: 10, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
    input: { backgroundColor: colors.input, color: colors.text, border: `1px solid ${colors.border}`, borderRadius: 12, padding: '10px 12px', width: '100%', marginTop: 6 },
    card: { backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    btn: { backgroundColor: colors.accent, color: '#fff', border: 'none', borderRadius: 10, padding: '8px 12px', cursor: 'pointer', marginTop: 8 },
    overviewCard: { backgroundColor: colors.highlight, borderRadius: 12, padding: 12, marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }
  };

  return (
    <motion.div style={styles.page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div style={styles.nav}>
        <button onClick={toggleDarkMode} style={styles.navButton}>
          {darkMode ? <Sun size={18} /> : <Moon size={18} />} {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button onClick={jumpToToday} style={styles.navButton}>
          <Calendar size={18} /> Today
        </button>
      </div>
      <h1>Kettlebell Logbook</h1>
      <AnimatePresence>
        {showToast && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', backgroundColor: colors.accent, color: '#fff', padding: '10px 20px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, zIndex: 1000 }}>
            <CheckCircle size={20} /> Saved successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>Weekly Overview</motion.h2>
      {weeklyOverview.map((entry, idx) => (
        <motion.div key={idx} style={styles.overviewCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05, backgroundColor: colors.hover }}
          transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}>
          <div>{entry.icon}</div>
          <div><h3 style={{ margin: 0 }}>{entry.day}</h3><p style={{ margin: 0 }}>{entry.activity}</p></div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default App;
