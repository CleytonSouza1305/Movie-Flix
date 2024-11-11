const apiKey = '53c344e6ba791494d1b35ad0f623a6f7';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

const iframe = document.querySelector('iframe');

async function morePopulationMovie() {
  
  try {
    const data = await fetch(url).then((r) => r.json())

    if (data.results.length > 0) {
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)]

      const title = document.getElementById('movie-name')
      title.textContent = randomMovie.title

      const description = document.getElementById('description-movie');
      const shortedDescription = randomMovie.overview.split(" ");

      if (shortedDescription.length > 30) {
        let descricao = ""; 
        for (let i = 0; i < 30; i++) {
          descricao += shortedDescription[i] + " ";
        }
        description.textContent = `${descricao.trim()}...`; 
      } else {
        description.textContent = randomMovie.overview;
      }
      
      const movieId = randomMovie.id

      const video = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=pt-BR`).then((r) => r.json())

      if (video.results.length > 0) {
        const youTubeUrl = video.results[0]
        const key = youTubeUrl.key
        const link = `https://www.youtube.com/embed/${key}?autoplay=1&loop=1&controls=0&mute=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&enablejsapi=1&vq=hd1080`;
        iframe.src = link;

        iframe.onload = function() {
          const player = new YT.Player(iframe, {
            events: {
              'onReady': function(event) {
                event.target.playVideo();
                event.target.unMute();    
              },
              'onStateChange': function(event) {
                if (event.data === YT.PlayerState.ENDED) {
                  event.target.seekTo(0);  
                  event.target.playVideo()
                }
              },
              'onError': function(event) {
                console.error('Erro no player:', event.data);  
              }
            }
          });
        } 
      } else {
        const background = document.querySelector('.bg-image')

        const id = video.id
        const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`).then((r) => r.json())

        const posterPath = movie.poster_path;
        const imageUrl = `https://image.tmdb.org/t/p/w300${posterPath}`;
        background.style.backgroundImage = `url(${imageUrl})`
        console.log(movie);
        
      }
    }
  } catch (e) {
    console.log(`Erro ao executar código: ${e.message}`)
    console.error(e);
  }
}


async function seeTopRated(page) {
  const topRated = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=${page}`)
    .then((r) => r.json());

  let randomMovie = [];
  const moviesArr = topRated.results;

  while (randomMovie.length < 10) { 
    const j = Math.floor(Math.random() * moviesArr.length);
    const movie = moviesArr[j]; 

    const exists = existMovie(randomMovie, movie.title);  

    if (!exists) {
      randomMovie.push(movie); 
    }
  }

  console.log(randomMovie);

  createContent('container-top-rated', randomMovie)
}

async function seeAnimatedMovie(page) {
  const animeMovies = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=pt-BR&page=${page}&with_genres=16`).then((r) => r.json())

  let randomMovie = [];
  const moviesArr = animeMovies.results;

  while (randomMovie.length < 10) { 
    const j = Math.floor(Math.random() * moviesArr.length);
    const movie = moviesArr[j]; 

    const exists = existMovie(randomMovie, movie.title);  

    if (!exists) {
      randomMovie.push(movie); 
    }
  }

  createContent('container-animation', randomMovie)
}

function existMovie(array, movieTitle) {
  return array.some((m) => m.title === movieTitle);  
}

function createContent(containerName, movieArr) {
  const content = document.querySelector(`.${containerName}`)
  movieArr.forEach((movie) => {

    const carroselContent = document.createElement('div')
    carroselContent.classList.add('carousel-item')
    carroselContent.id = movie.id

    const image = document.createElement('img')
    image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    image.classList.add('carrosel-movie')
    carroselContent.append(image)
    content.append(carroselContent)
  })

const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function moveCarousel() {
  let currentIndex = 0; 
  const itemWidth = carouselItems[0].offsetWidth + 15; 

  carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  if (currentIndex <= 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentIndex >= 6) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

prevButton.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--; 
    moveCarousel();
  }
});

nextButton.addEventListener('click', () => {
  if (currentIndex < carouselItems.length - 1) {
    currentIndex++; 
    moveCarousel();
  }
});

moveCarousel();
}

morePopulationMovie()
seeTopRated(1)
seeAnimatedMovie(1)

