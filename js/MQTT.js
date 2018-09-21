// Create a client instance
client = new Paho.MQTT.Client("wss://iot.eclipse.org:443/ws","Whisper07");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({ onSuccess: onConnect });


// called when the client connects
function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect");
    //client.subscribe("tw/iot/06");
    //message = new Paho.MQTT.Message("Wellcom");
    //message.destinationName = "tw/iot/06";
    //client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
    }
}

// called when a message arrives
function onMessageArrived(message) {
    console.log("onMessageArrived:" + message.payloadString);
    var output = document.getElementById('txtMsgs');
    output.innerHTML = message.payloadString+"<br>"+output.innerHTML;
   

}
function subTopic()
{
    var top = document.getElementById('txtSubTopic').value;
    client.subscribe(top);
}
function pubTopic()
{
    var sub = document.getElementById('txtPubTopic').value;
    var msg = document.getElementById('txtPubMsg').value;
    message = new Paho.MQTT.Message(msg);
    message.destinationName = sub;
    client.send(message);
}