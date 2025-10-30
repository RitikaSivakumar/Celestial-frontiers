import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gamepad2, Sprout, Paintbrush, Waves, Puzzle } from "lucide-react";

const games = [
    {
        title: "Sand Garden",
        icon: <Gamepad2 className="w-6 h-6 text-primary" />,
        prompt: "Welcome to your Sand Garden. Use your fingertip to drag through the soft sand‐tray and create patterns: smooth ripples, gentle waves, curved lines. There’s no wrong way—just feel the texture under your finger, and watch the sand respond with soothing motion. If you like, pick up the polished stones and move them slowly to new positions, noticing the subtle shift in weight and stillness around them. When you’re ready, let the pattern fade and breathe. Play for as long as you like."
    },
    {
        title: "Bubble Pop",
        icon: <Sprout className="w-6 h-6 text-primary" />,
        prompt: "Now we’re in Bubble Pop mode. Bubbles drift gently across the screen in soft pastel colours. Tap any bubble you like. It pops quietly—listen to the subtle ‘pop’, watch the bubble disappear, notice the little movement of nearby bubbles. Take a slow breath in… and as you exhale, pop another bubble. No rush. Just calm tapping, gentle rhythm. When you’ve popped enough, drift softly back into stillness."
    },
    {
        title: "Ripple Pond",
        icon: <Waves className="w-6 h-6 text-primary" />,
        prompt: "Imagine you’re by a quiet pond. Tap the water’s surface anywhere and watch concentric ripples expand outward. Then tap somewhere else, add another ripple. Then another. See how the waves move, overlap, slow down. Pause. Breathe in as the first ripple starts, breathe out as it disappears. Continue for a few taps, exploring the calming effect. When you’re ready, let the pond still."
    },
    {
        title: "Zen Match",
        icon: <Puzzle className="w-6 h-6 text-primary" />,
        prompt: "Time for a mindful match-tile game, but at your pace. You’ll see a board of softly-shaded tiles. Tap two matching tiles to clear them. There’s no timer, no leaderboard, no rush. With every match you make: take a slow inhale… and as the tiles disappear, take a slow exhale. Let your mind soften. Continue matching until you feel ready to stop and just observe the empty board for a moment."
    },
    {
        title: "Zen Brush / Free Paint",
        icon: <Paintbrush className="w-6 h-6 text-primary" />,
        prompt: "Pick your brush, pick your colour. This is your canvas—draw, doodle, swirl, paint without judgement. Slow strokes. Soft colours. As you move your finger, imagine the colour flowing from your fingertips into the screen, and any tension flowing out. If you like, tap ‘erase’ gently and let the stroke fade. There’s no goal, just your expression. When you feel done, step back, take a breath, and observe your creation or let it fade into blankness."
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
