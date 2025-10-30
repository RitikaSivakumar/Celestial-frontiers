
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('user_session')) {
      router.replace('/roles');
    } else {
      router.replace('/signin');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-headline">Loading...</h1>
    </div>
  );
}
