import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import { EffectCards } from 'swiper/modules';

const Hiragana = () => {
    const hiragana = [
        { kana: "あ", romaji: "a" },
        { kana: "い", romaji: "i" },
        { kana: "う", romaji: "u" },
        { kana: "え", romaji: "e" },
        { kana: "お", romaji: "o" },
        { kana: "か", romaji: "ka" },
        { kana: "き", romaji: "ki" },
        { kana: "く", romaji: "ku" },
        { kana: "け", romaji: "ke" },
        { kana: "こ", romaji: "ko" },
        { kana: "さ", romaji: "sa" },
        { kana: "し", romaji: "shi" },
        { kana: "す", romaji: "su" },
        { kana: "せ", romaji: "se" },
        { kana: "そ", romaji: "so" },
        { kana: "た", romaji: "ta" },
        { kana: "ち", romaji: "chi" },
        { kana: "つ", romaji: "tsu" },
        { kana: "て", romaji: "te" },
        { kana: "と", romaji: "to" },
        { kana: "な", romaji: "na" },
        { kana: "に", romaji: "ni" },
        { kana: "ぬ", romaji: "nu" },
        { kana: "ね", romaji: "ne" },
        { kana: "の", romaji: "no" },
        { kana: "は", romaji: "ha" },
        { kana: "ひ", romaji: "hi" },
        { kana: "ふ", romaji: "fu" },
        { kana: "へ", romaji: "he" },
        { kana: "ほ", romaji: "ho" },
        { kana: "ま", romaji: "ma" },
        { kana: "み", romaji: "mi" },
        { kana: "む", romaji: "mu" },
        { kana: "め", romaji: "me" },
        { kana: "も", romaji: "mo" },
        { kana: "や", romaji: "ya" },
        { kana: "ゆ", romaji: "yu" },
        { kana: "よ", romaji: "yo" },
        { kana: "ら", romaji: "ra" },
        { kana: "り", romaji: "ri" },
        { kana: "る", romaji: "ru" },
        { kana: "れ", romaji: "re" },
        { kana: "ろ", romaji: "ro" },
        { kana: "わ", romaji: "wa" },
        { kana: "を", romaji: "wo" },
        { kana: "ん", romaji: "n" }
    ];

    const [slides] = useState(() =>
        Array.from({ length: 10 }, () => {
            const idx = Math.floor(Math.random() * hiragana.length);
            return hiragana[idx];
        })
    );

    const [activeIndex, setActiveIndex] = useState(0);
    const [showRomaji, setShowRomaji] = useState(false);

    useEffect(() => {
        if (showRomaji) {
            const timer = setTimeout(() => {
                setShowRomaji(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showRomaji]);

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

export default Hiragana;
