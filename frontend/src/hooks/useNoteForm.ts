import { useState } from 'react';
import { Theme, Record } from '../types';
import { DEFAULT_THEME_COUNT } from '../constants';

export const useNoteForm = () => {
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [themeList, setThemeList] = useState<Theme[]>(
    Array.from({ length: DEFAULT_THEME_COUNT }, () => ({ text: '', score: null }))
  );
  const [records, setRecords] = useState<Record[]>([
    { opponent: '', score1: '', score2: '' }
  ]);
  const [didList, setDidList] = useState<string[]>(['']);
  const [learnedList, setLearnedList] = useState<string[]>(['']);
  const [nextList, setNextList] = useState<string[]>(['']);

  const resetForm = () => {
    setDate('');
    setLocation('');
    setThemeList(Array.from({ length: DEFAULT_THEME_COUNT }, () => ({ text: '', score: null })));
    setRecords([{ opponent: '', score1: '', score2: '' }]);
    setDidList(['']);
    setLearnedList(['']);
    setNextList(['']);
  };

  const loadNoteData = (noteData: any) => {
    setDate(noteData.date || '');
    setLocation(noteData.location || '');
    setThemeList(noteData.themes || Array.from({ length: DEFAULT_THEME_COUNT }, () => ({ text: '', score: null })));
    setRecords(noteData.records || [{ opponent: '', score1: '', score2: '' }]);
    setDidList(noteData.didList || ['']);
    setLearnedList(noteData.learnedList || ['']);
    setNextList(noteData.nextList || ['']);
  };

  const getFormData = () => ({
    date,
    location,
    themes: themeList,
    records,
    didList,
    learnedList,
    nextList,
  });

  return {
    date,
    setDate,
    location,
    setLocation,
    themeList,
    setThemeList,
    records,
    setRecords,
    didList,
    setDidList,
    learnedList,
    setLearnedList,
    nextList,
    setNextList,
    resetForm,
    loadNoteData,
    getFormData,
  };
}; 