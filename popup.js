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

  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const popup = document.getElementById("match-popup");
  const closeBtn = document.getElementById("close-popup");

  // LOAD FIXTURES
  fetch("/fixtures/fixtures.json")
    .then(res => res.json())
    .then(data => {

      // Find next upcoming match
      const now = new Date();

      const nextMatch = data.find(match => {
        const matchDate = new Date(match.date + "T" + match.time);
        return match.status === "upcoming" && matchDate >= now;
      });

      if (!nextMatch) return;

      // Fill content
      document.getElementById("next-left-name").textContent = nextMatch.home;
      document.getElementById("next-right-name").textContent = nextMatch.away;

      document.getElementById("next-competition").textContent = nextMatch.competition;

      document.getElementById("next-date").textContent =
        nextMatch.date + " - " + nextMatch.time;

      document.getElementById("next-venue").textContent = nextMatch.venue;

      // Images (IMPORTANT: use absolute path)
      document.getElementById("next-left-logo").src = "/images/" + nextMatch.homelogo;
      document.getElementById("next-right-logo").src = "/images/" + nextMatch.awaylogo;

      // Show popup once
      if (!sessionStorage.getItem("popupShown")) {
        popup.style.display = "flex";
        sessionStorage.setItem("popupShown", "true");
      }

    })
    .catch(err => console.error("Error loading fixtures:", err));

  // Close button
  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Click outside
  window.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });

  // ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      popup.style.display = "none";
    }
  });

});
