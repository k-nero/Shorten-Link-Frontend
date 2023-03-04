async function fetchJson(url, option = {}, timeout = 5000)
{
	let controller = new AbortController();
	const id = setTimeout(() => {return controller.abort();}, timeout);
	const response = await fetch(url, {
		...option,
		signal: controller.signal,
	});
	clearTimeout(id);
	return response;
}

export default fetchJson;
