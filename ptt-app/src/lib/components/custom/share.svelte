<script>
	// Used that fancy AI stuff, this is very cool. We must purify the react code with Svelte though.
	/**
	 * v0 by Vercel.
	 * @see https://v0.dev/t/YJTjHkNcW23
	 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
	 */
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
    import { ClipboardCopy, ClipboardCheck } from 'lucide-svelte';
</script>

<Card class="mx-auto w-full max-w-sm">
	<div class="flex items-center justify-between p-4">
		<div class="flex-1 truncate">
			<p class="text-sm font-medium text-gray-900 dark:text-gray-50">
				https://example.com/share/123456
			</p>
		</div>
		<Button class="rounded-md hover:bg-gray-100 dark:hover:bg-gray-800" size="icon" variant="ghost">
			<div class="h-5 w-5 text-gray-500 dark:text-gray-400"></div>
            <ClipboardCopy />
			<span class="sr-only">Copy link</span>
		</Button>
	</div>
</Card>
