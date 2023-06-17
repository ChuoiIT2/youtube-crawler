const { google } = require('googleapis');
const fs = require('fs/promises');
require('dotenv').config();

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY,
});

async function crawlDetails() {
  const listIds = JSON.parse(await fs.readFile(`./data/ids-result.json`));

  const result = [];
  for (let i = 0; i < listIds.length; i += 10) {
    const response = await youtube.videos.list({
      part: 'snippet,statistics,contentDetails,status,topicDetails',
      id: listIds.slice(i, i + 10).join(','),
      regionCode: 'VN',
    });
    const data = response.data.items.map((item) => {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        categoryId: item.snippet.category,
        tags: item.snippet.tags,
        defaultLanguage: item.snippet.defaultLanguage,
        defaultAudioLanguage: item.snippet.defaultAudioLanguage,
        publishedAt: item.snippet.publishedAt,

        duration: item.contentDetails.duration,
        definition: item.contentDetails.definition,
        caption: item.contentDetails.caption,
        dimensions: item.contentDetails.dimensions,

        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        dislikeCount: item.statistics.dislikeCount,
        commentCount: item.statistics.commentCount,
        favoriteCount: item.statistics.favoriteCount,

        topicCategories: item.topicDetails?.topicCategories || '',

        madeForKids: item.status.madeForKids,
        privacyStatus: item.status.privacyStatus,
        embeddable: item.status.embeddable,
      };
    });

    result.push(...data);
  }

  await fs.writeFile(
    `./data/details-result.json`,
    JSON.stringify(result),
    'utf-8'
  );
}

module.exports = crawlDetails;
