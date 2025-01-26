<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	// import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { z } from "zod";
	import { Button } from '../ui/button';

	export let id: string;

	// export let data: SuperValidated<Infer<FormSchema>>;
	
	// const formSchema = z.object({
	//     name: z.string().min(2).max(20),
	// });

	// type FormSchema = typeof formSchema;


	// const form = superForm(data, {
	// 	validators: zodClient(formSchema)
	// });

	// const { form: formData, enhance } = form;
</script>

<!-- <form method="POST" action="?/addUser" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control let:attrs>
			<Form.Label>Name</Form.Label>
			<Input {...attrs} bind:value={$formData.name} />
		</Form.Control>
		<Form.Description>Your name I guess</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Submit</Form.Button>
</form> -->

<form method="POST" action="?/addUser" use:enhance>
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label>
		Name
		<Input name="name" type="text" />
	</label>
	<Button class="">Submit</Button>
</form>