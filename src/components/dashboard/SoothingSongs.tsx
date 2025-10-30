
'use client';
import { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, Volume1, Volume2, VolumeX } from 'lucide-react';
import { musicTracks, type Track } from '@/lib/music-data';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';

export default function SoothingSongs() {
    const [selectedTrack, setSelectedTrack] = useState<Track>(musicTracks[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const audioRef = useRef<HTMLAudioElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        const storedVolume = localStorage.getItem('music-volume');
        if (storedVolume) {
            setVolume(Number(storedVolume));
        }
        const storedTrackId = localStorage.getItem('music-track-id');
        if (storedTrackId) {
            const track = musicTracks.find(t => t.id === parseInt(storedTrackId));
            if (track) {
                setSelectedTrack(track);
            }
        }
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
        localStorage.setItem('music-volume', String(volume));
    }, [volume]);
    
    useEffect(() => {
        if (audioRef.current) {
            if(audioRef.current.src !== selectedTrack.url) {
                audioRef.current.src = selectedTrack.url;
            }
            if(isPlaying) {
                audioRef.current.play().catch(e => console.error("Playback failed", e));
            } else {
                audioRef.current.pause();
            }
        }
        localStorage.setItem('music-track-id', String(selectedTrack.id));
    }, [selectedTrack, isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            setIsPlaying(!isPlaying);
        }
    };
    
    const handleTrackChange = (trackId: string) => {
        const track = musicTracks.find(t => t.id === parseInt(trackId));
        if (track) {
            setSelectedTrack(track);
            if (!isPlaying) {
                setIsPlaying(true);
            }
        }
    }

    const VolumeIcon = () => {
        if (volume === 0) return <VolumeX className="w-5 h-5 text-muted-foreground"/>;
        if (volume < 50) return <Volume1 className="w-5 h-5 text-muted-foreground"/>;
        return <Volume2 className="w-5 h-5 text-muted-foreground"/>;
    }

    return (
        <div className="p-3 rounded-lg bg-muted/30">
             <audio ref={audioRef} loop onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
             <div className="flex items-center gap-4">
                 <Music className="w-6 h-6 text-primary"/>
                 <div className="flex-1">
                    <h3 className="font-semibold">Soothing Songs</h3>
                    <p className="text-sm text-muted-foreground">Listen to curated playlists.</p>
                 </div>
                 <Button onClick={togglePlay} size="icon" variant="ghost">
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                 </Button>
             </div>
             <div className="mt-4 space-y-3">
                 <Select onValueChange={handleTrackChange} defaultValue={String(selectedTrack.id)} value={String(selectedTrack.id)}>
                     <SelectTrigger className="w-full">
                         <SelectValue placeholder="Select a track" />
                     </SelectTrigger>
                     <SelectContent>
                         {musicTracks.map(track => (
                            <SelectItem key={track.id} value={String(track.id)}>{track.title}</SelectItem>
                         ))}
                     </SelectContent>
                 </Select>

                <div className="flex items-center gap-2">
                    <VolumeIcon />
                    <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={[volume]}
                        onValueChange={(value) => setVolume(value[0])}
                        aria-label="Volume"
                    />
                </div>
            </div>
        </div>
    );
}
