import * as FileSystem from "expo-file-system";
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
});

// Types for action inputs
type TextCompletionInputs = {
  prompt: string;
  length: "Short" | "Medium" | "Long";
};

type SummarizeTextInputs = {
  text: string;
};

type ImageDescriptionInputs = {
  image: string; // URI to the image file
};

type SentimentAnalysisInputs = {
  text: string;
};

type LanguageTranslationInputs = {
  text: string;
  targetLanguage: string;
};

type VoiceRecognitionInputs = {
  audio: string; // URI to the audio file
};

export const textCompletion = async (
  inputs?: TextCompletionInputs,
): Promise<{ completion: string }> => {
  if (!inputs?.prompt) {
    throw new Error("Prompt is required");
  }

  const { prompt, length } = inputs || {};

  try {
    // Map length to max tokens
    const maxTokens = {
      Short: 100,
      Medium: 250,
      Long: 500,
    }[length || "Medium"];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_completion_tokens: maxTokens,
    });

    return { completion: response.choices[0].message.content || "" };
  } catch (error: any) {
    throw new Error(`Failed to complete text: ${error.message}`);
  }
};

export const summarizeText = async (
  inputs?: SummarizeTextInputs,
): Promise<{ summary: string }> => {
  if (!inputs?.text) {
    throw new Error("Text is required");
  }

  const { text } = inputs || {};

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Summarize the following text concisely.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_completion_tokens: 150,
      temperature: 0.3,
    });

    return { summary: response.choices[0].message.content || "" };
  } catch (error: any) {
    throw new Error(`Failed to summarize text: ${error.message}`);
  }
};

export const imageDescription = async (
  inputs?: ImageDescriptionInputs,
): Promise<{ description: string }> => {
  if (!inputs?.image) {
    throw new Error("Image is required");
  }

  const { image } = inputs || {};

  try {
    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(image);
    if (!fileInfo.exists) {
      throw new Error("Image file not found");
    }

    // Read the file as base64
    const base64Content = await FileSystem.readAsStringAsync(image, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Describe this image in detail." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Content}`,
              },
            },
          ],
        },
      ],
      max_completion_tokens: 300,
    });

    return { description: response.choices[0].message.content || "" };
  } catch (error: any) {
    throw new Error(`Failed to describe image: ${error.message}`);
  }
};

export const sentimentAnalysis = async (
  inputs?: SentimentAnalysisInputs,
): Promise<{ sentiment: string; score: number }> => {
  if (!inputs?.text) {
    throw new Error("Text is required");
  }

  const { text } = inputs || {};

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Analyze the sentiment of the text. Respond with only one word: positive, negative, or neutral.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_completion_tokens: 10,
      temperature: 0.1,
    });

    const sentiment = (response.choices[0].message.content || "neutral")
      .toLowerCase()
      .trim();

    // Map sentiment to score
    let score = 0;
    if (sentiment.includes("positive")) score = 1;
    else if (sentiment.includes("negative")) score = -1;

    return { sentiment, score };
  } catch (error: any) {
    throw new Error(`Failed to analyze sentiment: ${error.message}`);
  }
};

export const languageTranslation = async (
  inputs?: LanguageTranslationInputs,
): Promise<{ translation: string }> => {
  if (!inputs?.text) {
    throw new Error("Text is required");
  }

  if (!inputs?.targetLanguage) {
    throw new Error("Target language is required");
  }

  const { text, targetLanguage } = inputs || {};

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Translate the following text to ${targetLanguage}. Only respond with the translation.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      max_completion_tokens: 500,
      temperature: 0.3,
    });

    return { translation: response.choices[0].message.content || "" };
  } catch (error: any) {
    throw new Error(`Failed to translate text: ${error.message}`);
  }
};

export const voiceRecognition = async (
  inputs?: VoiceRecognitionInputs,
): Promise<{ transcript: string }> => {
  if (!inputs?.audio) {
    throw new Error("Audio is required");
  }

  const { audio } = inputs || {};

  try {
    // Check if file exists
    const fileInfo = await FileSystem.getInfoAsync(audio);
    if (!fileInfo.exists) {
      throw new Error("Audio file not found");
    }

    // Use OpenAI's transcription endpoint
    const response = await openai.audio.transcriptions.create({
      file: await fetch(audio),
      model: "whisper-1",
    });

    return { transcript: response.text };
  } catch (error: any) {
    throw new Error(`Failed to recognize speech: ${error.message}`);
  }
};
