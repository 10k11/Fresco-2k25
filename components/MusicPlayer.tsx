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
    const [isExpanded, setIsExpanded] = useState(true); // expanded by default

    const togglePlayPause = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.muted = false;
            audio.volume = 1;
            try {
                await audio.play();
                setIsPlaying(true);
                setAutoplayFailed(false);
                // Minimise after play on mobile
                if (window.innerWidth < 640) setIsExpanded(false);
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

    // Always show the play/pause button, fixed at bottom right for mobile ergonomics
    // Responsive styles for mobile, smaller button and label
    const buttonClasses = `bg-gray-800 text-emerald-400 p-3 sm:p-4 rounded-full border border-emerald-500/30 hover:bg-emerald-500 hover:text-black transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg
        active:scale-95 flex items-center justify-center
        `;

    // Button label logic
    let buttonLabel = 'Play Audio';
    if (isPlaying) {
        buttonLabel = 'Pause Audio';
    }

    // Mobile slide-in styles
    const mobileContainer =
        "fixed bottom-24 right-0 z-50 sm:bottom-32 sm:right-6 flex flex-col items-center transition-transform duration-300";
    const mobileCollapsed = "translate-x-[80%] sm:translate-x-0";
    const mobileExpanded = "translate-x-0";

    return (
        <div>
            {/* add preload and playsInline attributes to the element */}
            <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" playsInline />

            {/* Mobile slide-in button with liquid glass effect */}
            <div
                className={`${mobileContainer} ${isExpanded ? mobileExpanded : mobileCollapsed} `}
                style={{ minWidth: 60 }}
            >
                {/* Redesigned close button above the main button */}
                {isExpanded && (
                    <button
                        className="mb-2 bg-gray-800 text-emerald-300 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-emerald-500/30 sm:hidden"
                        style={{ position: 'relative', right: 0 }}
                        onClick={() => setIsExpanded(false)}
                        aria-label="Hide music controls"
                    >
                        <span className="text-lg font-bold">&times;</span>
                    </button>
                )}
                <button
                    onClick={togglePlayPause}
                    className={buttonClasses}
                    aria-label={buttonLabel}
                    style={{
                        minWidth: 44,
                        minHeight: 44,
                        fontSize: 20,
                        touchAction: 'manipulation',
                    }}
                >
                    {/* Icon logic: Play if never played, Resume if paused after play, Pause if playing */}
                    {!isPlaying ? (
                        <PlayIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                    ) : (
                        <PauseIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                    )}
                </button>
                {/* Label always visible on mobile */}
                <span className="block mt-2 text-xs text-emerald-300 font-semibold sm:hidden">{buttonLabel}</span>
            </div>
            {/* Tab/handle for mobile to expand/collapse */}
            {!isExpanded && (
                <button
                    className="fixed bottom-24 right-0 z-50 bg-emerald-500 text-black px-2 py-1 rounded-l-full text-xs font-bold shadow-lg sm:hidden"
                    style={{ minWidth: 32 }}
                    onClick={() => setIsExpanded(true)}
                    aria-label="Show music controls"
                >
                    Music
                </button>
            )}

            {/* Autoplay prompt, mobile-optimized */}
            {autoplayFailed && (
                <div className="fixed bottom-20 right-4 z-50 bg-black/80 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm flex flex-col sm:flex-row items-center gap-2 max-w-[90vw] sm:max-w-xs"
                    style={{ fontSize: '1rem', lineHeight: '1.3', wordBreak: 'break-word' }}>
                    <span className="text-base mb-2 sm:mb-2">Play audio?</span>
                    <div className="flex gap-2">
                        <button
                            onClick={handlePromptPlay}
                            className="bg-emerald-500 text-black px-3 py-2 rounded-full text-base active:scale-95"
                            aria-label="Play audio"
                        >
                            Play
                        </button>
                        <button
                            onClick={handlePromptDecline}
                            className="bg-gray-700 text-white px-3 py-2 rounded-full text-base active:scale-95"
                            aria-label="No thanks"
                        >
                            No thanks
                        </button>
                    </div>
                </div>
            )}

            {/* Diagnostic banner: visible when the HEAD check or audio error indicates a problem */}
            {sourceExists === false && (
                <div className="fixed bottom-20 right-4 z-50 bg-black/80 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm max-w-[90vw] sm:max-w-xs"
                    style={{ fontSize: '0.95rem', wordBreak: 'break-word' }}>
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
