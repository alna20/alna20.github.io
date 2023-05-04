<script setup lang="ts"></script>

<template>
    <div class="date-container">
        <!-- Delivery date -->
        <div class="date-column">
            <label For="deliveryDate" class="date-label"
                >Datum för önskad leverans</label
            >
            <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                v-model="payloadStore.deliveryDate.value"
                :min="setMinDeliveryDate()"
                :class="{ 'input-error': payloadStore.deliveryDate.hasError }"
                @focus="payloadStore.clearErrorOnFocus('deliveryDate')"
            />
        </div>
        <!-- Pickup date -->

        <div class="date-column">
            <label for="pickupDate" class="date-label"
                >Datum för hemtagning</label
            >

            <input
                type="date"
                id="pickupDate"
                name="pickupDate"
                v-model="payloadStore.pickupDate.value"
                :min="setMinPickupDate()"
                :class="{ 'input-error': payloadStore.pickupDate.hasError }"
                @focus="payloadStore.clearErrorOnFocus('pickupDate')"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { usePayloadStore } from "@/store/orderStore";
import dayjs from "dayjs";
export default {
    mounted() {
        this.$watch(
            () => [
                this.payloadStore.deliveryDate.hasError,
                this.payloadStore.pickupDate.hasError,
            ],
            (_newValue: any, _oldValue: any) => {
                // Do nothing in the callback
            }
        );
    },
    methods: {
        setMinDeliveryDate() {
            return dayjs().add(2, "day").format("YYYY-MM-DD").toString();
        },
        setMinPickupDate(): string {
            return dayjs(this.payloadStore.deliveryDate.value)
                .add( 2, "day")
                .format("YYYY-MM-DD")
                .toString();
        },
    },
    data() {
        return {
            payloadStore: usePayloadStore(),
        };
    },
};
</script>

<style scoped>
.date-label {
    margin-bottom: 10px;
    margin-top: 20px;
}
.date-container {
    display: flex;
    font-size: medium;
    margin-bottom: 20px;
    gap: 40px;
}

.date-container input {
    font-family: "ubuntu", serif;
    background-color: white;
    box-shadow: #0000002e 3px 3px 20px;
    border: none;
    width: 110px;
    border-radius: 5px;
    padding: 5px;
}

.date-container input:focus {
    outline: rgb(151, 149, 149) solid 1px;
}

input[type="date"] {
    font-family: "ubuntu", serif;
    width: 110px;
    padding: 7px;
    background: #ffffff;
    box-shadow: 10px 10px 34px rgba(49, 49, 49, 0.1);
    border-radius: 12px;
}
::-webkit-calendar-picker-indicator {
    color: white;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 24 24"><path fill="white" d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"/></svg>');
    background-color: rgb(0, 0, 0);
    border: none;
    border-radius: 5px;
    box-shadow: #0000002e 3px 3px 20px;
    padding: 5px;
}
.date-column {
    display: flex;
    flex-flow: column wrap;
    word-break: break-word;
    width: min-content;
}
</style>
