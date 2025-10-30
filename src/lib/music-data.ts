
export type Track = {
    id: number;
    title: string;
    artist: string;
    url: string;
};

export const musicTracks: Track[] = [
    {
        id: 1,
        title: "Gentle Breeze",
        artist: "Nature Sounds",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        id: 2,
        title: "Calm Waves",
        artist: "Ocean Ambience",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        id: 3,
        title: "Forest Whispers",
        artist: "Woodland Echoes",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];
