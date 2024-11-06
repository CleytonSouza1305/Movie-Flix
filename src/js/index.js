const apiKey = '53c344e6ba791494d1b35ad0f623a6f7';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

const iframe = document.querySelector('iframe');

async function movePopulationMovie() {
  
  try {
    const data = await fetch(url).then((r) => r.json())

    if (data.results.length > 0) {
      const randomMovie = data.results[Math.floor(Math.random() * data.results.length)]

      const title = document.getElementById('movie-name')
      title.textContent = randomMovie.title

      const description = document.getElementById('description-movie')
      description.textContent = randomMovie.overview


      const movieId = randomMovie.id

      const video = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=pt-BR`).then((r) => r.json())

      const youTubeUrl = video.results[0]
      const key = youTubeUrl.key
      const link = `https://www.youtube.com/embed/${key}?autoplay=1&loop=1&controls=0&mute=1&modestbranding=1&rel=0&showinfo=0&fs=0&iv_load_policy=3&enablejsapi=1&vq=hd1080`;
      iframe.src = link

      console.log(title.textContent);
    }
   
    console.log(data);
  } catch (e) {
    console.log(`Erro ao executar código: ${e.message}`)
    console.error(e);
    
  }
}

movePopulationMovie()

