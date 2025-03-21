<template>
    <div class="space-y-6">
        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Students Served Today</span>
                <span class="text-sm font-medium">12/20</span>
            </div>
            <div class="h-2 w-full bg-muted overflow-hidden rounded-full">
                <div class="h-full bg-primary rounded-full" style="width: 60%"></div>
            </div>
        </div>

        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Average Service Time</span>
                <span class="text-sm font-medium">8.5 min</span>
            </div>
            <div class="h-2 w-full bg-muted overflow-hidden rounded-full">
                <div class="h-full bg-green-500 rounded-full" style="width: 75%"></div>
            </div>
        </div>

        <div class="space-y-2">
            <div class="flex justify-between items-center">
                <span class="text-sm font-medium">Student Satisfaction</span>
                <span class="text-sm font-medium">4.7/5</span>
            </div>
            <div class="h-2 w-full bg-muted overflow-hidden rounded-full">
                <div class="h-full bg-blue-500 rounded-full" style="width: 94%"></div>
            </div>
        </div>

        <div class="pt-4">
            <h4 class="text-sm font-medium mb-2">Issue Types Handled</h4>
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-xs">Financial Aid</span>
                    <span class="text-xs">5</span>
                </div>
                <div class="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                    <div class="h-full bg-primary rounded-full" style="width: 42%"></div>
                </div>
            </div>

            <div class="space-y-2 mt-2">
                <div class="flex justify-between items-center">
                    <span class="text-xs">Tuition Payment</span>
                    <span class="text-xs">3</span>
                </div>
                <div class="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                    <div class="h-full bg-primary rounded-full" style="width: 25%"></div>
                </div>
            </div>

            <div class="space-y-2 mt-2">
                <div class="flex justify-between items-center">
                    <span class="text-xs">Scholarship</span>
                    <span class="text-xs">2</span>
                </div>
                <div class="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                    <div class="h-full bg-primary rounded-full" style="width: 17%"></div>
                </div>
            </div>

            <div class="space-y-2 mt-2">
                <div class="flex justify-between items-center">
                    <span class="text-xs">Student Loan</span>
                    <span class="text-xs">2</span>
                </div>
                <div class="h-1.5 w-full bg-muted overflow-hidden rounded-full">
                    <div class="h-full bg-primary rounded-full" style="width: 17%"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// No props or state needed for this component
</script>