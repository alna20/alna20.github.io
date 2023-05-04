<script setup lang="ts">
import ArIcon from "../assets/img/AR.png";
</script>
<template>
    <div class="ar-wrapper">
        <button class="ar-button" :style="button_style" @click="handleClick">
            Ta bild med AR
            <img :src="ArIcon" style="width: inherit" alt="container-logo" />
        </button>
        <p>
            Genom att använda augmented reality (AR) kan man se en modell av en
            container i vekrligheten och även placera den där man önskar.
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePayloadStore } from "@/store/orderStore";

export default defineComponent({
    data() {
        return {
            payloadStore: usePayloadStore(),
            button_style: "background-color: #363d42"
        }
    },
    methods: {
        handleClick() {
            if ( this.payloadStore.selectedContainer.value !== undefined ) {
                this.$router.push({
                    name: "ArMain",
                });
            }
        },
        set_button_blue() {
            if ( this.payloadStore.selectedContainer.value !== undefined ) {
                this.button_style = "background-color: #2c84d0"
            }
        }
    },
    mounted() {
        this.$watch(
            () => [this.payloadStore.selectedContainer.value],
            () => {this.set_button_blue()}
        );
        this.set_button_blue();
    }
});
</script>

<style>
.ar-wrapper {
    display: flex;
    align-items: center;
    flex-flow: column wrap;
}

.ar-wrapper img {
    width: 40px !important;
    height: 40px;
    margin-left: 3px;
}

.ar-wrapper p {
    color: rgba(0, 0, 0, 0.5);
    font-size: 14px;
}

.ar-button {
    font-weight: medium;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2c84d0;
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: pointer;
    font-size: 1em;
    min-width: 250px;
    padding: 15px;
    margin-bottom: 5px;
    margin-top: 40px;
    border: none;
    border-radius: 40px;
    color: white;
}
</style>
