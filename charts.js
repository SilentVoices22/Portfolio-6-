async function fetchData(endpoint) {
    try {
        const res = await fetch(`http://localhost:8080${endpoint}`);
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error(`Could not fetch ${endpoint}:`, error);
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
    const applicants = await fetchData('/app/applicants/it-applicants');
    if (!applicants?.length) return;

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

async function renderSalaryChart() {
    const salaryData = await fetchData('/app/salary');
    if (!salaryData?.length) return;

    new Chart(document.querySelector('#salaryChart'), {
        type: 'line',
        data: {
            labels: salaryData.map(item => item.Kvartal),
            datasets: [
                {
                    label: 'Gennemsnitlig løn',
                    data: salaryData.map(item => parseFloat(item['Gennemsnitlig-løn'])),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                    fill: true
                }
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Gennemsnitlig-løn'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Kvartal'
                    }
                }
            }
        },
    });
}

renderItApplicantsChart();
renderSalaryChart();
