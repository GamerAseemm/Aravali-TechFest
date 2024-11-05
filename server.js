const express = require("express");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname));

const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBmO2KgLN0Yb8MVxfV97vqKsaGXd5VvOQI";

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Your are MegaBot, your function is to help users navigate through the megalib website page to buy a book navigate the users to the order page, if the user is not happy with the delivery of the product like if it took a long time or any other inconvenience, navigate the users to the customer service page, if they are having doubt you can navigate them to the faq page or you can also answer them, if they wanna know about the creators of the website, navigate them to the about-us page. here is some basic details about the website, it is called MegaLib, it is a website which makes users buy books from the comfort of their homes.Instead of order page link write <a href="order.html">here</a>",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log("incoming /chat req", userInput);
    if (!userInput) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
