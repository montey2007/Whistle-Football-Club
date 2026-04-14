const popupHTML = `
<div id="match-popup" class="popup-overlay">
  <div class="popup-content">
    <span class="close-btn" id="close-popup">&times;</span>

    <section class="next-match">
      <div class="container">
        <h2 class="section-title">Next Match</h2>
        <div class="match-card">
          <div class="team">
            <img id="next-left-logo" alt="">
            <span id="next-left-name"></span>
          </div>

          <div class="match-info">
            <p class="competition" id="next-competition"></p>
            <p class="match-vs">VS</p>
            <p class="kickoff" id="next-date"></p>
            <p class="countdown" id="countdown"></p>
            <p class="live-score" id="live-score"></p>
            <p class="stadium" id="next-venue"></p>
          </div>

          <div class="team">
            <img id="next-right-logo" alt="">
            <span id="next-right-name"></span>
          </div>
        </div>

        <a class="btn" href="fixtures.html">All Fixtures</a>
      </div>
    </section>
  </div>
</div>
`;

document.body.insertAdjacentHTML("beforeend", popupHTML);

// Show popup
if (!sessionStorage.getItem("popupShown")) {
  document.getElementById("match-popup").style.display = "flex";
  sessionStorage.setItem("popupShown", "true");
}

// Close button
document.getElementById("close-popup").onclick = function() {
  document.getElementById("match-popup").style.display = "none";
};
