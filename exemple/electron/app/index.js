const { ipcRenderer } = require('electron')
let sel = document.querySelector('.minecraft-version');


document.querySelector('.microsoft').addEventListener('click', async () => {
    document.querySelector('.email').disabled = true
    document.querySelector('.password').disabled = true
    document.querySelector('.microsoft').disabled = true
    ipcRenderer.send('microsoft', 'login')
    ipcRenderer.on('microsoft', (event, data) => {
        if(data === "cancel"){
            document.querySelector('.email').disabled = false
            document.querySelector('.password').disabled = false
            document.querySelector('.microsoft').disabled = false
        } else if(data === "success"){
            document.querySelector('.email').disabled = true
            document.querySelector('.password').disabled = true
            document.querySelector('.microsoft').disabled = true
            document.querySelector('.play').disabled = false
        }
    })
})

document.querySelector('.play').addEventListener('click', async () => {
    ipcRenderer.send('play', sel.value)
})




const fetch = require('node-fetch');



async function get_version_list() {
    let minenecraft_version = (await fetch('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json').then(res => res.json())).versions;
    minenecraft_version.forEach(version => {
        var opt = document.createElement("option");
        opt.value = version.id;
        opt.text = version.id;
        sel.add(opt, null);
    });
}

get_version_list();

