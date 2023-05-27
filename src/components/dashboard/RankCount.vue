<template>
    <v-col cols="12" sm="3" md="3" lg="2">
        <v-card :color="rank" class="justify-center align-center text-center">
            <v-card-item :title="Capitalize(rank) + 's'"></v-card-item>

            <v-card-item class="pt-0 pb-0"><v-divider></v-divider></v-card-item>

            <v-card-text class="py-0">
                <v-row align="center" class="pa-2 justify-center align-center">
                    <v-col class="text-h4">{{ count }}</v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script setup>
import { Capitalize } from '@/utils'
const props = defineProps({
    rank: String,
    count: Number,
})
</script>
