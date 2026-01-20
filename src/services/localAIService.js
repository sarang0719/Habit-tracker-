// Local AI Engine - Runs entirely in the browser
// Uses rule-based logic and pattern matching to simulate an intelligent coach

const KNOWLEDGE_BASE = {
    motivation: [
        "You don't have to be great to start, but you have to start to be great.",
        "Consistency is what transforms average into excellence.",
        "Every action you take is a vote for the type of person you wish to become.",
        "The secret of your future is hidden in your daily routine.",
        "Don't stop when you're tired. Stop when you're done."
    ],
    tips: [
        "Try stacking a new habit on top of an existing one. It's called 'Habit Stacking'.",
        "If you seek to build a habit, start small. So small you can't say no.",
        "Track your streaks. Seeing a visual chain of success is highly motivating.",
        "Prepare your environment. Make good habits visible and bad habits invisible.",
        "The 2-minute rule: If it takes less than 2 minutes, do it now."
    ],
    greetings: [
        "Hello! Ready to crush some goals today?",
        "Hi there! I'm your private AI Coach. How can I help?",
        "Greetings! Let's make today productive."
    ],
    healthy_food: [
        "Eat the rainbow: Colorful fruits and vegetables provide a wide range of essential vitamins and minerals.",
        "Hydration key: Drink a glass of water before every meal to aid digestion and control appetite.",
        "Protein power: Include a source of protein in every meal to keep you full and support muscle repair.",
        "Healthy fats: Avocados, nuts, and olive oil are great for brain health and sustained energy.",
        "Limit processed sugar: Swap sugary snacks for whole fruits to avoid energy crashes."
    ],
    daily_habits: [
        "Morning movement: Stretch or walk for 10 minutes immediately after waking up to boost energy.",
        "Digital detox: Avoid screens for at least 30 minutes before bed to improve sleep quality.",
        "Gratitude practice: Write down three things you are grateful for every day to boost positivity.",
        "Deep work: Set aside a focused 90-minute block for your most important task of the day.",
        "Read daily: Even 10 minutes of reading a day can significantly expand your knowledge over time."
    ],
    vegetables: [
        "Leafy Greens: Spinach, Kale, Lettuce, Swiss Chard - Packed with vitamins A, C, and K.",
        "Cruciferous: Broccoli, Cauliflower, Brussels Sprouts - Great for fighting inflammation.",
        "Root Vegetables: Carrots, Beets, Sweet Potatoes - Excellent sources of fiber and complex carbs.",
        "Allium Family: Onions, Garlic, Leeks - Known for their immune-boosting properties.",
        "Nightshades: Tomatoes, Bell Peppers, Eggplant - Versatile and rich in antioxidants."
    ],
    fruits: [
        "Berries: Blueberries, Strawberries, Raspberries - Lower sugar and high in antioxidants.",
        "Citrus: Oranges, Lemons, Grapefruits - Famous for Vitamin C and immune support.",
        "Tropical: Bananas, Mangoes, Pineapples - Great specifically for energy, but mind the sugar content!",
        "Pome Fruits: Apples, Pears - High in fiber and great for a quick snack.",
        "Stone Fruits: Peaches, Plums, Cherries - Delicious and rich in vitamins."
    ],
    supplements: [
        "General Health: Multivitamins, Vitamin D3 (sunshine vitamin), Omega-3 Fish Oil.",
        "Energy: caffeine (in moderation), Vitamin B12, Iron (if deficient).",
        "Recovery: Magnesium (great for sleep), Zinc, Protein Powder (whey or plant-based).",
        "Gut Health: Probiotics, Fiber supplements (Psyllium husk).",
        "Note: Supplements are add-ons. Real food comes first! Always consult a doc."
    ],
    nutrition_table: {
        // Proteins
        'chicken': { protein: '31g', carbs: '0g', fat: '3.6g', cal: '165' },
        'breast': { protein: '31g', carbs: '0g', fat: '3.6g', cal: '165' }, // Alias for chicken breast
        'egg': { protein: '6g', carbs: '0.6g', fat: '5g', cal: '78' },
        'beef': { protein: '26g', carbs: '0g', fat: '15g', cal: '250' }, // 85% lean
        'salmon': { protein: '20g', carbs: '0g', fat: '13g', cal: '208' },
        'tuna': { protein: '28g', carbs: '0g', fat: '1g', cal: '132' }, // Canned in water
        'tofu': { protein: '8g', carbs: '2g', fat: '4.8g', cal: '76' },
        'lentils': { protein: '9g', carbs: '20g', fat: '0.4g', cal: '116' }, // Cooked
        'yogurt': { protein: '10g', carbs: '3.6g', fat: '0.4g', cal: '59' }, // Greek plain non-fat

        // Carbs/Grains
        'rice': { protein: '2.7g', carbs: '28g', fat: '0.3g', cal: '130' }, // White cooked
        'brown rice': { protein: '2.6g', carbs: '23g', fat: '0.9g', cal: '111' },
        'oats': { protein: '2.5g', carbs: '12g', fat: '1.4g', cal: '71' }, // Cooked in water
        'potato': { protein: '2g', carbs: '17g', fat: '0.1g', cal: '77' }, // Boiled
        'sweet potato': { protein: '1.6g', carbs: '20g', fat: '0.1g', cal: '86' },
        'pasta': { protein: '5g', carbs: '25g', fat: '1.1g', cal: '131' },
        'bread': { protein: '3.6g', carbs: '18g', fat: '1g', cal: '79' }, // Slice whole wheat

        // Fruits (Expanded)
        'apple': { protein: '0.3g', carbs: '14g', fat: '0.2g', cal: '52' },
        'banana': { protein: '1.3g', carbs: '27g', fat: '0.3g', cal: '105' },
        'orange': { protein: '0.9g', carbs: '12g', fat: '0.1g', cal: '47' },
        'grapes': { protein: '0.7g', carbs: '18g', fat: '0.2g', cal: '69' },
        'strawberry': { protein: '0.7g', carbs: '8g', fat: '0.3g', cal: '32' },
        'blueberry': { protein: '0.7g', carbs: '14g', fat: '0.3g', cal: '57' },
        'watermelon': { protein: '0.6g', carbs: '8g', fat: '0.2g', cal: '30' },
        'pineapple': { protein: '0.5g', carbs: '13g', fat: '0.1g', cal: '50' },
        'mango': { protein: '0.8g', carbs: '15g', fat: '0.4g', cal: '60' },
        'peach': { protein: '0.9g', carbs: '10g', fat: '0.3g', cal: '39' },
        'pear': { protein: '0.4g', carbs: '15g', fat: '0.1g', cal: '57' },
        'cherry': { protein: '1g', carbs: '12g', fat: '0.3g', cal: '50' },
        'kiwi': { protein: '1.1g', carbs: '15g', fat: '0.5g', cal: '61' },

        // Vegetables (Expanded)
        'spinach': { protein: '2.9g', carbs: '3.6g', fat: '0.4g', cal: '23' },
        'broccoli': { protein: '2.8g', carbs: '7g', fat: '0.4g', cal: '34' },
        'carrot': { protein: '0.9g', carbs: '10g', fat: '0.2g', cal: '41' },
        'avocado': { protein: '2g', carbs: '9g', fat: '15g', cal: '160' },
        'cucumber': { protein: '0.7g', carbs: '3.6g', fat: '0.1g', cal: '15' },
        'tomato': { protein: '0.9g', carbs: '3.9g', fat: '0.2g', cal: '18' },
        'pepper': { protein: '1g', carbs: '6g', fat: '0.3g', cal: '31' }, // Red bell pepper
        'onion': { protein: '1.1g', carbs: '9g', fat: '0.1g', cal: '40' },
        'cauliflower': { protein: '1.9g', carbs: '5g', fat: '0.3g', cal: '25' },
        'kale': { protein: '4.3g', carbs: '8.8g', fat: '0.9g', cal: '49' },
        'mushroom': { protein: '3.1g', carbs: '3.3g', fat: '0.3g', cal: '22' },
        'zucchini': { protein: '1.2g', carbs: '3.1g', fat: '0.3g', cal: '17' },
        'green bean': { protein: '1.8g', carbs: '7g', fat: '0.2g', cal: '31' },

        // Dairy/Liquids
        'milk': { protein: '3.4g', carbs: '5g', fat: '1g', cal: '42' }, // Low fat
        'almond milk': { protein: '0.4g', carbs: '0g', fat: '1g', cal: '13' } // Unsweetened
    },
    fallback: [
        "That's an interesting thought. Could you tell me more?",
        "I'm focusing on your habits. How is your progress going?",
        "Validation is internal. Keep pushing forward!",
        "I'm here to support your growth. What's your main focus today?"
    ]
};

export const analyzeHabits = (habits) => {
    if (!habits || habits.length === 0) return "You haven't tracked any habits yet. Start by adding one!";

    const completed = habits.filter(h => h.completed).length;
    const total = habits.length;
    const rate = Math.round((completed / total) * 100);

    if (rate === 100) return "Incredible! You've completed all your habits. You're unstoppable!";
    if (rate > 80) return "You're doing amazing! Just a few more to go.";
    if (rate > 50) return "Solid progress! You're past the halfway mark. Keep going!";
    return "Every step counts. Focus on completing just one more habit today.";
};

const calculateNutrition = (text) => {
    // 1. Check for specific food items "protein in chicken"
    for (const [food, macros] of Object.entries(KNOWLEDGE_BASE.nutrition_table)) {
        if (text.includes(food)) {
            return `Data per 100g of ${food.charAt(0).toUpperCase() + food.slice(1)}: ${macros.protein} Protein | ${macros.carbs} Carbs | ${macros.fat} Fat | ${macros.cal} kcal (Source: USDA/Standard)`;
        }
    }

    // 2. Check for personal calculator "protein for 70kg"
    const weightMatch = text.match(/(\d+)\s?kg/i);
    if (weightMatch && (text.includes('protein') || text.includes('need') || text.includes('calc'))) {
        const weight = parseInt(weightMatch[1]);

        // Exact calculations based on activity level (Source: DRI/ACSM)
        const sedentary = Math.round(weight * 0.8); // RDA
        const active = Math.round(weight * 1.4); // Endurance/Active
        const athlete = Math.round(weight * 1.8); // Strength/High Performance
        const water = Math.round(weight * 0.035 * 10) / 10; // 35ml/kg standard

        return `Daily Needs for ${weight}kg based on activity (g/day):
- Sedentary: ${sedentary}g
- Moderately Active: ${active}g
- High Intensity/Athlete: ${athlete}g
💧 Hydration Goal: ~${water}L water/day.`;
    }

    return null;
};

const extractReminder = (text) => {
    // Pattern: remind me to [task] at [time]
    // Supports: "at 5pm", "at 17:00", "in 5 minutes", "in 1 hour"

    // 1. "In X minutes/hours"
    const durationMatch = text.match(/remind me to (.+) in (\d+) (minute|min|hour|hr)s?/i);
    if (durationMatch) {
        const task = durationMatch[1];
        const value = parseInt(durationMatch[2]);
        const unit = durationMatch[3];
        const multiplier = unit.startsWith('hour') || unit.startsWith('hr') ? 60 * 60 * 1000 : 60 * 1000;
        const delayMs = value * multiplier;

        return {
            text: `I've set a reminder for "${task}" in ${value} ${unit}s.`,
            action: { type: 'SCHEDULE_REMINDER', task, delayMs }
        };
    }

    // 2. "At HH:MM" (Simple parse for today)
    // This is complex due to timezones, simple relative check:
    // We'll stick to Duration for local AI simplicity or naive parsing? 
    // Let's implement Duration only for robustness in this MVP step, 
    // as exact "at 5pm" requires parsing relative to Date.now() correctly.
    // We can add a simple parser later.

    return null;
};

export const getLocalAIResponse = async (input, habits = []) => {
    // Simulate "thinking" delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const text = input.toLowerCase();

    // Pattern Matching Logic
    if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
        return KNOWLEDGE_BASE.greetings[Math.floor(Math.random() * KNOWLEDGE_BASE.greetings.length)];
    }

    if (text.includes('motivat') || text.includes('inspire') || text.includes('hard') || text.includes('tired')) {
        return KNOWLEDGE_BASE.motivation[Math.floor(Math.random() * KNOWLEDGE_BASE.motivation.length)];
    }

    // 1. Reminders
    if (text.includes('remind')) {
        const reminder = extractReminder(text);
        if (reminder) return reminder;
        return "To set a reminder, say 'Remind me to [task] in [X] minutes'.";
    }

    // 2. Nutrition Calculator (High Priority)
    if (text.includes('protein') || text.includes('calc') || text.includes('kcal') || text.includes('vitamin') || text.includes('nutrition')) {
        const info = calculateNutrition(text);
        if (info) return info; // If returns text (not null)
    }

    // Specific Topics (Priority order: Specific Items -> General Categories -> Generic Tips)

    if (text.includes('veg') || text.includes('green') || text.includes('plant')) {
        return KNOWLEDGE_BASE.vegetables[Math.floor(Math.random() * KNOWLEDGE_BASE.vegetables.length)];
    }

    if (text.includes('fruit') || text.includes('apple') || text.includes('banana') || text.includes('berry')) {
        return KNOWLEDGE_BASE.fruits[Math.floor(Math.random() * KNOWLEDGE_BASE.fruits.length)];
    }

    if (text.includes('supplement') || text.includes('vitamin') || text.includes('pill') || text.includes('powder')) {
        return KNOWLEDGE_BASE.supplements[Math.floor(Math.random() * KNOWLEDGE_BASE.supplements.length)];
    }

    if (text.includes('food') || text.includes('diet') || text.includes('eat') || text.includes('healthy') || text.includes('nutrition')) {
        return KNOWLEDGE_BASE.healthy_food[Math.floor(Math.random() * KNOWLEDGE_BASE.healthy_food.length)];
    }

    if (text.includes('habit') || text.includes('routine') || text.includes('daily') || text.includes('life')) {
        return KNOWLEDGE_BASE.daily_habits[Math.floor(Math.random() * KNOWLEDGE_BASE.daily_habits.length)];
    }

    // Generic Categories
    if (text.includes('tip') || text.includes('advice') || text.includes('help') || text.includes('trick')) {
        return KNOWLEDGE_BASE.tips[Math.floor(Math.random() * KNOWLEDGE_BASE.tips.length)];
    }

    if (text.includes('stat') || text.includes('progress') || text.includes('analyze') || text.includes('doing')) {
        return analyzeHabits(habits);
    }

    if (text.includes('add') || text.includes('create')) {
        return "To add a new habit, go to the 'Habits' tab and click the + button. I'll help you track it!";
    }

    // Sentiment Analysis (Simplified)
    if (text.includes('fail') || text.includes('bad') || text.includes('sad')) {
        return "Don't be too hard on yourself. Progress is non-linear. Tomorrow is a new opportunity.";
    }

    if (text.includes('good') || text.includes('great') || text.includes('happy')) {
        return "Love that energy! Harness it to knock out another task.";
    }

    // Fallback
    return KNOWLEDGE_BASE.fallback[Math.floor(Math.random() * KNOWLEDGE_BASE.fallback.length)];
};
