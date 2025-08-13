import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import image from "./../img/v1/Placeholder-_-Glossary.svg"

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Swiper module
import { EffectCards } from 'swiper/modules';

const Katakana = () => {
    const vocabulary = [
        { id: 1, japanese: "こんにちは", romaji: "Konnichiwa", english: "Hello / Good afternoon", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 2, japanese: "おはようございます", romaji: "Ohayou gozaimasu", english: "Good morning", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 3, japanese: "こんばんは", romaji: "Konbanwa", english: "Good evening", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 4, japanese: "おやすみなさい", romaji: "Oyasuminasai", english: "Good night", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 5, japanese: "ありがとう", romaji: "Arigatou", english: "Thank you", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 6, japanese: "ありがとうございます", romaji: "Arigatou gozaimasu", english: "Thank you (polite)", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 7, japanese: "すみません", romaji: "Sumimasen", english: "Excuse me / Sorry", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 8, japanese: "はい", romaji: "Hai", english: "Yes", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 9, japanese: "いいえ", romaji: "Iie", english: "No", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 10, japanese: "はじめまして", romaji: "Hajimemashite", english: "Nice to meet you", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 11, japanese: "さようなら", romaji: "Sayounara", english: "Goodbye", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 12, japanese: "じゃあね", romaji: "Jaa ne", english: "See you", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 13, japanese: "またね", romaji: "Mata ne", english: "See you again", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 14, japanese: "お元気ですか", romaji: "Ogenki desu ka", english: "How are you?", image: "/src/img/v1/Placeholder-_-Glossary.svg" },
        { id: 15, japanese: "元気です", romaji: "Genki desu", english: "I’m fine", image: "/src/img/v1/Placeholder-_-Glossary.svg" }
    ];




    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ja-JP"; // Japanese voice
        speechSynthesis.speak(utterance);
    };

    return (
        <div style={{ width: '300px', margin: 'auto' }}>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                loop={true}
                modules={[EffectCards]}
                className="mySwiper"

            >
                {vocabulary.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '200px',
                                fontSize: '28px',
                                fontWeight: 'bold',
                            }}
                        >
                            <div>
                                <img src={image} alt={item.japanese} className='img-fluid p-2' />

                                <p style={{ fontSize: "1.5rem", marginTop: "10px" }}>{item.japanese}</p>
                                <p style={{ fontStyle: "italic", color: "#666" }}>{item.romaji}</p>
                                <p>{item.english}</p>

                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>



        </div>
    );
};

export default Katakana;
