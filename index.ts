interface IRequest {
	name: string;
	isCancelled: boolean;
}

class Request {
	//field
	public name: string;
	public isCancelled: boolean;

	//constructor
	constructor(name: string, isCancelled: boolean) {
		this.name = name;
		this.isCancelled = isCancelled;
	}
}
let _requests: Array<IRequest> = [];

function addRequest(newRequest: IRequest) {
	_requests.push(newRequest);
}

function cancelRequest(name: string, bool: boolean): void {
	_requests[name] ? (_requests[name].isCancelled = bool) : void 0;
}
function isRequestCancelled(name: string): boolean {
	let cancelled = false;
	_requests.map((i) => {
		if (i.name === name && i.isCancelled === true) {
			cancelled = true;
		}
	});
	return cancelled;
}

function requestExists(name): boolean {
	let exists = false;
	_requests.map((i) => {
		if (i.name === name) {
			exists = true;
		}
	});
	return exists;
}

let RequestQueue = {
	request: function(name: string, url: string, body: object, header: object, stuck, success, cancelled) {
		let newRequest = new Request(name, false);
		addRequest(newRequest);

		stuck('error');

		setTimeout(() => {
			if (requestExists(name) && !isRequestCancelled(name)) {
				const xhr = new XMLHttpRequest();
				xhr.open('get', url, true);
				// set the authorization HTTP header
				const header_to_array = Object.keys(header).map((i) => [ i, header[i] ]);
				for (let i = 0; i < header_to_array.length; i++) {
					const eachHeader = header_to_array[i][1];
					Object.keys(eachHeader).map((j) => {
						xhr.setRequestHeader(j, eachHeader[j]);
					});
				}
				xhr.onload = function() {
					if (this.status >= 200 && this.status < 400) {
						// Success!
						const data = JSON.parse(this.response) as Response;
						console.log(data);
						success(data);
					} else {
						// We reached our target server, but it returned an error
						console.log('error');
					}
				};

				xhr.onerror = function(err) {
					// There was a connection error of some sort
					console.log('connection error');
				};

				if (body != null) {
					xhr.send(JSON.stringify(body));
				} else xhr.send();
			} else {
				cancelled({});
			}
		}, 2000);
	},

	cancelRequest: function(param) {
		cancelRequest(param, true);
	}
};
export default RequestQueue;
