import { Category } from "./types";

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: "device",
    name: "Device Actions",
    image: require("@/assets/images/categories/device.jpg"),
    actions: [
      {
        id: "d1",
        name: "Call Number",
        icon: "phone.fill",
        gradientStart: "#B874E3",
        gradientEnd: "#65407D",
        inputs: [
          {
            name: "Phone Number",
          },
        ],
      },
      {
        id: "d2",
        name: "Send Message",
        icon: "message.fill",
        gradientStart: "#0EABEF",
        gradientEnd: "#086289",
        inputs: [
          {
            name: "Recipient",
          },
          {
            name: "Message",
          },
        ],
      },
      {
        id: "d3",
        name: "Open App",
        icon: "app.fill",
        gradientStart: "#53D769",
        gradientEnd: "#2F7A3B",
        inputs: [
          {
            name: "App Name",
          },
        ],
      },
      {
        id: "d4",
        name: "Set Brightness",
        icon: "sun.max.fill",
        gradientStart: "#FFCC00",
        gradientEnd: "#997A00",
        inputs: [
          {
            name: "Brightness Level",
            type: "slider",
            min: 0,
            max: 100,
            default: 50,
          },
        ],
      },
      {
        id: "d5",
        name: "Copy to Clipboard",
        icon: "doc.on.doc",
        gradientStart: "#FF3B30",
        gradientEnd: "#992420",
        inputs: [
          {
            name: "Text",
            type: "text",
            default: "",
          },
        ],
      },
    ],
  },
  {
    id: "connectivity",
    name: "Connectivity",
    image: require("@/assets/images/categories/connectivity.jpg"),
    actions: [
      {
        id: "c1",
        name: "Toggle WiFi",
        icon: "wifi",
        gradientStart: "#34AADC",
        gradientEnd: "#1F6583",
        inputs: [],
      },
      {
        id: "c2",
        name: "Toggle Bluetooth",
        icon: "antenna.radiowaves.left.and.right",
        gradientStart: "#007AFF",
        gradientEnd: "#004999",
        inputs: [],
      },
      {
        id: "c3",
        name: "Toggle Airplane Mode",
        icon: "airplane",
        gradientStart: "#FF9500",
        gradientEnd: "#995900",
        inputs: [],
      },
    ],
  },
  {
    id: "media",
    name: "Media",
    image: require("@/assets/images/categories/media.jpg"),
    actions: [
      {
        id: "m1",
        name: "Play Sound",
        icon: "speaker.wave.3.fill",
        gradientStart: "#AF52DE",
        gradientEnd: "#683286",
        inputs: [
          {
            name: "Sound File",
            type: "file",
            fileTypes: ["mp3", "wav"],
          },
        ],
      },
      {
        id: "m2",
        name: "Get Recent Photo",
        icon: "photo.fill",
        gradientStart: "#64D2FF",
        gradientEnd: "#3C7E99",
        inputs: [],
      },
      {
        id: "m3",
        name: "Record Audio",
        icon: "mic.fill",
        gradientStart: "#FF2D55",
        gradientEnd: "#991B33",
        inputs: [
          {
            name: "Duration (seconds)",
            type: "number",
            default: 10,
          },
        ],
      },
      {
        id: "m4",
        name: "Set Volume",
        icon: "speaker.wave.2.fill",
        gradientStart: "#FF9500",
        gradientEnd: "#995900",
        inputs: [
          {
            name: "Volume Level",
            type: "slider",
            min: 0,
            max: 100,
            default: 50,
          },
        ],
      },
    ],
  },
  {
    id: "location",
    name: "Location",
    image: require("@/assets/images/categories/location.jpg"),
    actions: [
      {
        id: "l1",
        name: "Get Current Location",
        icon: "location.fill",
        gradientStart: "#4CD964",
        gradientEnd: "#2E823C",
        inputs: [],
      },
      {
        id: "l2",
        name: "Open Maps",
        icon: "map.fill",
        gradientStart: "#FF3B30",
        gradientEnd: "#992420",
        inputs: [
          {
            name: "Location",
          },
        ],
      },
      {
        id: "l3",
        name: "Get Distance Between",
        icon: "arrow.triangle.swap",
        gradientStart: "#5AC8FA",
        gradientEnd: "#367896",
        inputs: [
          {
            name: "Start Location",
          },
          {
            name: "End Location",
          },
        ],
      },
      {
        id: "l4",
        name: "Get Weather",
        icon: "cloud.sun.fill",
        gradientStart: "#007AFF",
        gradientEnd: "#004999",
        inputs: [
          {
            name: "Location",
            default: "Current",
          },
        ],
      },
    ],
  },
  {
    id: "data",
    name: "Data",
    image: require("@/assets/images/categories/data.jpg"),
    actions: [
      {
        id: "da1",
        name: "Get Clipboard",
        icon: "doc.on.clipboard",
        gradientStart: "#8E8E93",
        gradientEnd: "#555558",
        inputs: [],
      },
      {
        id: "da2",
        name: "Set Clipboard",
        icon: "clipboard.fill",
        gradientStart: "#FF9500",
        gradientEnd: "#995900",
        inputs: [
          {
            name: "Text",
          },
        ],
      },
      {
        id: "da3",
        name: "Get Battery Level",
        icon: "battery.100",
        gradientStart: "#4CD964",
        gradientEnd: "#2E823C",
        inputs: [],
      },
      {
        id: "da4",
        name: "Generate QR Code",
        icon: "qrcode",
        gradientStart: "#5856D6",
        gradientEnd: "#353480",
        inputs: [
          {
            name: "Content",
          },
        ],
      },
    ],
  },
  {
    id: "ai",
    name: "AI Assistant",
    image: require("@/assets/images/categories/ai.jpg"),
    actions: [
      {
        id: "ai1",
        name: "Text Completion",
        icon: "text.bubble.fill",
        gradientStart: "#32D74B",
        gradientEnd: "#1E8A2D",
        inputs: [
          {
            name: "Prompt",
            type: "text",
            multiline: true,
          },
          {
            name: "Length",
            type: "select",
            options: ["Short", "Medium", "Long"],
          },
        ],
      },
      {
        id: "ai2",
        name: "Summarize Text",
        icon: "doc.text.magnifyingglass",
        gradientStart: "#0A84FF",
        gradientEnd: "#064F99",
        inputs: [
          {
            name: "Text",
            type: "text",
            multiline: true,
          },
        ],
      },
      {
        id: "ai3",
        name: "Image Description",
        icon: "photo.fill.on.rectangle.fill",
        gradientStart: "#BF5AF2",
        gradientEnd: "#733291",
        inputs: [
          {
            name: "Image",
            type: "file",
            fileTypes: ["jpg", "png", "heic"],
          },
        ],
      },
      {
        id: "ai4",
        name: "Sentiment Analysis",
        icon: "face.smiling",
        gradientStart: "#FF375F",
        gradientEnd: "#992139",
        inputs: [
          {
            name: "Text",
            type: "text",
            multiline: true,
          },
        ],
      },
      {
        id: "ai5",
        name: "Language Translation",
        icon: "globe",
        gradientStart: "#30B0C7",
        gradientEnd: "#1D6B77",
        inputs: [
          {
            name: "Text",
            type: "text",
            multiline: true,
          },
          {
            name: "Target Language",
            type: "select",
            options: [
              "English",
              "Spanish",
              "French",
              "German",
              "Japanese",
              "Chinese",
            ],
          },
        ],
      },
      {
        id: "ai6",
        name: "Voice Recognition",
        icon: "waveform",
        gradientStart: "#FF9F0A",
        gradientEnd: "#995F06",
        inputs: [
          {
            name: "Audio",
            type: "file",
            fileTypes: ["mp3", "wav", "m4a"],
          },
        ],
      },
    ],
  },
  {
    id: "web",
    name: "Web & Sharing",
    image: require("@/assets/images/categories/web.jpg"),
    actions: [
      {
        id: "w1",
        name: "Open URL",
        icon: "safari",
        gradientStart: "#FF2D55",
        gradientEnd: "#991B33",
        inputs: [
          {
            name: "URL",
          },
        ],
      },
      {
        id: "w2",
        name: "Fetch Web Content",
        icon: "arrow.down.doc",
        gradientStart: "#007AFF",
        gradientEnd: "#004999",
        inputs: [
          {
            name: "URL",
          },
        ],
      },
      {
        id: "w3",
        name: "Share via",
        icon: "square.and.arrow.up",
        gradientStart: "#5AC8FA",
        gradientEnd: "#367896",
        inputs: [
          {
            name: "Content",
          },
          {
            name: "App",
            type: "select",
            options: [
              "System Share",
              "Messages",
              "Mail",
              "Twitter",
              "Facebook",
            ],
          },
        ],
      },
      {
        id: "w4",
        name: "Post to Social Media",
        icon: "network",
        gradientStart: "#FF9500",
        gradientEnd: "#995900",
        inputs: [
          {
            name: "Platform",
            type: "select",
            options: ["Twitter", "Facebook", "Instagram"],
          },
          {
            name: "Content",
            type: "text",
            multiline: true,
          },
          {
            name: "Media (Optional)",
            type: "file",
            fileTypes: ["jpg", "png", "mp4"],
            required: false,
          },
        ],
      },
    ],
  },
];
