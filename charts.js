async function fetchSalary(){
    try{
        const res = await fetchSalary("http://localhost:8080/app/salary");
        const data = await res.json();
        console.log("Averrage salary" , data)
        return data;
        } catch (error) {
            console.error("Could not fetch", error);
        }
    }

async function fetchGenderWork(){
    try{
        const res = await fetchSalary("http://localhost:8080/app/applicants/gender_work");
        const data = await res.json();
        console.log("Gender work" , data)
        return data;
        } catch (error) {
            console.error("Could not fetch", error);
        }
    }




const ctx = document.querySelector('#chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            data: [12, 19, 3, 5, 2, 3],
        }]
    }
});

