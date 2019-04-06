interface IRequest {
	name: string;
	date: Date;
}

class Request {
	//field
	public name: string;
	public date: Date;

	//constructor
	constructor(name: string, date: Date) {
		this.name = name;
		this.date = date;
	}
}
let _requests: Array<IRequest> = [];

let RequestQueue = {
	request: function(name: string, url: string, body: object, header: object, stuck, success, cancelled) {
		let newRequest = new Request(name,new Date());
		addRequest(newRequest);

		stuck('error');
		requestStulker(name, url,"get", header, success, body, cancelled);
	},

	cancelRequest: function(param) {
		cancelRequest(param);
	}
};
export default RequestQueue;

function requestStulker(name: string, url: string,method:string, header: object, success: any, body: object, cancelled: any) {
	setTimeout(()=>{
		if (requestExists(name)) {
			xhrRequest(name ,url, method, header, success, body, cancelled);
			requestStulker(name, url,method, header, success, body, cancelled);
			console.log("tiggered")
		}
		else {
			cancelled({});
		}
	},4000);
}

function addRequest(newRequest: IRequest) {
	_requests.push(newRequest);
}

function cancelRequest(name: string): void {
		_requests = _requests.filter(obj => obj.name !== name);
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

function xhrRequest(name:string ,url: string, method: string, header: object, success: any, body: object, cancelled: any) {
	if (requestExists(name)) {
	const xhr = new XMLHttpRequest();
	xhr.open(method, url, true);
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
			cancelRequest(name);
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
}else{
	cancelled();
}
}
