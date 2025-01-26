<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import { Input } from '$lib/components/ui/input/index';
    import * as Form from '$lib/components/ui/form';
	import { nameFormSchema, type NameFormSchema } from '$lib/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	export let data: SuperValidated<Infer<NameFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(nameFormSchema)
	});

	const { form: formData, enhance } = form;

</script>

<Card.Root class="mx-auto w-full max-w-sm">
    <Card.Header>
        <Card.Title class="text-2xl px-10"><span class="text-primary">Hello!</span></Card.Title>
        <Card.Description>Add your name and timezone</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-4">
        <form method="POST" action="?/newEvent" use:enhance>
            <Form.Field {form} name="name">
                <Form.Control let:attrs>
                    <Form.Label>Title</Form.Label>
                    <Input {...attrs} bind:value={$formData.name} />
                </Form.Control>
                <Form.Description>Your name</Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Field {form} name="time">
                <Form.Control let:attrs>
                    <Form.Label>Date</Form.Label>
                    <Input {...attrs} bind:value={$formData.time} />
                </Form.Control>
                <Form.Description>Your timezone</Form.Description>
                <Form.FieldErrors />
            </Form.Field>
            <Form.Button>Submit</Form.Button>
        </form> 
    </Card.Content>
    <!-- <Card.Footer class="flex justify-between">
        <Button>Add Name</Button>
    </Card.Footer> -->
</Card.Root>