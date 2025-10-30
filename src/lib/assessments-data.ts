
export const phq9Questions = [
    { id: "q1", text: "Little interest or pleasure in doing things" },
    { id: "q2", text: "Feeling down, depressed, or hopeless" },
    { id: "q3", text: "Trouble falling or staying asleep, or sleeping too much" },
    { id: "q4", text: "Feeling tired or having little energy" },
    { id: "q5", text: "Poor appetite or overeating" },
    { id: "q6", text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down" },
    { id: "q7", text: "Trouble concentrating on things, such as reading or watching TV" },
    { id: "q8", text: "Moving or speaking so slowly that other people could have noticed — or being fidgety or restless" },
    { id: "q9", text: "Thoughts that you would be better off dead or of hurting yourself" },
];

export const gad7Questions = [
    { id: "q1", text: "Feeling nervous, anxious, or on edge" },
    { id: "q2", text: "Not being able to stop or control worrying" },
    { id: "q3", text: "Worrying too much about different things" },
    { id: "q4", text: "Trouble relaxing" },
    { id: "q5", text: "Being so restless that it is hard to sit still" },
    { id: "q6", text: "Becoming easily annoyed or irritable" },
    { id: "q7", text: "Feeling afraid as if something awful might happen" },
];

export const answerOptions = [
    { value: 0, label: "Not at all" },
    { value: 1, label: "Several days" },
    { value: 2, label: "More than half the days" },
    { value: 3, label: "Nearly every day" },
];

export const phq9Interpretations = {
    minimal: {
        range: [0, 4],
        interpretation: "Minimal depression",
        recommendation: "You're doing well! Keep up your positive habits and continue monitoring your mood.",
        color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    },
    mild: {
        range: [5, 9],
        interpretation: "Mild depression",
        recommendation: "You might be feeling a bit low. Consider trying a calming activity like a short walk or listening to music.",
        color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    },
    moderate: {
        range: [10, 14],
        interpretation: "Moderate depression",
        recommendation: "It seems you've been feeling down. It could be helpful to talk to someone you trust or consider reaching out to a professional.",
        color: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
    },
    moderatelySevere: {
        range: [15, 19],
        interpretation: "Moderately severe depression",
        recommendation: "It looks like you’re struggling significantly. It's highly recommended to connect with your doctor or a mental health professional.",
        color: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
    },
    severe: {
        range: [20, 27],
        interpretation: "Severe depression",
        recommendation: "It seems you’ve been feeling quite overwhelmed. Please contact your doctor or a psychiatrist. Professional care can help you recover and feel at peace again.",
        color: "bg-red-200 dark:bg-red-950 text-red-900 dark:text-red-200",
    }
};

export const gad7Interpretations = {
    minimal: {
        range: [0, 4],
        interpretation: "Minimal anxiety",
        recommendation: "Your anxiety levels seem low. Continue with your current self-care practices.",
        color: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    },
    mild: {
        range: [5, 9],
        interpretation: "Mild anxiety",
        recommendation: "You may be experiencing some mild anxiety. Activities like deep breathing or journaling could be beneficial.",
        color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    },
    moderate: {
        range: [10, 14],
        interpretation: "Moderate anxiety",
        recommendation: "Your anxiety seems to be causing some distress. Talking to a professional could provide you with effective coping strategies.",
        color: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
    },
    severe: {
        range: [15, 21],
        interpretation: "Severe anxiety",
        recommendation: "It appears you are dealing with significant anxiety. It is strongly recommended to seek support from a mental health professional.",
        color: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
    }
};
