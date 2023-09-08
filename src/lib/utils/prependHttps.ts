export function prependHttps(url: string) {
	return !/http(?:s)?:\/\//g.test(url) ? `https://${url?.trim()}`.toLowerCase() : url;
}
