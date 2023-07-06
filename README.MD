# Youtube Crawler

Tool crawl dữ liệu, thông tin của danh sách video trên Youtube dựa vào danh sách từ khóa thiết lập sẵn.

## Yêu cầu môi trường

- `NodeJS` version >= 12
- `yarn`
- Hệ điều hành hỗ trợ `Chromium` (để dùng như một headless browser)

## Cài đặt

- Clone repo này về máy

```bash
git clone https://github.com/ChuoiIT2/youtube-crawler
```

- Cài đặt các thư viện cần thiết

```bash
yarn install
```

## Chạy tool

### Tùy chỉnh query để crawl

Chỉnh sửa file `./data/list-query.json` theo syntax tương tự như file có sẵn:

```json
[
  "âm nhạc",
  "ca nhạc",
  "nhạc hot",
  "nhạc trẻ",
  "nhạc tiktok",
  "nhạc remix",
  "nhạc chill",
  "nhạc lofi",
  "nhạc rap",
  "nhạc hay 2023",
  "mv",
  "nhạc thiếu nhi",
  "nhạc trend",
  "nhạc tiếng anh",
  "nhạc học tập",
  "nhạc nhẹ nhàng",
  "nhạc quán cafe",
  "nhạc tập gym"
]
```

### Chỉnh sửa biến môi trường

Sửa file `.env` theo các biến môi trường cần thiết:

```bash
YOUTUBE_API_KEY=xxx
```

Thay `xxx` bằng API key của Youtube API. Cách lấy API key xem tại [đây](https://developers.google.com/youtube/v3/getting-started?hl=vi).

### Khởi chạy

Chạy command với shell:

```bash
yarn start
```

## Kết quả

### Kết quả danh sách id video

Danh sách id của các video đã được crawl lưu trong file `./data/ids-result.json` với định dạng tương tự như:

```json
["0nljmuN19DU", "dxrYz563OdY", "GZj8vOfutTA", "N6rS6lYZwTM"]
```

### Kết quả thông tin video

Danh sách id của các video đã được crawl lưu trong file `./data/details-result.json` với định dạng tương tự như:

```json
[
  {
    "id": "N6rS6lYZwTM",
    "title": "NHẠC EDM MIX TẬP GYM |#1| NHẠC TẬP GYM 2020 | ĐỘNG LỰC TẬP GYM",
    "description": "Đến Với Việt Hoàng Fitness Để Tìm Cảm Hứng...",
    "channelTitle": "Việt Hoàng Fitness",
    "categoryId": "22",
    "publishedAt": "2020-05-05T13:03:30Z",
    "duration": "PT39M16S",
    "definition": "hd",
    "caption": "false",
    "viewCount": "3147955",
    "likeCount": "15207",
    "commentCount": "475",
    "favoriteCount": "0",
    "topicCategories": [
      "https://en.wikipedia.org/wiki/Health",
      "https://en.wikipedia.org/wiki/Lifestyle_(sociology)",
      "https://en.wikipedia.org/wiki/Physical_fitness"
    ],
    "madeForKids": false,
    "privacyStatus": "public",
    "embeddable": true
  },
  {
    "id": "QhV1hEFKs3Q",
    "title": "Nhạc Tập Gym | Nhạc Tập Gym Cực Chất 2021 EDM CỰC MẠNH #79",
    "description": "#nhactapgym #nhạctậpgym #nhactaptheduc",
    "channelTitle": "Gymer Việt Nam",
    "categoryId": "22",
    "publishedAt": "2021-09-06T07:55:20Z",
    "duration": "PT1H28M31S",
    "definition": "sd",
    "caption": "false",
    "viewCount": "94097",
    "likeCount": "336",
    "commentCount": "4",
    "favoriteCount": "0",
    "topicCategories": [
      "https://en.wikipedia.org/wiki/Electronic_music",
      "https://en.wikipedia.org/wiki/Lifestyle_(sociology)",
      "https://en.wikipedia.org/wiki/Physical_fitness"
    ],
    "madeForKids": false,
    "privacyStatus": "public",
    "embeddable": true
  }
]
```

File lưu dưới dạng json với các key value có thể dễ dàng convert sang các định dạng khác như csv, excel hay store vào database.
