<script lang="ts">
    export let data;

    const idList = data.e.data

    // console.log('id list: ', idList)

</script>

<div class="grid gap-4 z-10">
    <div class="mx-auto pb-8">
        <ul>
            {#each idList as d}
            <li>
                <a href="/event/{d.id}">
                    <span>{d.id}</span>
                </a>
            </li>

            {/each}

        </ul>
    </div>
</div>