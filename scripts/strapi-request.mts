const { writeFileSync } = require('fs');
const qs = require('qs');

const fetchData = async () => {
    const url = 'http://localhost:1337/api/reviews?'
        + qs.stringify({
            fields: ['slug', 'title', 'subtitle', 'publishedAt'],
            populate: { image: { fields: ['url'] } },
            sort: ['publishedAt:desc'],
            pagination: { pageSize: 6 },
        }, { encodeVauesOnly: true });
    console.log(url);
    
    const response = await fetch(url);
    const body = await response.json();
    const formatted = JSON.stringify(body, null, 2);
    const file = 'scripts/strapi-response.json';
    writeFileSync(file, formatted, 'utf-8');
};

fetchData();
