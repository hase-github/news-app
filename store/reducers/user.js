const initialState = {
  clips: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CLIP":
      return {
        ...state,
        clips: [...state.clips, action.clip],
        //古いstateに新しいclipを追加
      };
    case "DELETE_CLIP":
      return {
        ...state,
        clips: state.clips.filter((clip) => clip.url !== action.clip.url),
        //filterで条件に一致したものを除いた配列を返す＝＞新しいstateになる
      };
    default:
      return state;
  }
};

export default reducer;
