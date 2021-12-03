module.exports = function (RED) {
	function WhinNode(config) {
		var http = require('http');
		RED.nodes.createNode(this, config);
		const node = this;

		const resetStatus = () => node.status({});
		const raiseError = (text, msg) => {
			node.status({ fill: "red", shape: "dot", text: text });
			node.error(text, msg);
		};

		node.name = config.name;
		node.authconf = RED.nodes.getNode(config.auth);

		resetStatus();

		node.on('input', function (msg) {
			const options = {
				hostname: 'mqin.inutil.info',
				port: 30333,
				path: '/whin',
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				  'Content-Length': data.length
				}
			  }
			const req = http.request(options, res => {	  
				res.on('data', d => {
				  msg.payload = d.body;    
				})
			  })
			  req.on('error', error => {
				msg.payload = "ERROR";
			  })
            
              const connData = {
				phone: node.authconf.phone,
				token: node.authconf.token,
                                text: msg.payload
			};

            req.write(connData)
            req.end()			
			node.send(msg);				

		});
	}

	RED.nodes.registerType("whin", WhinNode);
}
