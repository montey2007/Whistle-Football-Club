function loadMatch(){
  const match = JSON.parse(localStorage.getItem("liveMatch")) || {
    home: "Whistle FC",
    away: "Stockport County",
    homeScore: 0,
    awayScore: 0,
    status: "not_started"
  };

  document.getElementById("home-name").innerText = match.home;
  document.getElementById("away-name").innerText = match.away;

  document.getElementById("score").innerText =
    `${match.homeScore} - ${match.awayScore}`;

  const status = document.getElementById("status");

  if(match.status === "live"){
    status.innerText = "🔴 LIVE";
    status.className = "countdown live";
  }

  if(match.status === "half"){
    status.innerText = "⏸ HALF TIME";
    status.className = "countdown finished";
  }

  if(match.status === "full"){
    status.innerText = "FULL TIME";
    status.className = "countdown finished";
  }
}

setInterval(loadMatch, 1000);
loadMatch();
