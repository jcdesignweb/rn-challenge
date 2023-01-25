
import { useState } from "react";

import { urlPaths } from '@/utils'

import { GoogleMap, useJsApiLoader, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: 'auto',
    height: '600px'
};


function Map({ searchMarkerCoors, markers }: any) {
    let destination = {}
    const [driving_service, setDrivingService] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: urlPaths.MAP_KEY
    })


    if (markers.length > 0) {
        const destinationCoors = markers[0].warehouse.latlong.split(', ')
        destination = { lat: Number(destinationCoors[0]), lng: Number(destinationCoors[1]) }
    }

    function directionsCallback(response: any) {
        console.log(response)

        if (response !== null) {
            if (response.status === 'OK') {
                setDrivingService(response)
            } else {
                console.log('response: ', response)
            }
        }
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={searchMarkerCoors}
            zoom={15}
        >
            <Marker position={searchMarkerCoors} label="Mi punto" />

            {
                markers.map((markElement: any) => {

                    const markerLoc = markElement.warehouse.latlong.split(', ')
                    return <Marker position={{ lat: Number(markerLoc[0]), lng: Number(markerLoc[1]) }} label={markElement.warehouse.name} />
                })
            }

            <DirectionsService
                // required
                options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                    destination: destination,
                    origin: searchMarkerCoors,
                    travelMode: 'WALKING'
                }}
                // required
                callback={directionsCallback}
                // optional
                onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                }}
                // optional
                onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                }}
            />
            {
                driving_service !== null &&
                (
                    <DirectionsRenderer
                        // required
                        options={{ // eslint-disable-line react-perf/jsx-no-new-object-as-prop
                            directions: driving_service
                        }}
                        // optional
                        onLoad={directionsRenderer => {
                            console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                        }}
                        // optional
                        onUnmount={directionsRenderer => {
                            console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                        }}
                    />
                )
            }
            <></>
        </GoogleMap>
    ) : <></>
}

export default Map