<template>
    <v-btn color="red" variant="text" prepend-icon="mdi-trash-can">
        delete
        <v-dialog
            v-model="show"
            activator="parent"
            width="auto"
        >
            <v-card>
                <v-card-text>
                    Are you sure?
                </v-card-text>
                <v-card-actions>
                    <v-btn color="green" @click="() => {onConfirm(); show = false}">Yes</v-btn>
                    <v-btn color="red" @click="show = false">No</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-btn>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
    id: String,
    onConfirm: Function,
})

const show = ref(false)

function confirmed() {
    props.onConfirm()
    show.value = false
}
</script>
