const apiToken = 'ececda0ced4f48328c5110d5ecf2129b1e76545b';
const companydomain = 'redex';

window.addEventListener('message', function(event) {
    if (event.origin !== window.location.origin) {
        return;
    }

    const data = event.data;
    createPipedriveDeal(data);
});

function createPipedriveDeal(data) {
    const url = `https://${companydomain}.pipedrive.com/api/v1/deals?api_token=${apiToken}`;

    const dealData = {
        title: `${data.dealForm1.firstName} ${data.dealForm1.lastName}`,
        value: 0,
        currency: 'USD',
        user_id: getRandomInt(555),
        custom_fields: {
            phone: data.dealForm1.phone,
            email: data.dealForm1.email,
            jobType: data.dealForm2.jobType,
            jobSource: data.dealForm2.jobSource,
            jobDescription: data.dealForm2.jobDescription,
            Address: data.dealForm3.Address,
            City: data.dealForm3.City,
            State: data.dealForm3.State,
            zipCode: data.dealForm3.zipCode,
            Area: data.dealForm3.Area,
            startDate: data.dealForm4.startDate,
            startTime: data.dealForm4.startTime,
            endTime: data.dealForm4.endTime,
            test: data.dealForm4.test
        }
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dealData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Deal created successfully!');
            alert('Deal created successfully!');
        } else {
            console.error('Error creating deal:', data.error);
            alert('Error creating deal: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the deal.');
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}