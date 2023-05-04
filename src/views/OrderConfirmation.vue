<script setup lang="ts">
import { usePayloadStore } from "@/store/orderStore";
const payloadStore = usePayloadStore();
</script>
<template>
    <div class="main">
        <h1>Tack för din beställning!</h1>
        <div class="order-details" v-if="payloadStore">
            <h2>Order:</h2>
            <p>Container: {{ payloadStore.selectedContainer.value?.title }}</p>
            <p>Leveransdatum: {{ payloadStore.deliveryDate.value }}</p>
            <p>Upphätmningsdatum: {{ payloadStore.pickupDate.value }}</p>

            <h2>Dina uppgifter:</h2>
            <p>Förnamn: {{ payloadStore.firstName.value }}</p>
            <p>Efternamn: {{ payloadStore.lastName.value }}</p>
            <p>Personnummer: {{ payloadStore.socialSecurity.value }}</p>
            <p>Telefonnummer: {{ payloadStore.phoneNumber.value }}</p>
            <p>E-post adress: {{ payloadStore.email.value }}</p>
            <p>Gatuadress: {{ payloadStore.address.value }}</p>
            <p>Postnummer: {{ payloadStore.zipCode.value }}</p>
            <p>Ort: {{ payloadStore.city.value }}</p>
        </div>
    </div>
</template>

<script lang="ts">
export default {};
</script>
