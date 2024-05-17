<script lang="ts">
    import Navbar from '$lib/components/custom/navbar.svelte';
    import DateCard from '$lib/components/custom/dateCard.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Checkbox } from '$lib/components/ui/checkbox/index';
	import { Input } from '$lib/components/ui/input/index';
</script>

<div class="flex min-h-screen w-full flex-col">
    <Navbar />
	<main
		class="bg-muted/40 flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10"
	>
		<div class="mx-auto grid w-full max-w-6xl gap-2">
			<h1 class="text-3xl font-semibold">Dates</h1>
		</div>
		<div
			class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
		>
			<div class="grid gap-6">
                <DateCard />
			</div>
		</div>
	</main>
</div>