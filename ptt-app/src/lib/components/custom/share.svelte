<script>
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
    import { ClipboardCopy, ClipboardCheck } from 'lucide-svelte';

	export let id

</script>

<Card class="mx-auto w-full max-w-sm">
	<div class="flex items-center justify-between p-4">
		<div class="flex-1 truncate">
			<p class="text-sm font-medium text-gray-900 dark:text-gray-50">
				https://planthisthing.com/event/{id}
			</p>
		</div>
		<Button class="rounded-md hover:bg-primary-foreground" size="icon" variant="ghost">
            	<ClipboardCopy class="text-primary self-center"/>
		</Button>
	</div>
</Card>
