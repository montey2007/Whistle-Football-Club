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

  // Inject popup
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  const popup = document.getElementById("match-popup");
  const closeBtn = document.getElementById("close-popup");

  // Show popup (once per session)
  if (!sessionStorage.getItem("popupShown")) {
    popup.style.display = "flex";
    sessionStorage.setItem("popupShown", "true");
  }

  // Close button
  closeBtn.addEventListener("click", function () {
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
