const accessToken = "3796899bd37c423bad3a21a25277bce0"; // Keeping for any required authentication
const baseUrl = "/chat"; // Updated to the new API endpoint
const sessionId = "20150910";
const loader = `<span class='loader'><span class='loader__dot'></span><span class='loader__dot'></span><span class='loader__dot'></span></span>`;
const errorMessage = "Im not working";
const urlPattern =
  /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;

const $document = document;
const $chatbot = $document.querySelector(".chatbot");
const $chatbotMessageWindow = $document.querySelector(
  ".chatbot__message-window"
);
const $chatbotHeader = $document.querySelector(".chatbot__header");
const $chatbotMessages = $document.querySelector(".chatbot__messages");
const $chatbotInput = $document.querySelector(".chatbot__input");
const $chatbotSubmit = $document.querySelector(".chatbot__submit");

const botLoadingDelay = 1000;
const botReplyDelay = 2000;

document.addEventListener(
  "keypress",
  (event) => {
    if (event.which == 13) validateMessage();
  },
  false
);

$chatbotHeader.addEventListener(
  "click",
  () => {
    toggle($chatbot, "chatbot--closed");
    $chatbotInput.focus();
  },
  false
);

$chatbotSubmit.addEventListener(
  "click",
  () => {
    validateMessage();
  },
  false
);

const toggle = (element, klass) => {
  const classes = element.className.match(/\S+/g) || [],
    index = classes.indexOf(klass);
  index >= 0 ? classes.splice(index, 1) : classes.push(klass);
  element.className = classes.join(" ");
};

const userMessage = (content) => {
  $chatbotMessages.innerHTML += `<li class='is-user animation'>
    <p class='chatbot__message'>${content}</p>
    <span class='chatbot__arrow chatbot__arrow--right'></span>
  </li>`;
};

const aiMessage = (content, isLoading = false, delay = 0) => {
  setTimeout(() => {
    removeLoader();
    $chatbotMessages.innerHTML += `<li 
        class='is-ai animation' 
        id='${isLoading ? "is-loading" : ""}'>
          <div class="is-ai__profile-picture">
            <svg class="icon-avatar" viewBox="0 0 32 32">
              <use xlink:href="#avatar" />
            </svg>
          </div>
          <span class='chatbot__arrow chatbot__arrow--left'></span>
          <div class='chatbot__message'>${content}</div>
        </li>`;
    scrollDown();
  }, delay);
};

const removeLoader = () => {
  let loadingElem = document.getElementById("is-loading");
  if (loadingElem) $chatbotMessages.removeChild(loadingElem);
};

const showLoader = () => {
  let loadingElem = document.getElementById("is-loading");
  if (loadingElem) $chatbotMessages.appendChild(loadingElem);
};

const linkify = (inputText) => {
  return inputText.replace(urlPattern, `<a href='$1' target='_blank'>$1</a>`);
};

const validateMessage = () => {
  const text = $chatbotInput.value;
  const safeText = text ? text : "";
  if (safeText.length && safeText !== " ") {
    resetInputField();
    userMessage(safeText);
    send(safeText);
  }
  scrollDown();
  return;
};

const setResponse = (responseText, delay = 0) => {
  setTimeout(() => {
    aiMessage(responseText);
  }, delay);
};

const scrollDown = () => {
  const distanceToScroll =
    $chatbotMessageWindow.scrollHeight -
    ($chatbotMessages.lastChild.offsetHeight + 60);
  $chatbotMessageWindow.scrollTop = distanceToScroll;
  return false;
};

const send = async (text = "") => {
  showLoader();
  console.log("Sending message:", text);
  aiMessage(loader, true, botLoadingDelay);
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({ userInput: text }),
    });

    const data = await response.json();
    const botMessage = parseMarkdown(data.response);
    if (data.response) {
      removeLoader();
      $chatbotMessages.innerHTML += `<li 
    class='is-ai animation' >
      <div class="is-ai__profile-picture">
        <svg class="icon-avatar" viewBox="0 0 32 32">
          <use xlink:href="#avatar" />
        </svg>
      </div>
      <span class='chatbot__arrow chatbot__arrow--left'></span>
      <div class='chatbot__message'>${botMessage}</div>
    </li>`;
      scrollDown();
    }
  } catch (error) {
    console.error("Error:", error);
    setResponse(errorMessage, botLoadingDelay + botReplyDelay);
  } finally {
  }
};

const parseMarkdown = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/^\s*\*\s+(.*)$/gm, "<li>$1</li>")
    .replace(/(?:^|\n)([^\n]*)/g, "<p>$1</p>")
    .replace(/<\/li>\s*<p>/g, "</li>")
    .replace(/<\/p><p><li>/g, "<li>")
    .replace(/<\/li><\/p>/g, "</li>")
    .replace(/<\/p><p>/g, "</p><br><p>");
};

const resetInputField = () => {
  $chatbotInput.value = "";
};
