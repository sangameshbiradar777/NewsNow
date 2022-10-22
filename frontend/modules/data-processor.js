import {AUTHORCHARACHTERLIMIT, CONTENTCHARACTERLIMIT, MAXCHARACTERLIMIT} from "./config.js";

function processAuthor(data) {
  // If author is not null return limited author
  const { author } = data;
  if (author) {
    return getUniformText(author, AUTHORCHARACHTERLIMIT);
  }

  // If author is null return source
  const source = data.source.name;
  if (source) {
    return getUniformText(source, AUTHORCHARACHTERLIMIT);
  }

  // If no author and no source return 'unkonwn'
  return "unknown";
}

function processContent(data) {
  // If content is not null return limmited content
  const content = data.content;
  if (content) {
    return getUniformText(content, CONTENTCHARACTERLIMIT);
  }

  // If there is no content return description
  const description = data.description;
  if (description) {
    return getUniformText(description, CONTENTCHARACTERLIMIT);
  }

  // If there is no content and description 'no description'
  return "no description";
}

function processTitle(data) {
  // If title is not null return compressed title
  const title = data.title;
  if(title) {
    return compressText(title);
  }

  // If there is no title return compressed description
  if(data.description) {
    return processContent(data);
  }

  // If there is no description return compressed content
  if(data.content) {
    return processContent(data);
  }

  // Else return empty string
  return "";
}

function processURL(URL) {
  // If url is not empty return url
  if(URL) return URL;

  // If there is no URL return #
  return '#';
}

function processImageURL(imageURL) {
  // Create a new image
  const image = new Image()
  image.src = imageURL;

  return new Promise((resolve, reject) => {
    image.onload = () => resolve(true);
    image.onerror = () => reject(false);
  })
}

function compressText(text, amountOfChar = MAXCHARACTERLIMIT) {
  if (!text) return "";

  // Remove unwanted line breaks from the text
  const textWithoutLineBreaks = removeLineBreaks(text);

  // Remove unwanted spaces from text
  const trimmedText = removeExtraSpaces(textWithoutLineBreaks);

  return trimmedText.split("").length > amountOfChar
    ? trimmedText.split("").slice(0, amountOfChar).join("").trim().concat("...")
    : trimmedText;
}

function removeExtraSpaces(text) {
  if (!text) return "";

  return text.replace(/\s+/g, " ").trim();
}

function removeLineBreaks(text) {
  if (!text) return "";

  // The below line removes the white spaces from first regex
  // and removes any '[string]' from second regex.
  return text.replace(/[\n\r]/gm, "").replace(/\[[\s\S]*?\]/g, "");
}

function getUniformText(text, characterLimit) {
  // Limit the text to character limit
  const uniformText = compressText(
    text,
    characterLimit
  );

  return uniformText;
}

function processTime(date) {
  if(!date) return "";

  // Get current time
  const currentTime = new Date();
  const publishedTime = new Date(date);

  // Get the difference between current time and published time
  const timeDifference = Math.abs(currentTime - publishedTime);

  // Get seconds, minutes and hours
  const seconds = Math.floor(timeDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  // minutes could be above 60, so take module of it with 60
  minutes = minutes % 60;

  // Get formatted time
  const formattedTime = formatTime(hours, minutes);

  return formattedTime;
}

function formatTime(hours, minutes) {
  if(hours && minutes) {
    return `${hours}h ${minutes}min ago`;
  }

  if(hours) {
    return `${hours}h ago`;
  }

  if(minutes) {
    return `${minutes}min ago`;
  }

  return 'just now';
}

async function getProcessedData(rawData) {
  // Create object to store the processed data
  const processedData = [];

  // Loop over the raw data and process
  for(const data of rawData) {

    // Create object for each object
    const newData = {};

    // Process author
    newData.author = processAuthor(data);

    // Process content
    newData.content = processContent(data);

    // Process time
    newData.publishedAt = processTime(data.publishedAt);

    // Process title 
    newData.title = processTitle(data);

    // Process url
    newData.URL = processURL(data.url);

    // Process image
    try {
      const isWorkingURL = await processImageURL(data.urlToImage);

      if(isWorkingURL) newData.imageURL = data.urlToImage;
    }
    catch(error) {
      console.log(error);
      newData.imageURL = "";
    }

    // Push the news object to 
    processedData.push(newData);
  };

  // Return the processed data
  return processedData;
}


export {getProcessedData, compressText};
