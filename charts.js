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
    const countsByGender = {
        Mand: {},
        Kvinde: {}
    };

    items.forEach(({ INSTITUTIONSAKT_BETEGNELSE, Køn }) => {
        if (Køn === 'Mand' || Køn === 'Kvinde') {
            countsByGender[Køn][INSTITUTIONSAKT_BETEGNELSE] =
                (countsByGender[Køn][INSTITUTIONSAKT_BETEGNELSE] || 0) + 1;
        }
    });

    const allInstitutions = new Set([
        ...Object.keys(countsByGender.Mand),
        ...Object.keys(countsByGender.Kvinde)
    ]);

    const labels = Array.from(allInstitutions);
    const mandData = labels.map(label => countsByGender.Mand[label] || 0);
    const kvindeData = labels.map(label => countsByGender.Kvinde[label] || 0);

    return {
        labels,
        mandData,
        kvindeData
    };
}

async function renderItApplicantsChart() {
    const applicants = await fetchItApplicants();
    if (!applicants || applicants.length === 0) {
        console.warn("No IT applicants data available");
        return;
    }
    const { labels, mandData, kvindeData } = tallyByInstitution(applicants);

    const ctx = document.querySelector('#chart').getContext('2d');
    new Chart(ctx, {
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
                x: {
                    stacked: false
                },
                y: {
                    stacked: false,
                    beginAtZero: true
                }
            }
        },
    });
}

renderItApplicantsChart();

