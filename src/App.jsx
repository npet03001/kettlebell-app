import React, { useState, useEffect } from 'react';
import { Dumbbell, Bike, StretchHorizontal, Sun, Moon, Calendar, CheckCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultPlan = [
  { day: 'Day 1 – Strength', exercises: ['Kettlebell Snatch', 'Goblet Squat', 'One-Arm Press', 'Plank with Pull'] },
  { day: 'Day 2 – Conditioning', exercises: ['Kettlebell Swings', 'Snatch Intervals', 'Goblet Lunges', 'Burpees'] },
  { day: 'Day 3 – Core & Carries', exercises: ['Front Rack Squats', 'Renegade Rows', 'Suitcase Carry', 'Overhead Walk'] }
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
  ...
}

export default App;
