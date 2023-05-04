declare module "@vue-leaflet/vue-leaflet" {
    import { ComponentOptions } from "vue";
    import { Map } from "leaflet";

    export const LMap: ComponentOptions<{ map: Map }>;
    export const LTileLayer: ComponentOptions<{
        url: string;
        tileSize?: number | [number, number];
        attribution?: string;
    }>;
    export const LMarker: ComponentOptions<{
        latLng: [number, number];
        draggable?: boolean;
    }>;
    export const LPopup: ComponentOptions<{
        latLng: [number, number];
        content: string;
    }>;
}
