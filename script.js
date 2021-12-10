const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
var musicas = [{
        titulo: 'Ponto de Paz ',
        artista: 'Theô',
        src: 'musicas/PontodePaz.mp3',
        img: 'img/7.png'
    },

    {
        titulo: ' pixote Mix',
        artista: 'pixote',
        src: 'musicas/Pixote.mp3',
        img: 'img/2.jpg'
    },

    {
        titulo: 'meia noite e pouca',
        artista: 'Lowz',
        src: 'musicas/Lowz - Meia noite e pouca (prod. Simøn).mp3',
        img: 'img/5.jpg'
    },

    {
        titulo: 'Até você voltar ',
        artista: 'Henrique & juliano',
        src: 'musicas/Henrique e Juliano - Até Você Voltar.mp3',
        img: 'img/3.jpg'
    },

    {
        titulo: 'Pisciana (Prod.Simøn)',
        artista: 'Gabziim x Simøn x Agostta x Ravena',
        src: 'musicas/Gabziim x Simøn x Agostta x Ravena - Pisciana (Prod.Simøn).mp3',
        img: 'img/1.png'
    },


    {
        titulo: 'Cachecol (Prod.MarcusMaia)',
        artista: 'K a m a i t a c h i, Sanza ,Prod.MarcusMaia',
        src: 'musicas/K a m a i t a c h i ft. Sanza - Cachecol (Prod.MarcusMaia).mp3',
        img: 'img/cachecol.jpg'
    },

    {
        titulo: 'Café das 6',
        artista: 'K a m a i t a c h i',
        src: 'musicas/K a m a i t a c h i - Café das 6.mp3',
        img: 'img/cafédas6.jpg'
    },

    {
        titulo: 'Carrinho de madeira',
        artista: 'K a m a i t a c h i',
        src: 'musicas/K a m a i t a c h i - carrinho de madeira.mp3',
        img: 'img/carrinhodemadeira.jpg'
    },

    {
        titulo: 'Cabelos Arco-íris',
        artista: 'K a m a i t a c h i',
        src: 'musicas/k a m a i t a c h i - Cabelos Arco-íris.mp3',
        img: 'img/cabelosarcoiris.jpg'
    },
];

let musica = document.querySelector('audio');

let indexMusica = 0;

let duracaoMusica = document.querySelector('.fim');

let imagem = document.querySelector('img');

let nomeMusica = document.querySelector('.descrição h2');

let nomeArtista = document.querySelector('.descrição i');

let progressBar = document.querySelector('#volumeaudio');
progressBar.addEventListener('click', seek);

let volume = 100;


renderizarMusica(indexMusica);

//eventos do script
document.querySelector('.botao-play').addEventListener('click', tocarMusica);

document.querySelector('.botao-pause').addEventListener('click', pausarMusica);
/*volume*/
document.querySelector('.diminuir').onclick = diminuirVolume;

document.querySelector('.aumentar').onclick = aumentarVolume;


musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 9;
    }
    renderizarMusica(indexMusica);
    musica.play();
});
document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 9) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
    musica.play();
})

atualizarVolume(volume);
//funções

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src);
    musica.addEventListener('loadeddata', () => {
        
        nomeMusica.textContent = musicas[index].titulo;
        nomeArtista.textContent = musicas[index].artista;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

    })
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarMusica() {
    musica.addEventListener('meta')
    
}

function atualizarBarra() {
    var barra = document.querySelector('#duracao');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    var tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}




function segundosParaMinutos(segundos) {
    var campoMinutos = Math.floor(segundos / 60);
    var campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }
    return campoMinutos + ':' + campoSegundos;
}

/* função de volume*/
function seek(e) {
    var percent = e.offsetX / this.offsetWidth;
    progressBar.value = percent * 100;
    console.log((percent * 100))
}

function atualizarVolume() {
    let barraaudio = document.querySelector('.barradevolume');
    barraaudio.style.width = vol + '%' ;

}
async function diminuirVolume() {
    if (volume <= 100 && volume > 0) {
        volume = volume - 10
        musica.volume = volume / 100
        


    }
}

async function aumentarVolume() {
    if (volume >= 0 && volume < 100) {
        volume = volume + 10
        musica.volume = volume / 100
        
    }
}
