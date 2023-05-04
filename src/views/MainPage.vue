<script setup lang="ts">
import TopHeader from "@/components/TopHeader.vue";
import Containers from "@/components/ContainerCards.vue";
import Calender from "@/components/DatePickers.vue";
import MapContainer from "@/components/MapContainer.vue";
import UserInfo from "@/components/UserInfo.vue";
import OrderButton from "@/components/OrderButton.vue";
import ArButton from "@/components/ArButton.vue";
</script>

<template>
    <TopHeader />
    <Containers />
    <ArButton />
    <MapContainer />
    <Calender />
    <UserInfo />
    <OrderButton />
</template>
