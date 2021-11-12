const getLyric = (id) => {
    return fetch(`http://music.163.com/api/song/lyric?os=pc&id=${id}&lv=-1&kv=-1&tv=-1`)
    .then((response) => {
        if (response.ok) {
            response.json();
            return response.lrc.lyric;
        }
    })
    .catch((err) => {
        console.warn(err);
    })
};

const getPlayList = (id) =>{
    return fetch('http://music.163.com/api/playlist/detail?id=6771987564')
    .then((response) => {
        if (response.ok) {
            response.json();
            const playList = res.result.tracks.map(item=>({
                id: item.id,
                name: item.name,
                artist: item.artists.map(el=>el.name).join(','),
                url: 'https://music.163.com/song/media/outer/url?id=${item.id}.mp3',
                cover: item.album.picUrl.replace(/http:/,'https:'),
                lrc: getLyric(item.id)
            }));
            return playList;
        }
    })
    .catch((err) => {
        console.warn(err);
    })
};

// const datamusicr = 
// const playList = datamusicr.result.tracks.map(item=>({
//     id: item.id,
//     name: item.name,
//     artist: item.artists.map(el=>el.name).join(','),
//     url: 'https://music.163.com/song/media/outer/url?id='+item.id+'.mp3',
//     cover: item.album.picUrl.replace(/http:/,'https:'),
//     lrc: ''
// }));
// console.warn(playList);

const getmusiclist =()  =>{
    fetch('/js/musiclist.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // console.log(data);
        new APlayer({
            container: document.getElementById('aplayer'),
            fixed: false,
            autoplay: true,
            loop: 'all',
            order: 'random',
            audio: data
        });
    });
};

getmusiclist();
