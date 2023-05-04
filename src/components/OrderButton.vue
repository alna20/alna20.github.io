<template>
    <div
        class="alert-container" 
        :class="
            payloadStore.selectedContainer.hasError
                ? 'animation-in'
                : 'animation-out'
        "
    >
        <p>Välj en container för att fortsätta!</p>
    </div>
    <div>
        <button
            class="order-button"
            @click="handleClick"
        >
            Beställ
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import emailjs from "emailjs-com";
import { usePayloadStore } from "@/store/orderStore";

export default defineComponent({
    name: "OrderButton",
    mounted() {
        emailjs.init("aJoppP8gvteb65_ur");
    },
    data() {
        return {
            payloadStore: usePayloadStore(),
        };
    },
    methods: {
        handleClick() {
            if (!this.payloadStore.validateFields()) {
                return false;
            }

            /* this.sendDataToApi();
            this.sendAdminEmail(); */
            this.$router.push("/OrderConfirmation");
        },
        returnOrderData() {
            const payloadStore = usePayloadStore();
            const adminEmail = "zakaharif@hotmail.se";
            const markerLink = "https://www.google.com/maps/search/?api=1&query="+
            `${payloadStore.containerMarker.value.lat},`+
            `${payloadStore.containerMarker.value.lng}`;
            const imageSrc = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=5";

            return {
                to_email: adminEmail,

                deliveryDate: payloadStore.deliveryDate.value,
                pickupDate: payloadStore.pickupDate.value,
                firstname: payloadStore.firstName.value,
                lastname: payloadStore.lastName.value,
                socialSecurity: payloadStore.socialSecurity.value,
                phoneNumber: payloadStore.phoneNumber.value,
                email: payloadStore.email.value,
                address: payloadStore.address.value,
                zipcode: payloadStore.zipCode.value,
                city: payloadStore.city.value,
                imageSrc: imageSrc,
                title: payloadStore.selectedContainer.value?.title || "",
                length: payloadStore.selectedContainer.value?.length || 0,
                width: payloadStore.selectedContainer.value?.width || "",
                height: payloadStore.selectedContainer.value?.height || "",
                markerLink: markerLink,
            }
        },
        /* sendEmail() {
            emailjs
                .send(
                    "service_ne3xu3v",
                    "template_chpkccp",
                    {
                        to_name: "Recipient Name",
                        from_name: "Your Name",
                        message:
                            "This is a test email sent from Vue.js using EmailJS and Gmail.",
                        to_email: "jawntalol@gmail.com",
                    },
                    "aJoppP8gvteb65_ur"
                )
                .then(
                    function (response) {
                        console.log("SUCCESS!", response.status, response.text);
                    },
                    function (error) {
                        console.log("FAILED...", error);
                    }
                );
        }, */
        sendAdminEmail() {
            const order_data = this.returnOrderData();
            emailjs.send(
                "service_ne3xu3v",
                "template_1e44wa8",
                order_data,
                "aJoppP8gvteb65_ur"
            )
            .then(
                function (response) {
                    console.log("SUCCESS!", response.status, response.text);
                },
                function (error) {
                    console.log("FAILED...", error);
                }
            );
        },
        async sendDataToApi() {
            const order_data = this.returnOrderData();
            try {
                await fetch("http://localhost:8008/orders", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(order_data)
                });
            } catch (error) {
                console.error(error);
            }
        }
    },
});
</script>

<style>

.order-button {
    font-weight: medium;
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #2c84d0;
    box-shadow: 0 16px 24px rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    cursor: pointer;
    font-size: 17px;
    min-width: 250px;
    padding: 15px;
    margin-bottom: 5px;
    margin-top: 40px;
    border: none;
    color: white;
}

.alert-container {
    position: fixed;
    background-color: #ff5d5d;
    border-radius: 15px;
    padding: 10px;
    z-index: 999;
    color: white;
    transform: translateY(-120px);
    transition: translateY 0.2s ease-in-out;
}

.animation-in {
    animation: slide-in 0.1s ease-out forwards;
}

.animation-out {
    animation: slide-out 0.1s ease-out forwards;
}

@keyframes slide-in {
    to {
        transform: translateY(0px);
    }
}

@keyframes slide-out {
    to {
        transform: translateY(-120px);
    }
}

</style>
