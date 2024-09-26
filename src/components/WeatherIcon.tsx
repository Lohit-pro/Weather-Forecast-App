import Image from 'next/image'
import React from 'react'

type Props = {
    weatherCode: string;
}

export default function WeatherIcon({weatherCode}: Props) {
  return (
    <div>
        <Image width={50} height={50} alt='' src={`https://openweathermap.org/img/wn/${weatherCode}d@4x.png`} />
    </div>
  )
}