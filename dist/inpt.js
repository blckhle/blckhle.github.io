input.oninput = function() {
  result.innerHTML = input.value;
};

document.addEventListener('DOMContentLoaded', async () => {
    const node = await Ipfs.create({ repo: 'ipfs-' + Math.random() })
    window.node = node

    const status = node.isOnline() ? 'online' : 'offline'

    console.log(`Node status: ${status}`)
    document.getElementById('status').innerHTML = `статус: ${status}`

    // You can write more code here to use it. Use methods like
    // node.add, node.get. See the API docs here:
    // https://github.com/ipfs/interface-ipfs-core
  })


  async function addFile () {
    s = ' '; s = s.replace(/^\s+|\s+$/g, ''); if(document.getElementById("input").value == s){     
        alert("пусто");
       
    }

    else {
        
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


    async function catFile () {

        s = ' ';
        s = s.replace(/^\s+|\s+$/g, '');
        if (document.getElementById("input").value == s){
                       
            alert("пусто");
              
        }
    
        else {
      var x = document.getElementById("input").value;
     // const data = await node.cat('QmWNxiFjzTuh8gfZmNvWwYSU9qGvEYiqfgu3FgoRw94doU')
      const data = await node.cat(x)
      console.log(data.toString())
  document.getElementById("result").innerHTML = data.toString();
  document.getElementById("hash").innerHTML = x;
  document.getElementById("type").innerHTML = '<span class="get_label">GET</span>';
        }
    }



    //создадим объект
var obj = {
	name: 'name' ,
	date: 'date' ,
	hash: 'hash'
};

var serialObj = JSON.stringify(obj); //сериализуем его

localStorage.setItem("myKey", serialObj); //запишем его в хранилище по ключу "myKey"

var returnObj = JSON.parse(localStorage.getItem("myKey")) //спарсим его обратно объект

//nme = document.getElementById("obj").innerHTML = returnObj.name



/*
function rec() {
var record;
record = document.createElement('a');
record.setAttribute('id', 'hashr');
record.setAttribute('href', 'https://node/get/hash/');
record.setAttribute('target', 'blank');
nm = document.getElementById("obj").appendChild(record);
}
rec();
document.getElementById("hashr").innerHTML = returnObj.name
*/











const ipfs = window.IpfsHttpClient('ipfs.infura.io', '5001', { protocol: 'https' });
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
