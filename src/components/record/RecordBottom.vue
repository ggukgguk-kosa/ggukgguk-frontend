<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToAddRecord() {
    router.push({ name: 'recordAdd'})
}

</script>

<template>
    <v-bottom-navigation>
        <v-btn value="setting">
            <v-icon>mdi-cog</v-icon>
        </v-btn>

        <v-btn value="record" size="large" class="record-btn" color="red" @click="goToAddRecord">
            <v-icon>mdi-circle</v-icon>
        </v-btn>

        <v-btn value="noti">
            <v-icon>mdi-bell</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped>
.record-btn {
    font-size: xx-large !important;
    color: red;
}
</style>