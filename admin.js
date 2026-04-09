function getMatch(){
  return JSON.parse(localStorage.getItem("liveMatch")) || {
    home: "Whistle FC",
    away: "Stockport County",
    homeScore: 0,
    awayScore: 0,
    status: "not_started"
  };
}

function saveMatch(match){
  localStorage.setItem("liveMatch", JSON.stringify(match));
}

/* MATCH CONTROL */
function startMatch(){
  const match = getMatch();
  match.status = "live";
  saveMatch(match);
}

function halfTime(){
  const match = getMatch();
  match.status = "half";
  saveMatch(match);
}

function fullTime(){
  const match = getMatch();
  match.status = "full";
  saveMatch(match);
}

/* GOALS */
function goal(team){
  const match = getMatch();

  if(team === "home") match.homeScore++;
  if(team === "away") match.awayScore++;

  saveMatch(match);
}

/* CARDS (optional log later) */
function card(type){
  alert(type.toUpperCase() + " CARD RECORDED (basic version)");
}
