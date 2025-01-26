<script lang="ts">
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
    import { Button } from '$lib/components/ui/button/index.js';
	import Modal from './Modal.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient, valibotClient } from 'sveltekit-superforms/adapters';

    // function showModal() {
	// 	pushState('', {
	// 		modal: true
	// 	});
	// }

	const formData: SuperValidated<Infer<FormSchema>> = $props();

	const form = superForm(formData, {
		validators: zodClient(formSchema),
		dataType: 'json'
	});

	const { form: formDb, enhance } = form;

/* 
next steps: 
1. Make the modal input the page
2. Create a modal componment that you can slot in something
3. Use that componment with the fancy push state to load this add date/time page.

*/

</script>

<!-- {#if page.state.modal}
	<Modal showModal={() => history.back()} />
{/if}

<Button onclick={() => (showModal())}> show modal </Button> -->

<div class="flex mx-auto flex-col justify-center items-center">
	<form method="POST" action="?/addDate" use:enhance>
		<Form.Field {form} name="date">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Date</Form.Label>
					<Input type="date" {...props} bind:value={$formDb.date} />
				  {/snippet}
			</Form.Control>
			<Form.Description>Choose a date for your event.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="time">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Time</Form.Label>
					<Input type="time" {...props} bind:value={$formDb.time} />
				  {/snippet}
			</Form.Control>
			<Form.Description>Choose a time for your event.</Form.Description>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Submit</Form.Button>
	</form>
</div>