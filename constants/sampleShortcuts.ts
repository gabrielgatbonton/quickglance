import { Shortcut } from "./types";

export const SAMPLE_SHORTCUTS: Shortcut[] = [
  {
    id: "1",
    name: "Call Emergency Services",
    description:
      "Quickly dial emergency services for immediate assistance in case of medical emergencies",
    icon: "cross.case.fill",
    gradientStart: "#FF2D55",
    gradientEnd: "#991B33",
    userName: "Mel Mathew Palana",
    steps: [
      {
        id: "1",
        actionId: "d1",
        inputs: {
          phoneNumber: "911",
          message: "Need immediate assistance!",
        },
      },
      {
        id: "2",
        actionId: "d2",
        inputs: {
          recipient: "Mom",
          message: "I need help!",
        },
      },
    ],
  },
  {
    id: "2",
    name: "Navigate to Doctor",
    description:
      "Get directions to the nearest doctor or medical facility in your area",
    icon: "stethoscope",
    gradientStart: "#19CCDF",
    gradientEnd: "#0E6F79",
    userName: "Sarah Johnson",
    steps: [
      {
        id: "3",
        actionId: "l1",
        inputs: {},
      },
      {
        id: "4",
        actionId: "l3",
        inputs: {
          startLocation: "Current location",
          endLocation: "Nearest hospital",
        },
      },
    ],
  },
  {
    id: "3",
    name: "Medication Reminder",
    description:
      "Set up reminders for taking medications on time and track your medication schedule",
    icon: "pills.fill",
    gradientStart: "#E5BC09",
    gradientEnd: "#7F6805",
    userName: "Robert Chen",
    steps: [
      {
        id: "5",
        actionId: "medication_reminder",
        inputs: {
          medicationName: "Aspirin",
          dosage: "500mg",
          time: "08:00 AM",
        },
      },
    ],
  },
  {
    id: "4",
    name: "Start voice-to-text message",
    description:
      "Convert your speech to text messages for easy communication when typing is difficult",
    icon: "microphone.fill",
    gradientStart: "#0EABEF",
    gradientEnd: "#086289",
    userName: "Emily Martinez",
    steps: [
      {
        id: "6",
        actionId: "voice_to_text_message",
        inputs: {
          message: "Hello, how are you?",
          recipient: "John Doe",
        },
      },
    ],
  },
  {
    id: "5",
    name: "Order Groceries/Essentials",
    description:
      "Quickly order essential items and groceries from nearby stores for home delivery",
    icon: "cart.fill",
    gradientStart: "#19CCDF",
    gradientEnd: "#0E6F79",
    userName: "James Wilson",
    steps: [
      {
        id: "7",
        actionId: "order_groceries",
        inputs: {
          items: ["Milk", "Bread", "Eggs"],
          deliveryAddress: "123 Main St, Cityville",
        },
      },
    ],
  },
  {
    id: "6",
    name: "Call for Transportation",
    description:
      "Request a ride or transportation service to help you get to your destination",
    icon: "car.fill",
    gradientStart: "#37DF19",
    gradientEnd: "#1E790E",
    userName: "Maria Garcia",
    steps: [
      {
        id: "8",
        actionId: "call_transportation",
        inputs: {
          pickupLocation: "Current location",
          destination: "Airport",
        },
      },
    ],
  },
];
