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
        { id: 1, japanese: "います", romaji: "imasu", english: "exist, be (for animate things)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 2, japanese: "あります", romaji: "arimasu", english: "exist, be (for inanimate things)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 3, japanese: "いろいろ(な)", romaji: "iroiro (na)", english: "various", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 4, japanese: "おとこのひと", romaji: "otoko no hito", english: "man", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 5, japanese: "おんなのひと", romaji: "onna no hito", english: "woman", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 6, japanese: "おとこのこ", romaji: "otoko no ko", english: "boy", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 7, japanese: "おんなのこ", romaji: "onna no ko", english: "girl", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 8, japanese: "いぬ", romaji: "inu", english: "dog", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 9, japanese: "ねこ", romaji: "neko", english: "cat", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 10, japanese: "き", romaji: "ki", english: "tree, wood", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 11, japanese: "もの", romaji: "mono", english: "thing, object", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 12, japanese: "でんち", romaji: "denchi", english: "battery", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 13, japanese: "はこ", romaji: "hako", english: "box", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 14, japanese: "れいぞうこ", romaji: "reizouko", english: "refrigerator", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 15, japanese: "たな", romaji: "tana", english: "shelf", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 16, japanese: "まど", romaji: "mado", english: "window", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 17, japanese: "こうえん", romaji: "kouen", english: "park", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 18, japanese: "きっさてん", romaji: "kissaten", english: "coffee shop / café", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 19, japanese: "ほんや", romaji: "honya", english: "bookstore", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 20, japanese: "のりば", romaji: "noriba", english: "boarding area (bus, taxi, etc.)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 21, japanese: "うえ", romaji: "ue", english: "on, above", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 22, japanese: "した", romaji: "shita", english: "under, below", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 23, japanese: "まえ", romaji: "mae", english: "in front of, before", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 24, japanese: "うしろ", romaji: "ushiro", english: "behind", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 25, japanese: "みぎ", romaji: "migi", english: "right (side)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 26, japanese: "ひだり", romaji: "hidari", english: "left (side)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 27, japanese: "なか", romaji: "naka", english: "inside", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 28, japanese: "そと", romaji: "soto", english: "outside", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 29, japanese: "となり", romaji: "tonari", english: "next to, beside", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 30, japanese: "ちかく", romaji: "chikaku", english: "near, vicinity", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 31, japanese: "あいだ", romaji: "aida", english: "between, among", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 32, japanese: "～や～など", romaji: "...ya ...nado", english: "... and ... etc. (listing)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 33, japanese: "いちばん～", romaji: "ichiban ~", english: "most; number one", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 34, japanese: "～だんめ", romaji: "...danme", english: "(nth) shelf level", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 35, japanese: "フィルム", romaji: "firumu", english: "film", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 36, japanese: "スイッチ", romaji: "suitchi", english: "switch", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 37, japanese: "ベッド", romaji: "beddo", english: "bed", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 38, japanese: "ドア", romaji: "doa", english: "door", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 39, japanese: "ポスト", romaji: "posuto", english: "post/mailbox", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 40, japanese: "ビル", romaji: "biru", english: "building", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 41, japanese: "どうもすみません", romaji: "doumo sumimasen", english: "thank you so much (polite)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 42, japanese: "チリソース", romaji: "chiri soosu", english: "chili sauce", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 43, japanese: "おく", romaji: "oku", english: "the back (inner part)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 44, japanese: "スパイス・コーナー", romaji: "supaisu koonaa", english: "spice corner", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 45, japanese: "とうきょうディズニーランド", romaji: "toukyou dizuniirando", english: "Tokyo Disneyland", image: "/src/img/v1/Placeholder-_-Glossary.svg" }
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
        <div className='text-center '>
            <h1 className=''>Vocabulary 10</h1>
            <div style={{ width: '320px', margin: 'auto', position: 'relative' }} className='mt-5'>
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
        </div>
    );
};

export default Katakana;