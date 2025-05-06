import { Automation } from "./types";

export const SAMPLE_AUTOMATION: Automation[] = [
  {
    id: "1",
    name: "When the user feels sad 😢",
    shortcuts: [
      {
        id: "auto_sad_1",
        name: "Play 🎶 My Upbeat Mix Playlist",
        description: "Automatically play upbeat music to improve mood",
        icon: "music.note",
        gradientStart: "#6C63FF",
        gradientEnd: "#574FCC",
        serviceName: "Automation",
        steps: [],
      },
      {
        id: "auto_sad_2",
        name: "Send Message to 💬 Mom",
        description: "Send a pre-written message to your mother",
        icon: "message.fill",
        gradientStart: "#88D8B0",
        gradientEnd: "#6FC49A",
        serviceName: "Automation",
        steps: [],
      },
    ],
  },
  {
    id: "2",
    name: "When the user feels scared 😢",
    shortcuts: [
      {
        id: "auto_scared_1",
        name: "Call Emergency Services",
        description: "Quickly dial emergency services for immediate help",
        icon: "phone.fill",
        gradientStart: "#FF6B6B",
        gradientEnd: "#FF8E8E",
        serviceName: "Automation",
        steps: [],
      },
      {
        id: "auto_scared_2",
        name: "Navigate to Doctor",
        description: "Get directions to the nearest medical facility",
        icon: "map.fill",
        gradientStart: "#FFD93D",
        gradientEnd: "#FFB302",
        serviceName: "Automation",
        steps: [],
      },
    ],
  },
];
