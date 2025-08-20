import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Swiper module
import { EffectCards } from 'swiper/modules';

const Lession14Vocab = () => {
    const vocabulary = [
        { id: 1, japanese: "つけます", romaji: "tsukemasu", english: "turn on", image: "/img/v1/Slide1.JPG" },
        { id: 2, japanese: "けします", romaji: "keshimasu", english: "turn off / erase", image: "/img/v1/Slide2.JPG" },
        { id: 3, japanese: "あけます", romaji: "akemasu", english: "open", image: "/img/v1/Slide3.JPG" },
        { id: 4, japanese: "しめます", romaji: "shimemasu", english: "close / shut", image: "/img/v1/Slide4.JPG" },
        { id: 5, japanese: "いそぎます", romaji: "isogimasu", english: "hurry", image: "/img/v1/Slide5.JPG" },
        { id: 6, japanese: "まちます", romaji: "machimasu", english: "wait", image: "/img/v1/Slide6.JPG" },
        { id: 7, japanese: "とめます", romaji: "tomemasu", english: "stop / park", image: "/img/v1/Slide7.JPG" },
        { id: 8, japanese: "まがります", romaji: "magarimasu", english: "turn (right/left)", image: "/img/v1/Slide8.JPG" },
        { id: 9, japanese: "もちます", romaji: "mochimasu", english: "hold", image: "/img/v1/Slide9.JPG" },
        { id: 10, japanese: "とります", romaji: "torimasu", english: "take / pass", image: "/img/v1/Slide10.JPG" },
        { id: 11, japanese: "てつだいます", romaji: "tetsudaimasu", english: "help", image: "/img/v1/Slide11.JPG" },
        { id: 12, japanese: "よびます", romaji: "yobimasu", english: "call", image: "/img/v1/Slide12.JPG" },
        { id: 13, japanese: "はなします", romaji: "hanashimasu", english: "speak / talk", image: "/img/v1/Slide13.JPG" },
        { id: 14, japanese: "みせます", romaji: "misemasu", english: "show", image: "/img/v1/Slide14.JPG" },
        { id: 15, japanese: "おしえます", romaji: "oshiemasu", english: "teach / tell (address)", image: "/img/v1/Slide15.JPG" },
        { id: 16, japanese: "はじめます", romaji: "hajimemasu", english: "begin / start", image: "/img/v1/Slide16.JPG" },
        { id: 17, japanese: "ふります", romaji: "furimasu", english: "fall (rain/snow)", image: "/img/v1/Slide17.JPG" },
        { id: 18, japanese: "コピーします", romaji: "kopī shimasu", english: "copy", image: "/img/v1/Slide18.JPG" }
    ];

    const swiperRef = useRef(null);
    const hasSpokenFirstRef = useRef(false);

    const [ttsEnabled, setTtsEnabled] = useState(false);
    const [voices, setVoices] = useState([]);

    // Load voices
    useEffect(() => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

        const synth = window.speechSynthesis;

        const grabVoices = () => {
            const v = synth.getVoices();
            if (v && v.length) setVoices(v);
        };

        grabVoices();
        synth.onvoiceschanged = grabVoices;

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
        const lower = langPrefix.toLowerCase();
        return voices.find(v => v.lang?.toLowerCase().startsWith(lower)) || null;
    };

    const speak = (text, lang) => {
        return new Promise((resolve) => {
            if (!("speechSynthesis" in window)) return resolve();
            const u = new SpeechSynthesisUtterance(text);
            const voice = pickVoice(lang);
            if (voice) {
                u.voice = voice;
                u.lang = voice.lang;
            } else {
                u.lang = lang === "ja" ? "ja-JP" : "en-US";
            }
            u.onend = () => resolve();
            window.speechSynthesis.speak(u);
        });
    };

    const speakSlide = async (index) => {
        if (!ttsEnabled) return;
        const word = vocabulary[index];
        if (!word) return;

        window.speechSynthesis.cancel();
        await speak(word.japanese, "ja");
        await speak(word.english, "en");
    };

    useEffect(() => {
        if (!ttsEnabled || hasSpokenFirstRef.current) return;
        hasSpokenFirstRef.current = true;
        speakSlide(0);
    }, [ttsEnabled]);

    return (
        <div className='text-center'>
            <h1>Vocabulary 1</h1>
            <div style={{ margin: 'auto', position: 'relative' }} className='mt-5'>
                {!ttsEnabled && (
                    <button
                        onClick={() => setTtsEnabled(true)}
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
                                    speakSlide(swiperRef.current ? swiperRef.current.realIndex : index);
                                }}
                            >
                                {/* <img src={item.image} alt={item.japanese} className="img-fluid p-2" /> */}
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

export default Lession14Vocab;
