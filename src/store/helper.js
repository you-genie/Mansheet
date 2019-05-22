export { axiosPostHeader, axiosPatchHeader, axiosGetHeader };
function axiosPostHeader(url, data) {
	var header = {
		method: "post",
		url: url,
		data: data,
		withcredentials: false
	}

	return header;
}

function axiosPatchHeader(url, data) {
	var header = {
		method: "patch",
		url: url,
		data: data,
		withcredentials: false
	}

	return header;
}

function axiosGetHeader(url) {
	var header = {
		method: "get",
		url: url,
		withcredentials: false
	}

	return header;
}
