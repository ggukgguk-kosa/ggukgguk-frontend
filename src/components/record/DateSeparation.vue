<script setup>
import { onMounted, defineEmits, defineProps } from 'vue';

const emit = defineEmits(['mounted']);
const props = defineProps(['date']);

onMounted(() => {
    emit('mounted');
});

</script>

<template>
    <div>
        {{ props.date }}
        <hr />
    </div>
</template>