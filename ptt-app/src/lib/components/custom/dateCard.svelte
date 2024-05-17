<script lang="ts">
    import * as Table from "$lib/components/ui/table";
    import { Button } from '$lib/components/ui/button/index';
	import * as Card from '$lib/components/ui/card/index';
    import * as Select from "$lib/components/ui/select";
	import { Checkbox } from '$lib/components/ui/checkbox/index';
	import { Input } from '$lib/components/ui/input/index';

</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Date: Friday 28th, March 2029</Card.Title>
        <Card.Description>
            Vote on times bellow:
        </Card.Description>
    </Card.Header>
    <Card.Content>
        <Table.Root>
            <Table.Header>
            <Table.Row>
                <Table.Head>Time</Table.Head>
                <Table.Head>Vote</Table.Head>
            </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row>
                    <Table.Cell>6:30pm PST</Table.Cell>
                    <Table.Cell>
                        <Select.Root>
                            <Select.Trigger class="w-[180px]">
                              <Select.Value placeholder="Vote" />
                            </Select.Trigger>
                            <Select.Content>
                              <Select.Item value="yes" class="bg-green-500 hover:bg-green-600">Yes</Select.Item>
                              <Select.Item value="maybe" class="bg-yellow-500">Maybe</Select.Item>
                              <Select.Item value="no" class="bg-red-500">No</Select.Item>
                            </Select.Content>
                          </Select.Root>
                    </Table.Cell>
                </Table.Row>
            </Table.Body>
        </Table.Root>
    </Card.Content>
    <Card.Footer class="border-t px-6 py-4">
        <Button>Save</Button>
    </Card.Footer>
</Card.Root>