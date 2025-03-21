<template>
    <div class="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
        <div class="bg-primary px-4 py-6 text-primary-foreground">
            <div class="text-center">
                <h2 class="text-xl font-semibold">You are in the queue</h2>
                <div class="mt-4 flex justify-center">
                    <div
                        class="flex h-24 w-24 items-center justify-center rounded-full bg-primary-foreground text-4xl font-bold text-primary">
                        {{ position }}
                    </div>
                </div>
                <p class="mt-4 text-sm">Your position in line</p>
            </div>
        </div>
        <div class="p-6">
            <div class="flex justify-between">
                <div class="text-center">
                    <p class="text-sm font-medium text-muted-foreground">Estimated Wait Time</p>
                    <p class="text-2xl font-bold">{{ estimatedTime }} min</p>
                </div>
                <div class="text-center">
                    <p class="text-sm font-medium text-muted-foreground">Teller Desk</p>
                    <p class="text-2xl font-bold">--</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    position: {
        type: Number,
        required: true
    },
    estimatedTime: {
        type: Number,
        required: true
    }
})
</script>