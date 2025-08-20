import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Swiper module
import { EffectCards } from 'swiper/modules';

const Lession14Vocab = () => {
    const vocabulary = [
        { id: 1, japanese: "つけます", romaji: "tsukemasu", english: "turn on", image: "/img/v14/1.png" },
        { id: 2, japanese: "けします", romaji: "keshimasu", english: "turn off / erase", image: "/img/v14/2.png" },
        { id: 3, japanese: "あけます", romaji: "akemasu", english: "open", image: "/img/v14/3.png" },
        { id: 4, japanese: "しめます", romaji: "shimemasu", english: "close / shut", image: "/img/v14/4.png" },
        { id: 5, japanese: "いそぎます", romaji: "isogimasu", english: "hurry", image: "/img/v14/5.png" },
        { id: 6, japanese: "まちます", romaji: "machimasu", english: "wait", image: "/img/v14/6.png" },
        { id: 7, japanese: "とめます", romaji: "tomemasu", english: "stop / park", image: "/img/v14/7.png" },
        { id: 8, japanese: "まがります", romaji: "magarimasu", english: "turn (right/left)", image: "/img/v14/8.png" },
        { id: 9, japanese: "もちます", romaji: "mochimasu", english: "hold", image: "/img/v14/9.png" },
        { id: 10, japanese: "とります", romaji: "torimasu", english: "take / pass", image: "/img/v14/10.png" },
        { id: 11, japanese: "てつだいます", romaji: "tetsudaimasu", english: "help", image: "/img/v14/11.png" },
        { id: 12, japanese: "よびます", romaji: "yobimasu", english: "call", image: "/img/v14/12.png" },
        { id: 13, japanese: "はなします", romaji: "hanashimasu", english: "speak / talk", image: "/img/v14/13.png" },
        { id: 14, japanese: "みせます", romaji: "misemasu", english: "show", image: "/img/v14/14.png" },
        { id: 15, japanese: "おしえます", romaji: "oshiemasu", english: "teach / tell (address)", image: "/img/v14/15.png" },
        { id: 16, japanese: "はじめます", romaji: "hajimemasu", english: "begin / start", image: "/img/v14/16.png" },
        { id: 17, japanese: "ふります", romaji: "furimasu", english: "fall (rain/snow)", image: "/img/v14/17.png" },
        { id: 18, japanese: "コピーします", romaji: "kopī shimasu", english: "copy", image: "/img/v14/18.png" },
        { id: 19, japanese: "エアコン", romaji: "eakon", english: "air conditioner", image: "/img/v14/19.png" },
        { id: 20, japanese: "パスポート", romaji: "pasupōto", english: "passport", image: "/img/v14/20.png" },
        { id: 21, japanese: "なまえ", romaji: "namae", english: "name", image: "/img/v14/21.png" },
        { id: 22, japanese: "じゅうしょ", romaji: "jūsho", english: "address", image: "/img/v14/22.png" },
        { id: 23, japanese: "ちず", romaji: "chizu", english: "map", image: "/img/v14/23.png" },
        { id: 24, japanese: "しお", romaji: "shio", english: "salt", image: "/img/v14/24.png" },
        { id: 25, japanese: "さとう", romaji: "satō", english: "sugar", image: "/img/v14/25.png" },
        { id: 26, japanese: "よみかた", romaji: "yomikata", english: "how to read / way of reading", image: "/img/v14/26.png" },
        { id: 27, japanese: "かた", romaji: "kata", english: "way of ~ / manner of ~", image: "/img/v14/27.png" },
        { id: 28, japanese: "ゆっくり", romaji: "yukkuri", english: "slowly / leisurely", image: "/img/v14/28.png" },
        { id: 29, japanese: "すぐ", romaji: "sugu", english: "immediately / right away", image: "/img/v14/29.png" },
        { id: 30, japanese: "また", romaji: "mata", english: "again", image: "/img/v14/30.png" },
        { id: 31, japanese: "あとで", romaji: "ato de", english: "later", image: "/img/v14/31.png" },
        { id: 32, japanese: "もうすこし", romaji: "mō sukoshi", english: "a little more", image: "/img/v14/32.png" },
        { id: 33, japanese: "もう～", romaji: "mō~", english: "more ~ / another ~", image: "/img/v14/33.png" },
        { id: 34, japanese: "いいですよ", romaji: "ii desu yo", english: "sure / certainly", image: "/img/v14/34.png" },
        { id: 35, japanese: "さあ", romaji: "sā", english: "well (used when encouraging)", image: "/img/v14/35.png" },
        { id: 36, japanese: "あれ？", romaji: "are?", english: "Oh? / What! (surprise)", image: "/img/v14/36.png" },
        { id: 37, japanese: "まっすぐ", romaji: "massugu", english: "straight ahead", image: "/img/v14/37.png" },
        { id: 38, japanese: "おつり", romaji: "otsuri", english: "change (money)", image: "/img/v14/38.png" }
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
            <h1>Vocabulary 14</h1>
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
                                <img src={item.image} alt={item.japanese} className="img-fluid p-2" />
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
