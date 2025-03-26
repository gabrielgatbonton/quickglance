import { Category } from "./types";

export const SAMPLE_CATEGORIES: Category[] = [
  {
    id: "device",
    name: "Device Actions",
    image: require("@/assets/images/categories/device.jpg"),
    actions: [
      {
        id: "1",
        name: "Call Number",
        icon: "phone.fill",
        gradientStart: "#B874E3",
        gradientEnd: "#65407D",
        inputs: [
          {
            name: "Phone Number",
            type: "text",
          },
        ],
      },
      {
        id: "2",
        name: "Lock Phone",
        icon: "lock.app.dashed",
        gradientStart: "#19CCDF",
        gradientEnd: "#0E6F79",
      },
      {
        id: "3",
        name: "Open App",
        icon: "apps.iphone",
        gradientStart: "#E5BC09",
        gradientEnd: "#7F6805",
        inputs: [
          {
            name: "App Name",
            type: "text",
          },
        ],
      },
      {
        id: "4",
        name: "Send Message",
        icon: "message.fill",
        gradientStart: "#0EABEF",
        gradientEnd: "#086289",
        inputs: [
          {
            name: "Recipient",
            type: "text",
          },
          {
            name: "Message",
            type: "text",
          },
        ],
      },
      {
        id: "5",
        name: "Check Reminders",
        icon: "list.bullet",
        gradientStart: "#19CCDF",
        gradientEnd: "#0E6F79",
      },
      {
        id: "6",
        name: "Check Heart Rate",
        icon: "heart.text.clipboard.fill",
        gradientStart: "#37DF19",
        gradientEnd: "#1E790E",
      },
    ],
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    image: require("@/assets/images/categories/artificial-intelligence.jpg"),
    actions: [
      {
        id: "1",
        name: "Describe Surroundings",
        icon: "mountain.2.fill",
        gradientStart: "#37DF19",
        gradientEnd: "#1E790E",
      },
      {
        id: "2",
        name: "Translate Sign Language",
        icon: "camera.viewfinder",
        gradientStart: "#FF2D55",
        gradientEnd: "#991B33",
      },
      {
        id: "3",
        name: "Generate Visual Instructions",
        icon: "list.clipboard.fill",
        gradientStart: "#9571F0",
        gradientEnd: "#56418A",
      },
      {
        id: "4",
        name: "Predict Next Behavior",
        icon: "sparkles",
        gradientStart: "#0EABEF",
        gradientEnd: "#086289",
      },
      {
        id: "5",
        name: "Simplify Complex Text",
        icon: "text.quote",
        gradientStart: "#A2845E",
        gradientEnd: "#3C3123",
      },
      {
        id: "6",
        name: "Assist With Voice",
        icon: "waveform",
        gradientStart: "#FF9500",
        gradientEnd: "#995900",
      },
    ],
  },
  {
    id: "internet-of-things",
    name: "Internet-of-Things",
    image: require("@/assets/images/categories/internet-of-things.jpg"),
    actions: [
      {
        id: "7",
        name: "Control Smart Lights",
        icon: "lightbulb.fill",
        gradientStart: "#FFD60A",
        gradientEnd: "#B89500",
      },
      {
        id: "8",
        name: "Monitor Temperature",
        icon: "thermometer",
        gradientStart: "#FF3B30",
        gradientEnd: "#992320",
      },
      {
        id: "9",
        name: "Check Door Status",
        icon: "lock.square",
        gradientStart: "#32ADE6",
        gradientEnd: "#1D6589",
      },
      {
        id: "10",
        name: "View Security Cameras",
        icon: "camera.circle.fill",
        gradientStart: "#34C759",
        gradientEnd: "#1F7A35",
      },
      {
        id: "11",
        name: "Set Smart Timer",
        icon: "timer",
        gradientStart: "#AF52DE",
        gradientEnd: "#6A3286",
      },
      {
        id: "12",
        name: "Control AC Unit",
        icon: "snowflake",
        gradientStart: "#5856D6",
        gradientEnd: "#353481",
      },
    ],
  },
];
