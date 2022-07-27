import React from 'react'
import Slider from 'react-slick'
import {settings} from '../../utils/sliderSettings'
import Card from './Card'

const RowSlider= ({title,data}) => {
  let sliderSettings = {...settings};
  if(data?.length<5){
    sliderSettings.adaptiveHeight=true;
  }
  return (
    <div className="sm:px-10 mb-6">
      <h1 className="text-white text-xl sm:text-2xl font-medium mb-3">{title}</h1>
      <Slider {...sliderSettings}>
        {data.slice(0,10).map((item)=><Card key={item.id} movie={item}/>)}
      </Slider>
    </div>
  )
}

export default RowSlider