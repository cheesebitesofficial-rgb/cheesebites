import fs from 'fs';
import https from 'https';
import http from 'http';

const links = [
  { name: 'crunch_sandwich', url: 'https://sl.bing.net/gZ86HVSc1Y' },
  { name: 'grill_sandwich', url: 'https://sl.bing.net/hYr2Gz1WZgq' },
  { name: 'bites_special_sandwich', url: 'https://sl.bing.net/cn3M9jpgSZw' }
];

async function followRedirect(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        resolve(res.headers.location);
      } else {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => resolve({ body, finalUrl: url }));
      }
    });
    req.on('error', reject);
  });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(dest);
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const item of links) {
    console.log(`Resolving ${item.name} (${item.url})...`);
    let target = item.url;
    // Follow up to 5 redirects
    for (let i = 0; i < 5; i++) {
      const res = await followRedirect(target);
      if (typeof res === 'string') {
        target = res;
      } else {
        target = res.finalUrl;
        break;
      }
    }
    console.log(`Final URL for ${item.name}: ${target}`);

    // Parse mediaurl or cdnurl
    const mediaurlMatch = target.match(/mediaurl=([^&"']+)/i);
    const cdnurlMatch = target.match(/cdnurl=([^&"']+)/i);

    let imgUrl = null;
    if (mediaurlMatch) {
      imgUrl = decodeURIComponent(mediaurlMatch[1]);
    } else if (cdnurlMatch) {
      imgUrl = decodeURIComponent(cdnurlMatch[1]);
    }

    console.log(`Extracted imgUrl: ${imgUrl}`);
    if (imgUrl) {
      const dest = `scripts/tmp_${item.name}.jpg`;
      console.log(`Downloading to ${dest}...`);
      await downloadFile(imgUrl, dest);
      console.log(`Saved ${dest}`);
    }
  }
}

run().catch(console.error);
