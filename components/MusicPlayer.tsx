import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon, PauseIcon } from './icons';

// Use Vite base-aware public path so the browser fetches the correct URL when `base` is set.
const base = (import.meta as any).env?.BASE_URL ?? '/';
const MUSIC_URL = `/audio/bg.mp3`;

const MusicPlayer: React.FC = () => {
    // playback state
    const [isPlaying, setIsPlaying] = useState(false);

    // diagnostic state for source/network/media errors
    const [sourceExists, setSourceExists] = useState<boolean | null>(null);
    const [sourceError, setSourceError] = useState<string | null>(null);
    const [sourceContentType, setSourceContentType] = useState<string | null>(null);
    const [sourceSampleHex, setSourceSampleHex] = useState<string | null>(null);

    // whether autoplay was blocked and we should ask the user
    const [autoplayFailed, setAutoplayFailed] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Attempt muted autoplay on mount (highest success), then try unmute.
    useEffect(() => {
        let mounted = true;

        const tryAutoPlay = async () => {
            const audio = audioRef.current;
            if (!audio) return;

            // improve autoplay chances
            audio.loop = true;
            audio.preload = 'auto';
            // playsInline helps on iOS
            (audio as any).playsInline = true;
            audio.volume = 0.6;

            // Try muted autoplay first (most browsers allow this)
            try {
                audio.muted = true;
                await audio.play();
                if (!mounted) return;
                setIsPlaying(true);

                // Best-effort unmute after playback begins
                setTimeout(async () => {
                    try {
                        audio.muted = false;
                        await audio.play();
                    } catch (unmuteErr) {
                        // keep muted if unmute blocked
                        console.warn('Unmute attempt blocked (best-effort):', unmuteErr);
                        audio.muted = true;
                    }
                }, 500);
                return;
            } catch (mutedErr) {
                console.warn('Muted autoplay failed, will ask user:', mutedErr);
                // mark so we show the prompt to the user
                if (mounted) setAutoplayFailed(true);
            }
        };

        tryAutoPlay();

        return () => {
            mounted = false;
        };
    }, []);

    const togglePlayPause = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            // User interaction: ensure unmuted so they hear audio
            audio.muted = false;
            audio.volume = 1;
            try {
                await audio.play();
                setIsPlaying(true);
                setAutoplayFailed(false);
            } catch (error) {
                console.error('Audio playback failed on user toggle:', error);
                setIsPlaying(false);
            }
        }
    };

    // Handler when user explicitly agrees to play from the prompt
    const handlePromptPlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = false;
        audio.volume = 1;
        try {
            await audio.play();
            setIsPlaying(true);
            setAutoplayFailed(false);
        } catch (err) {
            console.error('Play from prompt failed:', err);
            // keep the prompt visible so user can try again
        }
    };

    // Handler when user declines audio
    const handlePromptDecline = () => {
        setAutoplayFailed(false); // hide prompt, don't autoplay
    };

    // quick HEAD check to see if the file is reachable and attach audio event listeners
    useEffect(() => {
        let cancelled = false;

        // HEAD check (works if same-origin; avoids downloading full file)
        const checkSource = async () => {
            try {
                const resp = await fetch(MUSIC_URL, { method: 'HEAD' });
                if (cancelled) return;
                if (resp.ok) {
                    setSourceExists(true);
                    setSourceContentType(resp.headers.get('content-type'));
                    // attempt a small ranged GET to sample the first bytes without downloading full file
                    try {
                        const r2 = await fetch(MUSIC_URL, { headers: { Range: 'bytes=0-63' } });
                        if (!cancelled && r2.ok) {
                            const ab = await r2.arrayBuffer();
                            const hex = Buffer.from(ab).toString('hex');
                            setSourceSampleHex(hex);
                        }
                    } catch (rangeErr) {
                        // ignore range fetch errors; keep HEAD info
                    }
                } else {
                    setSourceExists(false);
                    setSourceError(`HTTP ${resp.status} ${resp.statusText}`);
                }
            } catch (err: any) {
                if (cancelled) return;
                setSourceExists(false);
                setSourceError(err?.message || String(err));
            }
        };

        const audio = audioRef.current;
        const onCanPlay = () => {
            setSourceExists(true);
            setSourceError(null);
        };
        const onPlaying = () => {
            setSourceExists(true);
            setSourceError(null);
        };
        const onError = () => {
            const mediaErr = audio?.error;
            const code = mediaErr ? (mediaErr.code ?? 'n/a') : 'n/a';
            const msg = mediaErr && (mediaErr.message || '') ? mediaErr.message : `Media error code ${code}`;
            setSourceExists(false);
            setSourceError(msg);
            // also try to populate content-type/sample when media element reports error
            try {
                fetch(MUSIC_URL, { method: 'HEAD' }).then(hresp => {
                    if (hresp && hresp.ok) setSourceContentType(hresp.headers.get('content-type'));
                }).catch(() => {/* ignore */});
            } catch {}
            // Also log full object for devtools
            console.error('Audio element error', mediaErr);
        };

        checkSource();
        if (audio) {
            audio.addEventListener('canplay', onCanPlay);
            audio.addEventListener('playing', onPlaying);
            audio.addEventListener('error', onError);
        }

        return () => {
            cancelled = true;
            if (audio) {
                audio.removeEventListener('canplay', onCanPlay);
                audio.removeEventListener('playing', onPlaying);
                audio.removeEventListener('error', onError);
            }
        };
    }, []);

    const buttonClasses = `bg-gray-800 text-emerald-400 p-3 rounded-full border border-emerald-500/30 hover:bg-emerald-500 hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${isPlaying ? 'animate-pulse-emerald' : ''}`;

    return (
        <div className="relative">
            {/* add preload and playsInline attributes to the element */}
            <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" playsInline />
            <button
                onClick={togglePlayPause}
                className={buttonClasses}
                aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
                {isPlaying ? (
                    <PauseIcon className="w-6 h-6" />
                ) : (
                    <PlayIcon className="w-6 h-6" />
                )}
            </button>

            {/* If autoplay was blocked, ask the user whether to play audio */}
            {autoplayFailed && (
                <div className="fixed bottom-4 right-4 z-50 bg-black/70 text-white px-3 py-2 rounded-md shadow-md backdrop-blur-sm flex items-center gap-2">
                    <span className="text-sm">Play audio?</span>
                    <button
                        onClick={handlePromptPlay}
                        className="bg-emerald-500 text-black px-2 py-1 rounded-full text-sm"
                        aria-label="Play audio"
                    >
                        Play
                    </button>
                    <button
                        onClick={handlePromptDecline}
                        className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
                        aria-label="No thanks"
                    >
                        No thanks
                    </button>
                </div>
            )}

            {/* Diagnostic banner: visible when the HEAD check or audio error indicates a problem */}
            {sourceExists === false && (
                <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white px-3 py-2 rounded-md shadow-md backdrop-blur-sm max-w-xs">
                    <div className="text-xs mb-1">Audio failed to load:</div>
                    <div className="text-sm font-mono mb-2 truncate">{sourceError || 'Unknown error'}</div>
                    {sourceContentType && (
                        <div className="text-[11px] text-emerald-300 mb-1">Content-Type: {sourceContentType}</div>
                    )}
                    {sourceSampleHex && (
                        <div className="text-[10px] text-gray-300 font-mono">Hex(0..63): {sourceSampleHex}</div>
                    )}
                    <div className="flex gap-2">
                        <a
                            href={MUSIC_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-300 underline text-sm"
                        >
                            Open audio URL
                        </a>
                        <button
                            onClick={() => {
                                // retry: re-run HEAD check by reloading element and clearing errors
                                setSourceError(null);
                                setSourceExists(null);
                                // quick reload the audio element
                                const a = audioRef.current;
                                if (a) {
                                    a.load();
                                    a.play().catch(() => {/* ignore */});
                                }
                            }}
                            className="bg-gray-700 text-white px-2 py-1 rounded-full text-sm"
                        >
                            Retry
                        </button>
                    </div>
                    <div className="text-[10px] text-gray-300 mt-1">Check devtools Network tab for full response.</div>
                </div>
            )}
        </div>
    );
};

export default MusicPlayer;
