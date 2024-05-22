<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" action="?/newEvent" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>Title</Form.Label>
			<Input {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.Description>The title of your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="date">
		<Form.Control let:attrs>
			<Form.Label>Date</Form.Label>
			<Input type=date {...attrs} bind:value={$formData.date} />
		</Form.Control>
		<Form.Description>Choose a date for your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="time">
		<Form.Control let:attrs>
			<Form.Label>Time</Form.Label>
			<Input type=time {...attrs} bind:value={$formData.time} />
		</Form.Control>
		<Form.Description>Choose a time for your event.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
