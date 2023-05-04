<script setup lang="ts"></script>
<template>
    <h1>Dina uppgifter</h1>
    <fieldset>
        <div class="userinfo">
            <label for="given-name">Förnamn *</label>
            <input
                id="given-name"
                v-model="payloadStore.firstName.value"
                :class="{ 'input-error': payloadStore.firstName.hasError }"
                @focus="payloadStore.clearErrorOnFocus('firstName')"
            /><br />

            <label for="family-name">Efternamn *</label>
            <input
                id="family-name"
                v-model="payloadStore.lastName.value"
                :class="{ 'input-error': payloadStore.lastName.hasError }"
                @focus="payloadStore.clearErrorOnFocus('lastName')"
            /><br />

            <label for="ssn">Personnummer</label>
            <input
                id="ssn"
                v-model="payloadStore.socialSecurity.value"
            /><br />

            <label for="tel">Telefonnummer</label>
            <input
                id="tel"
                type="tel"
                v-model="payloadStore.phoneNumber.value"
            /><br />

            <label for="email">E-postadress *</label>
            <input
                type="email"
                id="email"
                pattern=".+@"
                v-model="payloadStore.email.value"
                :class="{ 'input-error': payloadStore.email.hasError }"
                @focus="payloadStore.clearErrorOnFocus('email')"
            /><br />

            <label for="street-address">Adress *</label>
            <input
                id="street-address"
                v-model="payloadStore.address.value"
                :class="{ 'input-error': payloadStore.address.hasError }"
                @focus="payloadStore.clearErrorOnFocus('address')"
            /><br />

            <label for="postal-code">Postnummer *</label>
            <input
                id="postal-code"
                v-model="payloadStore.zipCode.value"
                :class="{ 'input-error': payloadStore.zipCode.hasError }"
                @focus="payloadStore.clearErrorOnFocus('zipCode')"
            /><br />

            <label for="city">Ort *</label>
            <input
                id="city"
                v-model="payloadStore.city.value"
                :class="{ 'input-error': payloadStore.city.hasError }"
                @focus="payloadStore.clearErrorOnFocus('city')"
            /><br />

            <label for="message">Meddelande</label>
            <textarea
                id="message"
                v-model="payloadStore.message.value"
            ></textarea>
            <p style="color: #374149"><i>* Obligatorisk</i></p>
        </div>
    </fieldset>
    
</template>

<script lang="ts">
import { usePayloadStore } from "@/store/orderStore";

export default {
    mounted() {
        this.$watch(
            () => [
                this.payloadStore.firstName.hasError,
                this.payloadStore.lastName.hasError,
                this.payloadStore.email.hasError,
                this.payloadStore.address.hasError,
                this.payloadStore.zipCode.hasError,
                this.payloadStore.city.hasError,
            ],
            (newValue: any, oldValue: any) => {}
        );
    },
    data() {
        return {
            payloadStore: usePayloadStore(),
        };
    },
};
</script>

<style scoped>

fieldset {
    /* position: relative; */
    /* width: 400px; */
    border: none;
}

textarea {
    resize: none;
}

.userinfo {
    width: 100%;
    text-align: left;
    display: grid;
    margin-bottom: 30px;
}

.userinfo label {
    margin-left: 5px;
    margin-bottom: 5px;
    width: fit-content;
}

.userinfo input,
.userinfo textarea {
    max-width: 400px;
    background-color: #fff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    outline: 2px solid #ededed;
    transition: outline 0.15s ease-in-out;
    color: #1e1e1e;
    font-family: Inter-400, sans-serif;
    font-size: 1rem;
    height: 3rem;
}

.userinfo textarea {
    padding: 22px 12px;
    height: 180px;
}

.userinfo input:focus,
.userinfo textarea:focus {
    outline: rgb(151, 149, 149) solid 2px;
}

.input-error {
    outline: 2px solid #ff5d5d !important;
}
</style>
