"use client"
import React, { Component } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../../styles/_banner.scss";


export default async function Banner () {

    return (
        <>
            <div id="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12">
                                    <h1>Title h1</h1>
                                </div>
                                <div className="col-12">
                                    <h2>Title 2</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <h3>Title 3 - This could be a slider with news</h3>
                            <Slider>
                                <div className='slider'>
                                    <div>1</div>
                                    <div>2</div>
                                    <div>3</div>
                                    <div>4</div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
