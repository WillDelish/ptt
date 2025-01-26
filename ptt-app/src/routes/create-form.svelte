<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient, valibotClient } from 'sveltekit-superforms/adapters';
    import type { PageData } from "./$types.js";

	// export let data: SuperValidated<Infer<FormSchema>>;

	// const data: SuperValidated<Infer<FormSchema>> = $props()
	// const data: PageData = $props();

	// const { form, errors, enhance } = superForm(data.form);

	// const { form: formData, enhance, errors } = form;

	export const data: SuperValidated<Infer<FormSchema>> = $props();

	const form = superForm(data, {
    	validators: zodClient(formSchema),
		dataType: 'json'
  	});
 
  	const { form: formData, enhance } = form;

</script>

<form method="POST" action="?/newEvent" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Title</Form.Label>
				<Input {...props} bind:value={$formData.title} />
		  	{/snippet}
		</Form.Control>
		<Form.Description>The title of your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="date">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Date</Form.Label>
				<Input type="date" {...props} bind:value={$formData.date} />
		  	{/snippet}
		</Form.Control>
		<Form.Description>Choose a date for your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="time">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Time</Form.Label>
				<Input type="time" {...props} bind:value={$formData.time} />
		  	{/snippet}
		</Form.Control>
		<Form.Description>Choose a time for your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
