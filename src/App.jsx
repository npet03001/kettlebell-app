import React, { useState, useEffect } from 'react';
import { Dumbbell, Bike, StretchHorizontal, Sun, Moon, Calendar, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultPlan = [...];

const weeklyOverview = [...];

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

  useEffect(() => { ... }, []);
  useEffect(() => { ... }, [log]);
  useEffect(() => { ... }, [plan]);
  useEffect(() => { ... }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const jumpToToday = () => {
    setSelectedDate(new Date().toISOString().slice(0, 10));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const colors = darkMode
    ? { bg: '#121212', text: '#f5f5f5', card: '#1e1e1e', input: '#2c2c2e', border: '#3a3a3c', accent: '#0a84ff', highlight: '#292929', hover: '#1f1f1f' }
    : { bg: '#f2f2f7', text: '#1c1c1e', card: '#ffffff', input: '#ffffff', border: '#d1d1d6', accent: '#007aff', highlight: '#e0e0e0', hover: '#d0d0d0' };

  const styles = { ... };

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
        <motion.div
          key={idx}
          style={styles.overviewCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, backgroundColor: colors.hover }}
          transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
          onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
        >
          <div>{entry.icon}</div>
          <div>
            <h3 style={{ margin: 0 }}>{entry.day}</h3>
            <p style={{ margin: 0 }}>{entry.activity}</p>
          </div>
          {expandedDay === idx && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} transition={{ duration: 0.3 }} style={{ marginTop: 10 }}>
              <ul>
                {plan[idx]?.exercises.map((exercise, i) => (
                  <li key={i} style={{ marginBottom: 4 }}>{exercise}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

export default App;
