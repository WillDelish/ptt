<script lang="ts">
	import { Button } from "../ui/button";

    type vote = "yes" | "no" | "maybe"
    
    type UserVote = {
        vote: vote,
        utcTime: string
    }

    type UserVoteProp = { [key: string]: vote }

    let { choice, totalVotes = $bindable({}) }: { choice: UserVote, totalVotes: UserVoteProp } = $props();

    type ButtonState = "default" | "outline"

    let buttonVariant = $state("outline");
    let yesButton: ButtonState = $state("outline");
    let noButton: ButtonState = $state("outline");
    let maybeButton: ButtonState = $state("outline");

    $effect(() => {
		updateVoteState(choice, choice.vote);
	});

    function updateVoteState(v: UserVote, btn: vote) {
        choice = v;
        totalVotes[choice.utcTime] = choice.vote;
        if (btn === "yes") {
            yesButton = "default";
            noButton = "outline";
            maybeButton = "outline";
        }

        if (btn === "no") {
            yesButton = "outline";
            noButton = "default";
            maybeButton = "outline";
        }
        
        if (btn === "maybe") {
            yesButton = "outline";
            noButton = "outline";
            maybeButton = "default";
        }
        // console.log(choice)
    }

</script>

<div>
    <Button onclick={() => updateVoteState({
        vote: "yes",
        utcTime: choice.utcTime,
    }, "yes")} variant={yesButton} class="mx-1">Yes</Button>
    <Button onclick={() => updateVoteState({
        vote: "no",
        utcTime: choice.utcTime,
    }, "no")} variant={noButton} class="mx-1">No</Button>
    <Button onclick={() => updateVoteState({
        vote: "maybe",
        utcTime: choice.utcTime,
    }, "maybe")} variant={maybeButton} class="mx-1">Maybe</Button>
</div>