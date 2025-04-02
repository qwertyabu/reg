document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("name-input");
    const button = document.getElementById("submit-button");
    const result = document.getElementById("result");

    button.addEventListener("click", async () => {
        const name = input.value.trim();
        if (!name) return;

        result.textContent = "Loading...";
        try {
            const { country } = await (await fetch(`https://api.nationalize.io/?name=${name}`)).json();
            result.innerHTML = country.length
                ? `<ul>${country.map(({ country_id, probability }) => 
                    `<li><img src="https://flagcdn.com/w80/${country_id.toLowerCase()}.png" width="30"> ${country_id} (${(probability * 100).toFixed(2)}%)</li>`).join('')}</ul>`
                : "No nationality data found.";
        } catch {
            result.textContent = "Error fetching data.";
        }
    });
});
