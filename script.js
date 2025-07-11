import { Octokit } from "https://esm.sh/@octokit/core";

const octokit = new Octokit();
const repoContainer = document.getElementById("repositories");

function addCard(repo) {
    const card = document.createElement("div");
    card.className = "card card--repo";
    card.innerHTML = `
    <a class="cardlink" href="${repo.html_url}" target="_blank"><span></span></a>
        <h3>${repo.name}</h3>
        <p>${repo.description}</p>
        `;
    repoContainer.appendChild(card);
}

function addDummyCards() {
    const dummyRepos = [
        {
            name: "Oops!",
            html_url: "#",
            description: "Can't fetch repositories from GitHub at the moment. Please visit my github profile, or try again later.",
        }
    ]

    dummyRepos.forEach((repo) => { addCard(repo) });
}

octokit.request(
    "GET /users/valthoron/repos",
    {
        headers: { "X-GitHub-Api-Version": "2022-11-28" }
    }
).then((response) => {
    const repositories = response.data.sort((a, b) => {
        return new Date(b.updated_at) - new Date(a.updated_at)
    });

    repositories.forEach((repo) => { addCard(repo); });
},
    (_) => {
        addDummyCards();
    }
);
