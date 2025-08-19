import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Swiper module
import { EffectCards } from 'swiper/modules';

const Katakana = () => {
    const vocabulary = [
        { id: 1, japanese: "わたし", romaji: "watashi", english: "I / me", image: "/img/v1/Slide1.JPG" },
        { id: 2, japanese: "あなた", romaji: "anata", english: "you", image: "/img/v1/Slide2.JPG" },
        { id: 3, japanese: "あのひと / あのかた", romaji: "ano hito / ano kata", english: "that person / he / she", image: "/img/v1/Slide3.JPG" },
        { id: 4, japanese: "みなさん", romaji: "minasan", english: "everyone / all of you", image: "/img/v1/Slide4.JPG" },
        { id: 5, japanese: "〜さん", romaji: "～san", english: "Mr. / Ms. (honorific)", image: "/img/v1/Slide5.JPG" },
        { id: 6, japanese: "〜ちゃん", romaji: "～chan", english: "suffix for children / close friends", image: "/img/v1/Slide6.JPG" },
        { id: 7, japanese: "〜くん", romaji: "～kun", english: "suffix for boys / juniors", image: "/img/v1/Slide7.JPG" },
        { id: 8, japanese: "〜じん", romaji: "～jin", english: "person of (nationality)", image: "/img/v1/Slide8.JPG" },
        { id: 9, japanese: "せんせい", romaji: "sensei", english: "teacher (not used for oneself)", image: "/img/v1/Slide9.JPG" },
        { id: 10, japanese: "きょうし", romaji: "kyoushi", english: "teacher / instructor (used for oneself)", image: "/img/v1/Slide10.JPG" },
        { id: 11, japanese: "がくせい", romaji: "gakusei", english: "student", image: "/img/v1/Slide11.JPG" },
        { id: 12, japanese: "かいしゃいん", romaji: "kaishain", english: "company employee", image: "/img/v1/Slide12.JPG" },
        { id: 13, japanese: "しゃいん", romaji: "shain", english: "employee of ~ company", image: "/img/v1/Slide13.JPG" },
        { id: 14, japanese: "ぎんこういん", romaji: "ginkouin", english: "bank employee", image: "/img/v1/Slide14.JPG" },
        { id: 15, japanese: "いしゃ", romaji: "isha", english: "doctor", image: "/img/v1/Slide15.JPG" },
        { id: 16, japanese: "けんきゅうしゃ", romaji: "kenkyuusha", english: "researcher", image: "/img/v1/Slide16.JPG" },
        { id: 17, japanese: "エンジニア", romaji: "enjiniya", english: "engineer", image: "/img/v1/Slide17.JPG" },
        { id: 18, japanese: "だいがく", romaji: "daigaku", english: "university", image: "/img/v1/Slide18.JPG" },
        { id: 19, japanese: "びょういん", romaji: "byouin", english: "hospital", image: "/img/v1/Slide19.JPG" },
        { id: 20, japanese: "でんき", romaji: "denki", english: "electricity / electric light", image: "/img/v1/Slide20.JPG" },
        { id: 21, japanese: "だれ / どなた", romaji: "dare / donata", english: "who (donata = polite)", image: "/img/v1/Slide21.JPG" },
        { id: 22, japanese: "〜さい", romaji: "～sai", english: "years old", image: "/img/v1/Slide22.JPG" },
        { id: 23, japanese: "なんさい / おいくつ", romaji: "nansai / oikutsu", english: "how old (oikutsu = polite)", image: "/img/v1/Slide23.JPG" },
        { id: 24, japanese: "はい", romaji: "hai", english: "yes", image: "/img/v1/Slide24.JPG" },
        { id: 25, japanese: "いいえ", romaji: "iie", english: "no", image: "/img/v1/Slide25.JPG" },
        { id: 26, japanese: "しつれいですが", romaji: "shitsurei desu ga", english: "excuse me, but (used when asking personal info)", image: "/img/v1/Slide26.JPG" },
        { id: 27, japanese: "はじめまして", romaji: "hajimemashite", english: "How do you do? (first meeting)", image: "/img/v1/Slide27.JPG" },
        { id: 28, japanese: "どうぞよろしく", romaji: "douzo yoroshiku", english: "Nice to meet you / please treat me well", image: "/img/v1/Slide28.JPG" },
        { id: 29, japanese: "こちらは〜さんです", romaji: "kochira wa ~ san desu", english: "This is Mr./Ms. ~", image: "/img/v1/Slide29.JPG" },
        { id: 30, japanese: "〜からきました", romaji: "~ kara kimashita", english: "I came from ~", image: "/img/v1/Slide30.JPG" }
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

export default Katakana;
