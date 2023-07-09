<template>
    <v-col cols="12" xl="2" lg="3" md="4" sm="4">
        <v-card :title="user.name" class="text-center">
            <v-card-actions v-if="issues">
                <v-row>
                    <v-col>
                        <v-btn v-if="user.bad_affiliation" append-icon="mdi-open-in-new"
                            :href="'https://robertsspaceindustries.com/citizens/' + user.name + '/organizations'"
                            target="_blank" color="red" variant="tonal" rounded="md">Bad Affiliation</v-btn>
                        <v-btn v-else-if="user.primary_org == 'REDACTED'" append-icon="mdi-open-in-new"
                            :href="'https://robertsspaceindustries.com/citizens/' + user.name" target="_blank" color="red"
                            variant="tonal" rounded="md">Redacted Org</v-btn>
                        <v-btn v-else-if="user.primary_org != 'SOLARMADA' &&
                            user.rank <= 6" append-icon="mdi-open-in-new"
                            :href="'https://robertsspaceindustries.com/citizens/' + user.name + '/organizations'"
                            target="_blank" color="red" variant="tonal" rounded="md">Not Primary</v-btn>
                        <v-btn v-else-if="!user.rsi_member" color="red" variant="tonal"
                            rounded="md">Not on RSI</v-btn>
                    </v-col>
                </v-row>
            </v-card-actions>
            <v-card-actions v-else class="justify-center align-center text-center">
                <v-btn icon="mdi-minus" v-on:click="decrement(user.id)" :disabled="loading"></v-btn>
                <v-counter active :value=user.events class="text-h5 pl-1"></v-counter>
                <v-btn icon="mdi-plus" v-on:click="increment(user.id)" :disabled="loading"></v-btn>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    user: Object,
    increment: Function,
    decrement: Function,
    loading: Boolean,
})

const issues = computed(() => (props.user.bad_affiliation && props.user.rank <= 7)
    || props.user.primary_org == "REDACTED"
    || (props.user.primary_org != 'SOLARMADA' && props.user.rank <= 6)
    || !props.user.rsi_member
    || props.user.rank > 7
)

</script>
