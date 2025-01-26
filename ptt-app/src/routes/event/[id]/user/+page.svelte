<script lang="ts">
    import { enhance, applyAction } from '$app/forms';
	// import { Button } from '$lib/components/ui/button/index';
    import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card/index';
	import { Input } from '$lib/components/ui/input/index';
	// import { Label } from '$lib/components/ui/label/index';
    import type { PageData } from "./$types.js";
    // import CreateForm from "./create-form.svelte";
    // import AddUserForm from '$lib/components/custom/addUserForm.svelte';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from './schema.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
    
    export let data: PageData;

    // console.log($page.url.pathname)

    // export let form;
    // export let data;

    // let formThing: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data.form, {
        validators: zodClient(formSchema)
    });

    const { form: formData } = form;
</script>

<Card.Root class="mx-auto w-full max-w-sm">
    <Card.Header>
        <Card.Title class="text-2xl px-10">Add User</Card.Title>
        <Card.Description>Add a new user!</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
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
            <Form.Button>Submit</Form.Button>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-between">
    </Card.Footer>
</Card.Root>