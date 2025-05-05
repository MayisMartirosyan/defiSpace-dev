let isLoading = false;

function isBottomOfPage() {
  const distanceToBottom = document.documentElement.offsetHeight - (window.scrollY + window.innerHeight);
  const threshold = 320;
  return distanceToBottom < threshold;
}

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

function buildUrlFromParams(params) {
  const baseUrl = window.location.pathname;
  const queryString = new URLSearchParams(params).toString();
  return `${baseUrl}?${queryString}`;
}

async function replaceUrlForRequest() {
  const total = Number(document.getElementById("all_posts_total").innerText);
  const alreadyLoaded = document.querySelectorAll(".news_project_div").length;

  const itemsList = document.getElementById('news_projects_items_div'); // 🎯 Only the container for posts
  const urlObj = getUrlParams();

  if (!urlObj.page) {
    urlObj.page = 2;
  } else if (total > alreadyLoaded) {
    urlObj.page = Number(urlObj.page) + 1;
  } else {
    return;
  }

  const url = buildUrlFromParams(urlObj);
  isLoading = true;
  history.pushState(null, '', url);

  try {
    const response = await fetch(url);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // Get new post groups (inside #news_projects_items_div)
    const newContent = doc.getElementById('news_projects_items_div');

    if (newContent) {
      itemsList.innerHTML = ''; // ❌ Clear existing content
      itemsList.innerHTML = newContent.innerHTML; // ✅ Replace with new content
    }

  } catch (error) {
    console.error('Failed to fetch more content:', error);
  } finally {
    isLoading = false;
  }
}

window.addEventListener('scroll', () => {
  const total = Number(document.getElementById("all_posts_total").innerText);
  const alreadyLoaded = document.querySelectorAll(".news_project_div").length;

  if (isBottomOfPage() && total > alreadyLoaded && !isLoading) {
    replaceUrlForRequest();
  }
});
