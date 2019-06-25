import React from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import LocationIcon from '@material-ui/icons/LocationOn';

import Map from 'pigeon-maps';
import Overlay from 'pigeon-overlay';

const MapCard = withStyles(theme => ({
    root: {
        margin: '5px',
        padding: '5px',
    },
}))(Card);

export default class LocationViewer extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            latitude: 0.0,
            longitude: 0.0,
        };
        
        this.getLocation = this.getLocation.bind(this);
    }

    getLocation (event) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState(state => {
                state.latitude = position.coords.latitude;
                state.longitude = position.coords.longitude;
                return state;
            })
        })
    }

    render () {
        return (
        <MapCard onLoad={this.getLocation}>
            <Map center={[this.state.latitude, this.state.longitude]} zoom={16} width={600} height={400}>

                <Overlay anchor={[this.state.latitude, this.state.longitude]}>
                    <LocationIcon />
                </Overlay>
            </Map>
        </MapCard>
    )}
}
