document.addEventListener('DOMContentLoaded', function () {
    const rssUrl = 'https://vnexpress.net/rss/tin-moi-nhat.rss';

    fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                displayNews(data.items);
            } else {
                console.error('Error fetching the RSS feed:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching the RSS feed:', error);
        });

    function displayNews(items) {
        const newsFeed = document.getElementById('newsFeed');
        newsFeed.innerHTML = '';

        items.forEach(item => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';

            const title = document.createElement('h2');
            title.textContent = item.title;

            const link = document.createElement('a');
            link.href = item.link;
            link.target = '_blank';
            link.textContent = 'Read more';

            const description = document.createElement('p');
            description.innerHTML = item.description;

            newsItem.appendChild(title);
            newsItem.appendChild(description);
            newsItem.appendChild(link);

            newsFeed.appendChild(newsItem);
        });
    }
});