<script>
	import '../app.pcss';
	import { ModeWatcher } from "mode-watcher";
	import Navbar from '$lib/components/custom/navbar.svelte';
</script>

<ModeWatcher />
<Navbar />
<slot></slot>