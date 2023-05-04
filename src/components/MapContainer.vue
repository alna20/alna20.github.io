<template>
    <div class="map-view">
        <h1>Containerplacering</h1>
        <p class="placering-info">
            Ange placering för containern genom att sätta en markör.
        </p>
        <GMapMap
            ref="myMapRef"
            :center="center"
            :zoom="14"
            map-type-id="hybrid"
            :options="options"
            style="height: 300px; border-radius: 10px;"
            :style="
                payloadStore.containerMarker.hasError
                    ? 'outline: 2px solid #ff5d5d;'
                    : ''
                "
            @click="setMarker"
        >
            <GMapMarker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :icon="'../src/assets/img/container_icon.png'"
                :draggable="true"
                @dragend="setMarker"
            />
        </GMapMap>
        <GMapAutocomplete
            placeholder="Flytta kartan till:"
            @place_changed="setPlace"
            class="GMapAutoComp"
            :options="{
                componentRestrictions: {
                    country: [
                        'se',
                    ],
                },
            }"
            
        >
        </GMapAutocomplete>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePayloadStore } from "@/store/orderStore";

export default defineComponent({
    name: "MapContainer",
    data() {
        return {
            payloadStore: usePayloadStore(),
            location: "",
            options: {
                clickableIcons: false
            },
            center: { lat: 56.16156, lng: 15.58661 },
            noLocation: { lat: 0, lng: 0 },
            markers: [
                {
                    position: {
                        lat: 0,
                        lng: 0,
                    },
                },
            ],
        };
    },
    mounted() {
        // Set payload marker to 0, 0
        this.payloadStore.containerMarker.value = "";
    },
    methods: {
        setPlace(place: any) {
            const myMap = this.$refs.myMapRef as any;
            myMap.fitBounds(place.geometry.viewport); // sets zoom

            this.center = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
            };

            // when setting new place,
            // remove marker, and reset payload
            this.payloadStore.containerMarker.value = "";
            this.markers[0].position = this.noLocation;
        },
        setMarker(event: any) {
            const newMarkerLocation = {
                lat: event.latLng.lat(),
                lng: event.latLng.lng()
            };

            this.markers[0].position = newMarkerLocation;
            this.payloadStore.containerMarker.value = newMarkerLocation;

            this.payloadStore.clearErrorOnFocus('containerMarker');
        }
    },
});
</script>

<style>
.gmnoprint {
    display: none;
}

.map-view {
    width: 300px;
    margin-bottom: 20px;
}

.placering-info {
    font-size: 16px;
    margin: 0 0 10px 0;
}

.input-error {
    outline: 2px solid #ff5d5d !important;
}

.GMapAutoComp {
    max-width: 275px;
    background-color: #fff;
    background-image: none;
    border: 1px solid #919191;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    padding: 6px 12px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.GMapAutoComp{
    width: 100%;
    text-align: left;
    display: grid;
    margin-bottom: 30px;
    margin-top: 30px;
}

.GMapAutoComp {
    border: 2px solid #ededed;
    border-radius: 6px;
    box-shadow: none;
    color: #1e1e1e;
    font-family: Inter-400, sans-serif;
    font-size: 1rem;
    height: 3rem;
}

.GMapAutoComp:focus {
    outline: rgb(151, 149, 149) solid 1px;
}
</style>
