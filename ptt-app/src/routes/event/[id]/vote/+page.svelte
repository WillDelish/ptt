<script lang="ts">
    import DateCard from '$lib/components/custom/dateCard.svelte';
    import ShareLink from '$lib/components/custom/share.svelte';
    import NameCard from '$lib/components/custom/nameCard.svelte';

    export let data;
</script>

<div class="grid gap-4 z-10">
    <div class="mx-auto pb-8">
        <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-balance"><span class="text-orange-600">Event:</span> {data.d.title}</h1>
        <p class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl text-balance">Lets plan this thing!</p>
    </div>
    <!-- <DateCard {data} /> -->
    <!-- <ShareLink /> -->
    <!-- <NameCard /> -->
    <!-- <DataTable /> -->
    <!-- <ResultsCard {data} /> -->
</div>

<!-- <div class="grid grid-cols-3 items-center h-screen">
    <div class="col-span-3">
      <h1 class="text-center">Events</h1>
    </div>
  </div> -->