import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Swiper module
import { EffectCards } from 'swiper/modules';

const Katakana = () => {
    const katakana = [
        { kana: "ア", romaji: "a" },
        { kana: "イ", romaji: "i" },
        { kana: "ウ", romaji: "u" },
        { kana: "エ", romaji: "e" },
        { kana: "オ", romaji: "o" },
        { kana: "カ", romaji: "ka" },
        { kana: "キ", romaji: "ki" },
        { kana: "ク", romaji: "ku" },
        { kana: "ケ", romaji: "ke" },
        { kana: "コ", romaji: "ko" },
        { kana: "サ", romaji: "sa" },
        { kana: "シ", romaji: "shi" },
        { kana: "ス", romaji: "su" },
        { kana: "セ", romaji: "se" },
        { kana: "ソ", romaji: "so" },
        { kana: "タ", romaji: "ta" },
        { kana: "チ", romaji: "chi" },
        { kana: "ツ", romaji: "tsu" },
        { kana: "テ", romaji: "te" },
        { kana: "ト", romaji: "to" },
        { kana: "ナ", romaji: "na" },
        { kana: "ニ", romaji: "ni" },
        { kana: "ヌ", romaji: "nu" },
        { kana: "ネ", romaji: "ne" },
        { kana: "ノ", romaji: "no" },
        { kana: "ハ", romaji: "ha" },
        { kana: "ヒ", romaji: "hi" },
        { kana: "フ", romaji: "fu" },
        { kana: "ヘ", romaji: "he" },
        { kana: "ホ", romaji: "ho" },
        { kana: "マ", romaji: "ma" },
        { kana: "ミ", romaji: "mi" },
        { kana: "ム", romaji: "mu" },
        { kana: "メ", romaji: "me" },
        { kana: "モ", romaji: "mo" },
        { kana: "ヤ", romaji: "ya" },
        { kana: "ユ", romaji: "yu" },
        { kana: "ヨ", romaji: "yo" },
        { kana: "ラ", romaji: "ra" },
        { kana: "リ", romaji: "ri" },
        { kana: "ル", romaji: "ru" },
        { kana: "レ", romaji: "re" },
        { kana: "ロ", romaji: "ro" },
        { kana: "ワ", romaji: "wa" },
        { kana: "ヲ", romaji: "wo" },
        { kana: "ン", romaji: "n" }
    ];

    // Generate 10 random katakana pairs once on mount
    const [slides] = useState(() =>
        Array.from({ length: 10 }, () => {
            const idx = Math.floor(Math.random() * katakana.length);
            return katakana[idx];
        })
    );

    const [activeIndex, setActiveIndex] = useState(0);
    const [showRomaji, setShowRomaji] = useState(false);

    // Hide romaji after 5 seconds
    useEffect(() => {
        if (showRomaji) {
            const timer = setTimeout(() => {
                setShowRomaji(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showRomaji]);

    // Hide romaji on slide change
    const onSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
        setShowRomaji(false);
    };

    return (
        <div style={{ width: '300px', margin: 'auto' }}>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                loop={true}
                modules={[EffectCards]}
                className="mySwiper"
                onSlideChange={onSlideChange}
            >
                {slides.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '200px',
                                fontSize: '48px',
                                fontWeight: 'bold',
                            }}
                        >
                            <span>{item.kana}</span>
                            {showRomaji && activeIndex === index && (
                                <span style={{ fontSize: '20px', marginTop: '10px' }}>
                                    {item.romaji}
                                </span>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button
                onClick={() => setShowRomaji(true)}
                style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}
            >
                Show Romaji
            </button>
        </div>
    );
};

export default Katakana;
