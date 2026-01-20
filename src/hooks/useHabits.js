import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

export const useHabits = () => {
    const { user } = useAuth();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            setHabits([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'habits'),
            where('userId', '==', user.id)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const habitsData = [];
            querySnapshot.forEach((doc) => {
                habitsData.push({ id: doc.id, ...doc.data() });
            });
            // Sort by creation time (using ID as proxy or adding createdAt field is better, 
            // but for now relying on insertion order or simple sort)
            habitsData.sort((a, b) => b.createdAt - a.createdAt);
            setHabits(habitsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const addHabit = async (nameOrObj, category = 'General') => {
        if (!user) return;

        let name = nameOrObj;
        let habitCategory = category;
        let extraProps = {};

        if (typeof nameOrObj === 'object') {
            name = nameOrObj.name;
            habitCategory = nameOrObj.category || 'General';
            const { name: _, category: __, ...rest } = nameOrObj;
            extraProps = rest;
        }

        await addDoc(collection(db, 'habits'), {
            userId: user.id,
            name,
            category: habitCategory,
            completedDates: [],
            createdAt: Date.now(),
            ...extraProps
        });
    };

    const toggleHabit = async (id) => {
        const habit = habits.find(h => h.id === id);
        if (!habit) return;

        const today = new Date().toISOString().split('T')[0];
        const isCompleted = habit.completedDates.includes(today);

        const newCompletedDates = isCompleted
            ? habit.completedDates.filter(d => d !== today)
            : [...habit.completedDates, today];

        const habitRef = doc(db, 'habits', id);
        await updateDoc(habitRef, {
            completedDates: newCompletedDates
        });
    };

    const deleteHabit = async (id) => {
        await deleteDoc(doc(db, 'habits', id));
    };

    const getStats = () => {
        const today = new Date().toISOString().split('T')[0];
        const totalHabits = habits.length;
        if (totalHabits === 0) return { completion: 0, completedCount: 0, total: 0 };

        const completedToday = habits.filter(h => h.completedDates.includes(today)).length;
        const completionRate = Math.round((completedToday / totalHabits) * 100);

        return {
            completion: completionRate,
            completedCount: completedToday,
            total: totalHabits
        };
    };

    const getAISuggestions = () => {
        const stats = getStats();
        if (habits.length === 0) return "Start by adding your first habit to track!";

        if (stats.completion === 100) return "🔥 Incredible! You've crushed all your goals today. Keep this streak alive!";
        if (stats.completion >= 50) return "🚀 You're halfway there! Finish strong to build an unbreakable streak.";
        if (stats.completion > 0) return "👀 Good start! Focus on one more habit to build momentum.";

        return "💡 The best time to start is now. Pick the easiest habit and get it done!";
    };

    return {
        habits,
        loading,
        toggleHabit,
        addHabit,
        deleteHabit,
        getStats,
        getAISuggestions
    };
};
