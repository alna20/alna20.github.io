<script setup lang="ts"></script>
<template>
    <transition name="slide">
        <div
            v-show="showInfo"
            class="info-popup"
            :class="showInfo ? 'animation-in' : 'animation-out'"
        >
            <p>Längd: {{ selectedCard.length }}</p>
            <p>Bredd: {{ selectedCard.width }}</p>
            <p>Höjd: {{ selectedCard.height }}</p>
            <p>{{ selectedCard.shortContainerInfo }}</p>
            <h3>Pris inklusive moms</h3>
            <p>Avgift per dag: {{ selectedCard.dailyFee }}</p>
            <p>Utsättningsavgift: {{ selectedCard.placementFee }}</p>
            <p>Tömningsavgift: {{ selectedCard.emptyingFee }}</p>
            <p>+ rörlig del per ton (se pris nedan).</p>
            <h3>Pris rörlig del inklusive moms</h3>
            <p>Brännbart avfall: {{ selectedCard.combustibleWaste }}</p>
            <p>Osorterat avfall: {{ selectedCard.unsortedWaste }}</p>
            <p>Trädgårdsavfall: {{ selectedCard.gardenWaste }}</p>
            <button @click="showInfo = false">Close</button>
        </div>
    </transition>

    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div
                v-for="(card, index) in cards"
                :key="index"
                class="swiper-slide"
                :class="
                    payloadStore.selectedContainer.hasError
                        ? 'not-selected-container'
                        : ''
                    "
            >
                <div class="content">
                    <img
                        class="container-image"
                        :src="card.logo"
                        style="width: inherit"
                        alt="container-logo"
                    />
                    <h2>{{ card.title }}</h2>

                    <button
                        :class="{
                            'get-button': true,
                            selected: index === selectedCardIndex,
                        }"
                        @click="selectCard(card, index)"
                        @focus="
                            payloadStore.clearErrorOnFocus('selectedContainer')
                        "
                    >
                        {{ getButtonText(index) }}
                    </button>
                    <button class="info-button" @click="showCardInfo(card)">
                        För mer information kring containern
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Swiper, Pagination } from "swiper";
import "swiper/css/bundle";
import type { ContainerCard } from "@/interfaces";
import { usePayloadStore } from "@/store/orderStore";

export default {
    mounted() {
        /* this.$watch(
            () => [this.payloadStore.selectedContainer.hasError],
            (newValue: any, oldValue: any) => {} // just checks if .hasError has updated
        ); */
        new Swiper(".swiper-container", {
            slidesPerView: "auto",
            spaceBetween: 20,
            centeredSlides: true,
            grabCursor: true,
            modules: [Pagination],
            pagination: {
                el: ".swiper-pagination",
            },
        });
        this.selectedCardIndex = this.payloadStore.selectedContainer.index;
    },
    data() {
        return {
            payloadStore: usePayloadStore(),
            showInfo: false,
            selectedCardIndex: -1,
            selectedCard: {} as ContainerCard,
            cards: [
                {
                    logo: "/src/assets/img/container_8.png",
                    title: "8 Kubikmeter",
                    length: "3130 mm",
                    width: "2074 mm",
                    height: "1857 mm",
                    shortContainerInfo:
                        "Detta är en täckt container som är låsbar.",
                    dailyFee: "33 kronor",
                    placementFee: "525 kronor",
                    emptyingFee: "800 kronor",
                    combustibleWaste: "1731 kronor per ton",
                    unsortedWaste: "2250 kronor per ton",
                    gardenWaste: "363 kronor per ton",
                    modelPath: "/src/assets/models/8c.gltf",
                },
                {
                    logo: "/src/assets/img/container_10.png",
                    title: "10 Kubikmeter",
                    length: "3300 mm",
                    width: "1900 mm",
                    height: "1800 mm",
                    shortContainerInfo:
                        "En öppen container där ena kortsidan är lägre för att det ska vara lättare att nå in.",
                    dailyFee: "33 kronor",
                    placementFee: "525 kronor",
                    emptyingFee: "800 kronor",
                    combustibleWaste: "1731 kronor per ton",
                    unsortedWaste: "2250 kronor per ton",
                    gardenWaste: "363 kronor per ton",
                    modelPath: "/src/assets/models/10c.gltf",
                },
                {
                    logo: "/src/assets/img/container_20.png",
                    title: "20 Kubikmeter",
                    length: "6000 mm",
                    width: "2550 mm",
                    height: "1800 mm",
                    shortContainerInfo:
                        "Denna container är öppen upptill och har en öppningsbar kortsida.",
                    dailyFee: "53 kronor",
                    placementFee: "524 kronor",
                    emptyingFee: "969 kronor",
                    combustibleWaste: "1731 kronor per ton",
                    unsortedWaste: "2250 kronor per ton",
                    gardenWaste: "363 kronor per ton",
                    modelPath: "/src/assets/models/20c.gltf",
                },
            ],
        };
    },
    methods: {
        showCardInfo(card: ContainerCard) {
            this.selectedCard = card;
            this.showInfo = true;
        },
        selectCard(card: ContainerCard, index: number) {
            this.selectedCardIndex = index;
            this.selectedCard = card;
            this.payloadStore.selectedContainer.value = this.selectedCard;
            this.payloadStore.selectedContainer.index = index;
        },
        getButtonText(index: number): string {
            return index === this.selectedCardIndex ? "✓" : "Hyr";
        }
    },

};
</script>

<style scoped>

.swiper-container {
    width: 0;
    padding: 2rem;
}

.swiper-slide {
    display: flex;
    width: 315px;
    height: 460px;
    background-color: white;
    box-shadow: #00000020 10px 10px 40px;
    border-radius: 24px;
}

.content {
    display: grid;
    justify-items: center;
    width: 100%;
    margin: 50px 20px 20px;
    word-break: break-word;
}

.get-button {
    cursor: pointer;
    font-size: 1.5em;
    padding: 15px;
    width: 60%;
    margin-bottom: 30px;
    border: none;
    border-radius: 40px;
    box-shadow: #00000028 4px 4px 20px;
    background-color: #2c84d0;
    color: white;
    min-height: 62px;
}

.info-button {
    cursor: pointer;
    padding: 10px;
    width: 80%;
    border: none;
    border-radius: 40px;
    background-color: #c0e0ff;
    color: #2985e1;
}

.info-popup button{
    text-align: center;
    cursor: pointer;
    padding: 10px;
    width: 50%;
    border: none;
    border-radius: 40px;
    /* background-color: #c0e0ff; */
    color: #2985e1;
}

.info-popup {
    position: fixed;
    text-align: center;
    margin: 20px;
    /* max-width: 400px; */
    padding: 30px;
    background: white;
    box-shadow: #00000028 4px 4px 20px;
    border-radius: 24px;
    z-index: 9999;
}

.selected {
    background: #2894f3;
    /* min-height: 62px; */
}

.not-selected-container {
    outline: 2px solid #ff5d5d;
}

.animation-in {
    animation: slide-in 0.1s ease-out forwards;
}

.animation-out {
    animation: slide-out 0.1s ease-out forwards;
}

@keyframes slide-in {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
}

@keyframes slide-out {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
}

</style>