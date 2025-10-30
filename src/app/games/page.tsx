
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sprout, Waves } from "lucide-react";
import Link from 'next/link';

const games = [
    {
        title: "Bubble Pop",
        icon: <Sprout className="w-6 h-6 text-primary" />,
        prompt: "Now we’re in Bubble Pop mode. Bubbles drift gently across the screen in soft pastel colours. Tap any bubble you like. It pops quietly—listen to the subtle ‘pop’, watch the bubble disappear, notice the little movement of nearby bubbles. Take a slow breath in… and as you exhale, pop another bubble. No rush. Just calm tapping, gentle rhythm. When you’ve popped enough, drift softly back into stillness.",
        href: "/games/bubble-pop"
    },
    {
        title: "Zen Garden",
        icon: <Waves className="w-6 h-6 text-primary" />,
        prompt: "Welcome to your Zen Garden. Here, the sand awaits your touch. Use your mouse or finger to draw patterns, creating ripples and lines. There are no goals, no scores—only the gentle act of creation. Breathe, draw, and find your moment of calm.",
        href: "/games/zen-garden"
    }
];

export default function RelaxationGamesPage() {
    return (
        <div className="p-4 md:p-8">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-headline">Relaxation Games</h1>
                <p className="text-muted-foreground mt-2">
                    A collection of simple activities to help you find a moment of peace.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {games.map((game, index) => {
                    const content = (
                         <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-3">
                                    {game.icon}
                                    <span className="font-headline">{game.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="whitespace-pre-wrap">
                                    {game.prompt}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    );
                    if (game.href) {
                        return (
                            <Link href={game.href} key={index} className="block h-full hover:shadow-lg transition-shadow rounded-lg">
                                {content}
                            </Link>
                        )
                    }
                    return <div key={index}>{content}</div>
                })}
            </div>
        </div>
    );
}
