"use client"
import React, { Component } from 'react';
import Slider from "react-slick";
import AlertBox from './alertBox';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../../styles/_alertSlider.scss";


export default async function AlertSlider () {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 15000,
        autoplaySpeed: 0,
        cssEase: "linear",
        slidesToShow: 3,
        slidesToScroll: 1
    };


    return (
        <>
            <div id="alertSlider">
                <div className="container full">
                    <div className="row">
                        <div className="col-12">
                            <Slider {...settings}>
                                <div><AlertBox/></div>
                                <div><AlertBox/></div>
                                <div><AlertBox/></div>
                                <div><AlertBox/></div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
