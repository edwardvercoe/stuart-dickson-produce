'use client'
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import React, { useMemo } from 'react'

import SanityLink from '../SanityComponents/SanityLink'
import { buttonStyles } from './Button'

type MapProps = {
  data: any
}

export const GoogleMapBlock = ({ data }: MapProps) => {
  const { buttons, coordinates } = data
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

  const defaultLocation = useMemo(
    () => ({
      lat: -33.863152,
      lng: 151.0718821,
    }),
    [],
  )

  const containerStyle = {
    width: '100%',
    height: '350px',
  }

  const location = useMemo(
    () => ({
      lat: coordinates?.lat ?? defaultLocation.lat,
      lng: coordinates?.lng ?? defaultLocation.lng,
    }),
    [coordinates, defaultLocation],
  )

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <section className="py-10 md:py-20">
      <div className="flex items-center w-full justify-center">
        {buttons && (
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center mb-6">
            {buttons.map((button, index) => (
              <SanityLink
                key={button._key}
                data={button}
                className={buttonStyles({
                  variant: index === 0 ? 'primary' : 'secondary',
                  className: 'w-full sm:w-auto'
                })}
              >
                <span className="font-medium">{button.linkText}</span>
              </SanityLink>
            ))}
          </div>
        )}
      </div>
      <div className="w-full h-full relative">
        <GoogleMap
          zoom={17}
          center={location}
          mapContainerStyle={containerStyle}
        >
          <MarkerF position={location} />
        </GoogleMap>
      </div>
    </section>
  )
}

export default GoogleMapBlock
