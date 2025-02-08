

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
   sender:string,
   message:string,
   time:string
}
interface Conversation {
  id: string;
  date: string;
  time: string;
  duration: string;
  owner: string;
  talkRatio: number;
  tags: string[];
  summary: string;
  chat: Chat[];
}

interface ConversationState {
  data: Conversation[];
  filteredData: Conversation[];
  searchQuery: string;
  filterType: string | null;
  filterTalkRatio: [number, number];
}
const dummyConversations: Conversation[] = [
  {
    id: "C-001",
    date: "2025-02-07",
    time: "10:30 ",
    duration: "15:23",
    owner: "Alice Johnson",
    talkRatio: 65,
    tags: ["Sales", "Marketing"],
    summary: "Discussed pricing and features of the product with the client.",
    chat: [
      {
        sender: "Employee",
        message: "Hello, how can I assist you today?",
        time: "10:30",
      },
      {
        sender: "Client",
        message: "I'd like to know more about the product pricing.",
        time: "10:32",
      },
      {
        sender: "Employee",
        message: "Sure! Let me explain the pricing and features.",
        time: "10:33 ",
      },
      {
        sender: "Client",
        message: "Great, I'd like to know about the discounts available.",
        time: "10:35 ",
      },
      {
        sender: "Employee",
        message: "We offer a 10% discount for bulk purchases.",
        time: "10:37 ",
      },
      {
        sender: "Client",
        message: "Great, I'd like to know about the discounts available.",
        time: "10:35 ",
      },
      {
        sender: "Employee",
        message: "We offer a 10% discount for bulk purchases.",
        time: "10:37 ",
      },
      {
        sender: "Client",
        message: "Great, I'd like to know about the discounts available.",
        time: "10:35 ",
      },
      {
        sender: "Employee",
        message: "We offer a 10% discount for bulk purchases.",
        time: "10:37 ",
      },
      {
        sender: "Client",
        message: "Great, I'd like to know about the discounts available.",
        time: "10:35 ",
      },
      {
        sender: "Employee",
        message: "We offer a 10% discount for bulk purchases.",
        time: "10:37 ",
      },
    ],
  },
  {
    id: "C-002",
    date: "2025-02-07",
    time: "11:15 ",
    duration: "08:45",
    owner: "Bob Smith",
    talkRatio: 45,
    tags: ["Marketing", "Sales"],
    summary: "Explored potential ad campaign strategies for the new launch.",
    chat: [
      {
        sender: "Employee",
        message: "Hey, let's talk about the new campaign strategy.",
        time: "11:15 ",
      },
      {
        sender: "Client",
        message: "What do you suggest for the launch?",
        time: "11:17 ",
      },
      {
        sender: "Employee",
        message: "I think targeting social media is a great strategy.",
        time: "11:18 ",
      },
      {
        sender: "Client",
        message: "What kind of content should we use?",
        time: "11:20 ",
      },
      {
        sender: "Employee",
        message:
          "We can use video ads, customer testimonials, and influencer content.",
        time: "11:22 ",
      },
    ],
  },
  {
    id: "C-003",
    date: "2025-02-07",
    time: "12  ",
    duration: "22:10",
    owner: "Charlie Davis",
    talkRatio: 78,
    tags: ["Sales", "Admin"],
    summary: "Negotiated contract terms and discussed bulk purchase options.",
    chat: [
      {
        sender: "Employee",
        message: "We can offer you a discount for bulk purchases.",
        time: "12  ",
      },
      {
        sender: "Client",
        message: "Sounds good, what terms are you proposing?",
        time: "12:03 ",
      },
      {
        sender: "Employee",
        message: "Here are the terms: 10% off for orders above 500 units.",
        time: "12:05 ",
      },
      {
        sender: "Client",
        message: "Can we get an additional discount if we order more?",
        time: "12:08 ",
      },
      {
        sender: "Employee",
        message: "Yes, we can offer an additional 5% discount for 1000+ units.",
        time: "12:10 ",
      },
    ],
  },
  {
    id: "C-004",
    date: "2025-02-07",
    time: "13:45 ",
    duration: "30:05",
    owner: "Diana Roberts",
    talkRatio: 55,
    tags: ["Marketing", "Admin"],
    summary: "Brainstormed influencer marketing strategies with the team.",
    chat: [
      {
        sender: "Employee",
        message: "We need to work on influencer strategies for the campaign.",
        time: "13:45 ",
      },
      {
        sender: "Client",
        message: "Do we have a list of potential influencers?",
        time: "13:47 ",
      },
      {
        sender: "Employee",
        message: "Yes, we have a list of influencers who align with our brand.",
        time: "13:49 ",
      },
      {
        sender: "Client",
        message: "Can we select a few based on their engagement rates?",
        time: "13:51 ",
      },
      {
        sender: "Employee",
        message: "I'll send you the list, and we can decide together.",
        time: "13:54 ",
      },
    ],
  },
  {
    id: "C-005",
    date: "2025-02-07",
    time: "14:20 ",
    duration: "12:30",
    owner: "Edward Carter",
    talkRatio: 35,
    tags: ["Sales", "Admin"],
    summary: "Provided a demo of the product and answered client queries.",
    chat: [
      {
        sender: "Employee",
        message: "Let me show you a quick demo of the product.",
        time: "14:20 ",
      },
      {
        sender: "Client",
        message: "I would like to see how it integrates with other systems.",
        time: "14:22 ",
      },
      {
        sender: "Employee",
        message: "Sure, I’ll show you the integration process.",
        time: "14:24 ",
      },
    ],
  },
  {
    id: "C-006",
    date: "2025-02-07",
    time: "15  ",
    duration: "18:40",
    owner: "Fiona Green",
    talkRatio: 85,
    tags: ["Marketing", "Sales"],
    summary: "Discussed social media engagement metrics with the client.",
    chat: [
      {
        sender: "Employee",
        message: "Let’s review the social media metrics from last month.",
        time: "15  ",
      },
      {
        sender: "Client",
        message: "How did the campaign perform on Instagram?",
        time: "15:02 ",
      },
      {
        sender: "Employee",
        message: "Instagram had a 25% increase in engagement.",
        time: "15:04 ",
      },
      {
        sender: "Client",
        message: "That's great! What can we improve?",
        time: "15:06 ",
      },
      {
        sender: "Employee",
        message: "We can increase our ad spend and improve targeting.",
        time: "15:08 ",
      },
    ],
  },
  {
    id: "C-007",
    date: "2025-02-07",
    time: "15:45 ",
    duration: "09:55",
    owner: "George White",
    talkRatio: 50,
    tags: ["Sales", "Admin"],
    summary: "Followed up on a previous proposal and addressed concerns.",
    chat: [
      {
        sender: "Employee",
        message: "I’m following up on the proposal we sent last week.",
        time: "15:45 ",
      },
      {
        sender: "Client",
        message: "I’ve reviewed it, but I have a few concerns.",
        time: "15:47 ",
      },
      {
        sender: "Employee",
        message: "Let me address them for you. What’s the first concern?",
        time: "15:50 ",
      },
    ],
  },
  {
    id: "C-008",
    date: "2025-02-07",
    time: "16:30 ",
    duration: "25:15",
    owner: "Hannah Lee",
    talkRatio: 60,
    tags: ["Marketing", "Sales"],
    summary: "Analyzed recent campaign performance and suggested improvements.",
    chat: [
      {
        sender: "Employee",
        message: "Let's analyze the recent campaign performance.",
        time: "16:30 ",
      },
      {
        sender: "Client",
        message: "How are the conversions looking?",
        time: "16:32 ",
      },
      {
        sender: "Employee",
        message:
          "The conversion rate is good, but we could optimize our landing pages.",
        time: "16:34 ",
      },
      { sender: "Client", message: "What do you suggest?", time: "16:36 " },
      {
        sender: "Employee",
        message: "We could A/B test different designs to improve engagement.",
        time: "16:38 ",
      },
    ],
  },
  {
    id: "C-009",
    date: "2025-02-07",
    time: "17:10 ",
    duration: "14:50",
    owner: "Ian Brown",
    talkRatio: 70,
    tags: ["Sales", "Admin"],
    summary: "Closed a deal with a new enterprise customer.",
    chat: [
      {
        sender: "Employee",
        message: "We’re excited to work with you and your company!",
        time: "17:10 ",
      },
      {
        sender: "Client",
        message: "We’re excited to partner with you as well.",
        time: "17:12 ",
      },
      {
        sender: "Employee",
        message: "Let’s finalize the contract and get started.",
        time: "17:15 ",
      },
    ],
  },
  {
    id: "C-010",
    date: "2025-02-07",
    time: "17:55 ",
    duration: "19:30",
    owner: "Jessica Adams",
    talkRatio: 40,
    tags: ["Marketing", "Sales"],
    summary:
      "Worked on refining email marketing content for better conversion.",
    chat: [
      {
        sender: "Employee",
        message: "Let’s go over the email content and make improvements.",
        time: "17:55 ",
      },
      {
        sender: "Client",
        message: "The subject line isn’t engaging enough.",
        time: "17:57 ",
      },
      {
        sender: "Employee",
        message:
          "We can try something more personal, like ‘Exclusive Offer Just for You’.",
        time: "17:59 ",
      },
      {
        sender: "Client",
        message: "I like that, let's test it.",
        time: "18:01 ",
      },
    ],
  },
];



const initialState: ConversationState = {
  data: dummyConversations,
  filteredData: dummyConversations,
  searchQuery: "",
  filterType: null,
  filterTalkRatio: [0, 100],
};





const conversationSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
 
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload.toLocaleLowerCase();

      state.filteredData = state.data.filter(
        (conv) =>
          conv.id.toLocaleLowerCase().includes(state.searchQuery) ||
          conv.owner.toLowerCase().includes(state.searchQuery)
      );
    },
    setFilterType: (state, action: PayloadAction<string | null>) => {
        if (!action.payload || action.payload === "All") {
          
          state.filteredData = [...state.data];
        } else {
         
          state.filteredData = state.data.filter((conv) =>
            conv.tags.includes(action.payload as string)
          );
        }
        state.filterType = action.payload;
    },
    setTalkRatioRange: (state, action: PayloadAction<[number, number]>) => {
      state.filterTalkRatio = action.payload;
      state.filteredData = state.data.filter(
        (conv) =>
          conv.talkRatio >= action.payload[0] &&
          conv.talkRatio <= action.payload[1]
      );
    },
    resetFilters: (state) => {
      state.searchQuery = "";
      state.filterType = null;
      state.filterTalkRatio = [0, 100];
      state.filteredData = state.data;
     
    },
  },
});



export const {
  setSearchQuery,
  setFilterType,
  setTalkRatioRange,
  resetFilters,
} = conversationSlice.actions;

export default conversationSlice.reducer