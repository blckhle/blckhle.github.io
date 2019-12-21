const ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });

$("#upload").on("change", function() {
  var reader = new FileReader();
  reader.onload = function (e) {

    const magic_array_buffer_converted_to_buffer = buffer.Buffer(reader.result);
    ipfs.add(magic_array_buffer_converted_to_buffer, (err, result) => {
      console.log(err, result);
      let ipfsLink = "<a href='https://gateway.ipfs.io/ipfs/" + result[0].hash + " target=blank'> " + result[0].hash + "</a>";
      document.getElementById("link").innerHTML = ipfsLink;
    })
  }
  reader.readAsArrayBuffer(this.files[0]);
})
