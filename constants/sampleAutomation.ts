import { Automation } from "./types";

export const SAMPLE_AUTOMATION: Automation[] = [
  {
    id: "1",
    title: "When the user feels sad 😢",
    steps: [
      {
        id: "auto_sad_1",
        shortcutId: "shortcut_1",
        shortcutName: "Play 🎶 My Upbeat Mix Playlist",
        order: 1,
      },
      {
        id: "auto_sad_2",
        shortcutId: "shortcut_2",
        shortcutName: "Send Message to 💬 Mom",
        order: 2,
      },
    ],
  },
  {
    id: "2",
    title: "When the user feels scared 😢",
    steps: [
      {
        id: "auto_scared_1",
        shortcutId: "shortcut_3",
        shortcutName: "Call Emergency Services",
        order: 1,
      },
      {
        id: "auto_scared_2",
        shortcutId: "shortcut_4",
        shortcutName: "Navigate to Doctor",
        order: 2,
      },
    ],
  },
];
