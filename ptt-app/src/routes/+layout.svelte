<script>
	import '../app.pcss';
	import { ModeWatcher } from "mode-watcher";
	import Navbar from '$lib/components/custom/navbar.svelte';
	import Footer from '$lib/components/custom/footer.svelte';
</script>

<ModeWatcher />
<Navbar />
<slot></slot>
<Footer />