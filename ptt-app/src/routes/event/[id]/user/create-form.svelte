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
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
</script>

<form method="POST" action="?/addUser" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.Description>Your name I guess</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="timezone">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Timezone</Form.Label>
				<Input {...props} bind:value={$formData.timezone} defaultValue={timezone} />
			{/snippet}
		</Form.Control>
		<Form.Description>Timezone</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form>
