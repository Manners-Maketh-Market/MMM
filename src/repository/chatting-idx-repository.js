const CHAT_IDX_KEY = "chat_idx_key";

const ChatProductIdxRepository = {
  setChatProductIdx(idx) {
    localStorage.setItem(CHAT_IDX_KEY, idx);
  },

  getChatProductIdx() {
    return localStorage.getItem(CHAT_IDX_KEY);
  },
};

export default ChatProductIdxRepository;
