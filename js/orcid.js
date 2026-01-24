const ORCID_ID = "0000-0002-9391-3858";
const ORCID_API = `https://pub.orcid.org/v3.0/${ORCID_ID}`;

fetch(ORCID_API, {
  headers: { "Accept": "application/json" }
})
.then(res => res.json())
.then(data => {

  // BIO
  const bio =
    data.person?.biography?.content ||
    "PhD researcher in deep learning and medical imaging.";
  document.getElementById("orcid-bio").innerText = bio;

  // PUBLICATIONS
  const works = data.activities-summary.works.group;
  const pubList = document.getElementById("pub-list");
  pubList.innerHTML = "";

  works.forEach(w => {
    const summary = w["work-summary"][0];
    const title = summary.title.title.value;
    const year = summary["publication-date"]?.year?.value || "—";

    const li = document.createElement("li");
    li.innerHTML = `<b>${title}</b> (${year})`;
    pubList.appendChild(li);
  });
})
.catch(() => {
  document.getElementById("orcid-bio").innerText =
    "Unable to load ORCID profile.";
});
