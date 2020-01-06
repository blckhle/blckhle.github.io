setTimeout(function(){
	document.body.classList.add('body_visible');
}, 500);
const ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });
input.oninput = function() {
  result.innerHTML = input.value;
  ww = input.value;
  w = ww.length
  type.innerHTML =  ww.length;
};
document.addEventListener('DOMContentLoaded', async () => {
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
    window.node = node
    const status = node.isOnline() ? 'online' : 'offline'
  //console.log(`Node status: ${status}`)
    document.getElementById('status').innerHTML = `статус:${status}`
  })
  async function addFile () {
    s = ' '; s = s.replace(/^\s+|\s+$/g, '');if(document.getElementById("input").value == s){     
        alert("пусто");    
    } else {
      var x = document.getElementById("input").value;
      const filesAdded = await node.add(x)
      filesAdded.forEach((file) => document.getElementById("hash").innerHTML = file.hash);
      hss =  document.getElementById("hash");
      filesAdded.forEach((file) => hss.setAttribute('href', 'https://gateway.ipfs.io/ipfs/'+file.hash));
      hss.setAttribute('target', 'blank');
     // console.log('successfully stored', file.hash);
      document.getElementById("result").innerHTML = x;
      document.getElementById("type").innerHTML = ' <span class="post_label">POST</span>';
      }
  }
   async function catFile(){s = ' ';s = s.replace(/^\s+|\s+$/g, '');if(document.getElementById("input").value == s){                       
            alert("пусто");           
        } else {
      var x = document.getElementById("input").value;
      const data = await node.cat(x)
      console.log(data.toString())
  document.getElementById("result").innerHTML = data.toString();
  document.getElementById("hash").innerHTML = x;
  hss =  document.getElementById("hash");
  hss.setAttribute('href', 'https://gateway.ipfs.io/ipfs/'+x);
  hss.setAttribute('target', 'blank');
  document.getElementById("type").innerHTML = '<span class="get_label">GET</span>';
        }
    }
  $("#upload").on("change", function() {
  var reader = new FileReader();
  reader.onload = function (e) {
    const magic_array_buffer_converted_to_buffer = buffer.Buffer(reader.result);
    ipfs.add(magic_array_buffer_converted_to_buffer, (err, result) => {
      console.log(err, result);
      let ipfsLink = "<a href='https://gateway.ipfs.io/ipfs/" + result[0].hash + "' target='blank''> " + result[0].hash + "</a>";
      document.getElementById("hash").innerHTML = ipfsLink;
    })
  }
  reader.readAsArrayBuffer(this.files[0]);
})
