<script setup lang="ts">
import TopLogo from "@/components/TopLogo.vue";
</script>

<template>
    <div class="main-wrapper">
        <TopLogo />
        <RouterView />
    </div>
</template>

<style>

p,
h1,
h2,
h3,
label,
button {
    font-family: "Ubuntu", serif;
}

.main-wrapper {
    padding: 25px;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    overflow-x: hidden;
}
</style>
