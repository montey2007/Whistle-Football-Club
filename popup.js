document.addEventListener("DOMContentLoaded", function () {

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
              <p class="stadium" id="next-venue"></p>
            </div>

            <div class="team">
              <img id="next-right-logo" alt="">
              <span id="next-right-name"></span>
            </div>
          </div>

          <a class="btn" href="/fixtures.html">All Fixtures</a>
        </div>
      </section>

    </div>
  </div>
  `;

  // Inject popup
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const popup = document.getElementById("match-popup");
  const closeBtn = document.getElementById("close-popup");

  // Close popup (X button)
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Close when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  // Close on ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      popup.style.display = "none";
    }
  });

  // LOAD FIXTURES
  fetch("/fixtures/fixtures.json")
    .then(res => res.json())
    .then(data => {

      const now = new Date();

      const nextMatch = data.find(match => {
        const matchDate = new Date(match.date + "T" + match.time);
        return match.status === "upcoming" && matchDate >= now;
      });

      if (!nextMatch) return;

      // TEXT
      document.getElementById("next-left-name").textContent = nextMatch.home;
      document.getElementById("next-right-name").textContent = nextMatch.away;
      document.getElementById("next-competition").textContent = nextMatch.competition;
      document.getElementById("next-date").textContent = `${nextMatch.date} - ${nextMatch.time}`;
      document.getElementById("next-venue").textContent = nextMatch.venue;

      // LOGOS (FIXED PATH)
      document.getElementById("next-left-logo").src =
        "images/logos/" + nextMatch.homelogo;

      document.getElementById("next-right-logo").src =
        "images/logos/" + nextMatch.awaylogo;

      // SHOW POPUP (only once per session)
      if (!sessionStorage.getItem("popupShown")) {
        popup.style.display = "flex";
        sessionStorage.setItem("popupShown", "true");
      }

    })
    .catch(err => console.error("Error loading fixtures:", err));

});
