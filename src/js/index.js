const apiKey = '53c344e6ba791494d1b35ad0f623a6f7';
const movieId = '299536'; // Substitua pelo ID real do filme que você quer
const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=pt-BR`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    // Exibe os vídeos (trailers) do filme
    console.log(data);
    if (data.results && data.results.length > 0) {
      data.results.forEach(video => {
        console.log(`Título do vídeo: ${video.name}`);
        console.log(`URL do trailer: https://www.youtube.com/watch?v=${video.key}`);
      });
    } else {
      console.log('Nenhum vídeo encontrado para este filme.');
    }
  })
  .catch(error => console.error('Erro ao buscar vídeos:', error));
