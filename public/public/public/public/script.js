// Library 1: Swiper slider on home page
if (document.querySelector(".swiper")) {
  const swiper = new Swiper(".swiper", {
    pagination: {
      el: ".swiper-pagination"
    }
  });
}

// Fetch 1: get songs from database
function getSongs() {
  fetch("/api/songs")
    .then(function (response) {
      return response.json();
    })
    .then(function (songs) {
      const songBox = document.getElementById("songs");

      if (!songBox) {
        return;
      }

      songBox.innerHTML = "";

      for (let i = 0; i < songs.length; i++) {
        songBox.innerHTML +=
          "<div class='box'>" +
          "<h3>" + songs[i].title + "</h3>" +
          "<p>Artist: " + songs[i].artist + "</p>" +
          "<p>Genre: " + songs[i].genre + "</p>" +
          "</div>";
      }

      makeChart(songs);
    });
}

// Fetch 2: add song to database
function addSong() {
  const title = document.getElementById("title").value;
  const artist = document.getElementById("artist").value;
  const genre = document.getElementById("genre").value;

  fetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: title,
      artist: artist,
      genre: genre
    })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("message").innerHTML = "Song added.";
      getSongs();
    });
}

// Fetch 3: search external music API through backend
function searchMusic() {
  const searchText = document.getElementById("searchBox").value;

  fetch("/api/search?q=" + searchText)
    .then(function (response) {
      return response.json();
    })
    .then(function (results) {
      const resultsBox = document.getElementById("searchResults");

      resultsBox.innerHTML = "";

      for (let i = 0; i < results.length; i++) {
        resultsBox.innerHTML +=
          "<div class='box'>" +
          "<h3>" + results[i].trackName + "</h3>" +
          "<p>Artist: " + results[i].artistName + "</p>" +
          "<p>Album: " + results[i].collectionName + "</p>" +
          "</div>";
      }
    });
}

// Library 2: Chart.js genre chart
function makeChart(songs) {
  const chartArea = document.getElementById("genreChart");

  if (!chartArea) {
    return;
  }

  const genres = {};
  
  for (let i = 0; i < songs.length; i++) {
    const genre = songs[i].genre;

    if (genres[genre]) {
      genres[genre] = genres[genre] + 1;
    } else {
      genres[genre] = 1;
    }
  }

  new Chart(chartArea, {
    type: "bar",
    data: {
      labels: Object.keys(genres),
      datasets: [
        {
          label: "Number of Songs by Genre",
          data: Object.values(genres)
        }
      ]
    }
  });
}
