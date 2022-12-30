import React, { useRef, useState } from "react";

import {
    ChevronLeftIcon,
    ChevronRightIcon,
    IconButton,
    Pane,
} from "evergreen-ui";

import { Navigation } from "swiper";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";

import classNames from "classnames";

import "swiper/css";
import "swiper/css/navigation";

import "./slider.scss";

type SliderProps = SwiperProps & {};

export const Slider: React.FC<SliderProps> = ({ children, ...props }) => {
    const [canSlide, setCanSlide] = useState({ prev: false, next: true });

    return (
        <Pane className="slider-wrapper">
            <Swiper
                className="slider"
                modules={[Navigation]}
                navigation={{
                    nextEl: ".next-button",
                    prevEl: ".prev-button",
                }}
                onSlideChange={(swiper) => {
                    const hasNext = !swiper.isEnd;
                    const hasPrev = !swiper.isBeginning;

                    setCanSlide((canSlide) => ({
                        prev: hasPrev,
                        next: hasNext,
                    }));
                }}
                {...props}
            >
                {React.Children.map(children, (child) => (
                    <SwiperSlide>{child}</SwiperSlide>
                ))}
            </Swiper>

            <IconButton
                className={classNames("prev-button", {
                    "prev-button__active": canSlide.prev,
                })}
                icon={ChevronLeftIcon}
                borderRadius="50%"
            />

            {canSlide.next && (
                <IconButton
                    className={classNames("next-button", {
                        "next-button__active": canSlide.next,
                    })}
                    icon={ChevronRightIcon}
                    borderRadius="50%"
                />
            )}
        </Pane>
    );
};
