<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
    import { pushState } from '$app/navigation';
	import { page } from '$app/state';

    let { showModal = $bindable() } = $props();

    // let dialog = $state() as HTMLDialogElement; // HTMLDialogElement

    // $effect(() => {
    //     if (showModal) dialog.showModal();
    // });

    function closeModal() {
		pushState('', {
			modal: false
		});
	}

</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->

{#if page.state.modal}
<!-- <dialog
	bind:this={dialog}
	onclose={() => closeModal()}
	onclick={(e) => { if (e.target === dialog) dialog.close(); }}
> -->
	<div>
		<!-- svelte-ignore a11y_autofocus -->
		<!-- <Button autofocus onclick={() => dialog.close()}>close modal</Button> -->
		<Button autofocus onclick={() => closeModal()}>close modal</Button>
	</div>
<!-- </dialog> -->
{/if}