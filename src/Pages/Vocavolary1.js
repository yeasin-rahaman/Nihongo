import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import image from "./../img/v1/Placeholder-_-Glossary.svg";

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Swiper module
import { EffectCards } from 'swiper/modules';

const Katakana = () => {
    const vocabulary = [
        { japanese: "こんにちは", romaji: "Konnichiwa", english: "Hello / Good afternoon" },
        { japanese: "おはようございます", romaji: "Ohayou gozaimasu", english: "Good morning" },
        { japanese: "こんばんは", romaji: "Konbanwa", english: "Good evening" },
        { japanese: "おやすみなさい", romaji: "Oyasuminasai", english: "Good night" },
        { japanese: "ありがとう", romaji: "Arigatou", english: "Thank you" },
        { japanese: "ありがとうございます", romaji: "Arigatou gozaimasu", english: "Thank you (polite)" },
        { japanese: "すみません", romaji: "Sumimasen", english: "Excuse me / Sorry" },
        { japanese: "はい", romaji: "Hai", english: "Yes" },
        { japanese: "いいえ", romaji: "Iie", english: "No" },
        { japanese: "はじめまして", romaji: "Hajimemashite", english: "Nice to meet you" },
        { japanese: "さようなら", romaji: "Sayounara", english: "Goodbye" },
        { japanese: "じゃあね", romaji: "Jaa ne", english: "See you" },
        { japanese: "またね", romaji: "Mata ne", english: "See you again" },
        { japanese: "お元気ですか", romaji: "Ogenki desu ka", english: "How are you?" },
        { japanese: "元気です", romaji: "Genki desu", english: "I’m fine" }
    ];

    const swiperRef = useRef(null);
    const hasSpokenFirstRef = useRef(false);

    const [ttsEnabled, setTtsEnabled] = useState(false);
    const [voices, setVoices] = useState([]);

    // Load voices robustly (Chrome/Safari sometimes delay this)
    useEffect(() => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

        const synth = window.speechSynthesis;

        const grabVoices = () => {
            const v = synth.getVoices();
            if (v && v.length) setVoices(v);
        };

        grabVoices();
        synth.onvoiceschanged = grabVoices;

        // Fallback polling in case onvoiceschanged doesn't fire
        const poll = setInterval(() => {
            if (voices.length === 0) grabVoices();
            else clearInterval(poll);
        }, 250);

        return () => {
            clearInterval(poll);
            synth.onvoiceschanged = null;
        };
    }, [voices.length]);

    const pickVoice = (langPrefix) => {
        if (!voices || voices.length === 0) return null;
        // Prefer exact start with lang code (e.g., "ja", "en"), but keep region variants
        const lower = langPrefix.toLowerCase();
        const exact = voices.find(v => v.lang?.toLowerCase().startsWith(lower));
        return exact || null;
    };

    const speak = (text, voiceFallbackLang) => {
        return new Promise((resolve, reject) => {
            if (!("speechSynthesis" in window)) return resolve(); // no TTS available
            const u = new SpeechSynthesisUtterance(text);
            const voice =
                voiceFallbackLang === "ja"
                    ? pickVoice("ja")
                    : voiceFallbackLang === "en"
                        ? pickVoice("en")
                        : null;

            if (voice) {
                u.voice = voice;
                u.lang = voice.lang; // match the selected voice
            } else {
                // fallback language if no voice found
                u.lang = voiceFallbackLang === "ja" ? "ja-JP" : "en-US";
            }

            u.onend = () => resolve();
            u.onerror = (e) => reject(e);
            window.speechSynthesis.speak(u);
        });
    };

    const speakSlide = async (index) => {
        if (!ttsEnabled) return; // only speak after user enables
        const word = vocabulary[index];
        if (!word) return;

        // Cancel anything queued/playing before starting a new one
        window.speechSynthesis.cancel();

        try {
            // Japanese first, then English after jp ends
            await speak(word.japanese, "ja");
            await speak(word.english, "en");
        } catch (e) {
            // If something goes wrong, ensure queue is cleared
            window.speechSynthesis.cancel();
            // (Optional) you could console.error(e)
        }
    };

    // Speak first slide after enabling TTS
    useEffect(() => {
        if (!ttsEnabled) return;
        if (hasSpokenFirstRef.current) return;
        hasSpokenFirstRef.current = true;
        speakSlide(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ttsEnabled]);

    return (
        <div style={{ width: '320px', margin: 'auto', position: 'relative' }}>
            {!ttsEnabled && (
                <button
                    onClick={() => {
                        // A user gesture to unlock audio/speech on most browsers
                        setTtsEnabled(true);
                    }}
                    style={{
                        position: 'absolute',
                        zIndex: 10,
                        top: 8,
                        right: 8,
                        padding: '8px 12px',
                        borderRadius: 12,
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        cursor: 'pointer'
                    }}
                    title="Enable speech"
                >
                    🔊 Enable Speech
                </button>
            )}

            <Swiper
                effect={'cards'}
                grabCursor={true}
                loop={true}
                modules={[EffectCards]}
                className="mySwiper"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                    // small delay so realIndex is correct in loop mode
                    setTimeout(() => {
                        speakSlide(swiper.realIndex);
                    }, 120);
                }}
            >
                {vocabulary.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '260px',
                                padding: 8,
                                textAlign: 'center',
                                fontSize: "11px"
                            }}
                            onClick={() => {
                                // Tap to replay JP -> EN for this card
                                speakSlide(swiperRef.current ? swiperRef.current.realIndex : index);
                            }}
                        >
                            <img src={image} alt={item.japanese} className='img-fluid p-2' />
                            <p style={{ fontSize: "1rem", marginTop: "10px", fontWeight: 700 }}>{item.japanese}</p>
                            <p style={{ fontStyle: "italic", color: "#666" }}>{item.romaji}</p>
                            <p>{item.english}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Katakana;
