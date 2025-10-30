
'use client';

import { useState, useEffect } from 'react';

export default function WelcomeHeader() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good Morning";
      if (hour < 18) return "Good Afternoon";
      return "Good Evening";
    };
    setGreeting(getGreeting());
  }, []);

  if (!greeting) {
    return null;
  }

  return (
    <div className="mb-4">
      <h1 className="text-4xl md:text-5xl font-headline text-foreground">
        {greeting}, Friend
      </h1>
      <p className="text-muted-foreground mt-2 text-lg">
        Ready to take a step on your mindful path today?
      </p>
    </div>
  );
}
