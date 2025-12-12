async function fetchSalary(){
    try{
        const res = await fetch("http://localhost:8080/app/salary");
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        console.log("Average salary" , data)
        return data;
        } catch (error) {
            console.error("Could not fetch", error);
        }
    }

async function fetchGenderWork(){
    try{
        const res = await fetch("http://localhost:8080/app/applicants/gender_work");
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        console.log("Gender work" , data)
        return data;
        } catch (error) {
            console.error("Could not fetch", error);
        }
    }

async function fetchItApplicants() {
    try {
        const res = await fetch('http://localhost:8080/app/applicants/it-applicants');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        console.log("IT applicants", data);
        return data;
    } catch (error) {
        console.error("Could not fetch IT applicants", error);
        return [];
    }
}

function tallyByInstitution(items) {
    const counts = { Mand: {}, Kvinde: {} };

    items.forEach(({ INSTITUTIONSAKT_BETEGNELSE, Køn }) => {
        if (!counts[Køn]) return;
        counts[Køn][INSTITUTIONSAKT_BETEGNELSE] = (counts[Køn][INSTITUTIONSAKT_BETEGNELSE] || 0) + 1;
    });

    const labels = [...new Set([...Object.keys(counts.Mand), ...Object.keys(counts.Kvinde)])];

    return {
        labels,
        mandData: labels.map(l => counts.Mand[l] || 0),
        kvindeData: labels.map(l => counts.Kvinde[l] || 0)
    };
}

async function renderItApplicantsChart() {
    const applicants = await fetchItApplicants();
    if (!applicants?.length) return console.warn("No IT applicants data available");

    const { labels, mandData, kvindeData } = tallyByInstitution(applicants);

    new Chart(document.querySelector('#chart'), {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Mand',
                    data: mandData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Kvinde',
                    data: kvindeData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        },
    });
}

renderItApplicantsChart();

