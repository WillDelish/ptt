<script lang="ts">
	import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Input } from '$lib/components/ui/input/index';
	import { Label } from '$lib/components/ui/label/index';
</script>

<div class="grid">
    <div class="mx-auto pb-8 pt-4">
        <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-balance">Plan This Thing!</h1>
        <p class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl text-balance">Send your friends and family an easy link to vote on a date & time that works for everyone!</p>
    </div>
        <Card.Root class="mx-auto w-full max-w-sm">
            <Card.Header>
                <Card.Title class="text-2xl px-10">Create an Event</Card.Title>
                <Card.Description>Lets make this thing happen!</Card.Description>
            </Card.Header>
            <Card.Content class="grid gap-4">
                <div class="grid gap-2">
                    <Label for="name">Event Name</Label>
                    <Input id="name" type="text" placeholder="Fancy BBQ" required />
                    <Label for="date">Event Date</Label>
                    <Input id="date" type="date" required />
                    <Label for="time">Event Time</Label>
                    <Input id="time" type="time" required />
                </div>
            </Card.Content>
            <Card.Footer class="flex justify-between">
                <Button>Create</Button>
            </Card.Footer>
        </Card.Root>
</div>