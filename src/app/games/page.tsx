import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gamepad2, Sprout, Paintbrush, Ear, Puzzle } from "lucide-react";

const games = [
    {
        title: "Gentle Pause",
        icon: <Sprout className="w-6 h-6 text-primary" />,
        prompt: "Find a comfortable spot and gently tap the screen to release your worries. Each tap sends a ripple of calm through the scene. No timers. No pressure. Just you, this moment, and the soft rhythm of letting go."
    },
    {
        title: "Colour & Flow",
        icon: <Paintbrush className="w-6 h-6 text-primary" />,
        prompt: "Choose a soothing palette and swirl your fingertip across the canvas. Watch colours merge, shapes loosen, and tension fade. When you feel ready, let the form fade into nothingness—and feel a little lighter."
    },
    {
        title: "Sound-scape Escape",
        icon: <Ear className="w-6 h-6 text-primary" />,
        prompt: "Close your eyes (if you like), put on your headphones, and just listen. Every time you hear a gentle sound—wind through leaves, water lapping, distant chime—tap to collect it. Observe how your body softens. Let the ambient sounds guide you to stillness."
    },
    {
        title: "Mindful Matching",
        icon: <Puzzle className="w-6 h-6 text-primary" />,
        prompt: "Ready for a quiet challenge? Match pairs of soft-shaded tiles. No leaderboard. No hurry. With each successful match, take a slow inhale… and as the tiles disappear, exhale. Let the matching become a breathing rhythm."
    },
    {
        title: "Virtual Garden Ritual",
        icon: <Gamepad2 className="w-6 h-6 text-primary" />,
        prompt: "Welcome to your personal stress-garden. Tap to plant a seed. Pull your finger slowly to shape the petals. Let the flower bloom under your touch—and as it opens, imagine your thoughts opening and expanding, becoming lighter. You may revisit any time this garden calls you."
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
                {games.map((game, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3">
                                {game.icon}
                                <span className="font-headline">{game.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                {game.prompt}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
