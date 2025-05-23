import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import { useReducer, useRef, createContext } from 'react';

// ✅ 1. Context는 컴포넌트 밖에서 export해줘야 다른 파일에서 import 가능
export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// ✅ 2. Mock 데이터
const mockData = [
  {
    id: 1,
    createDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  }
];

// ✅ 3. reducer 함수
function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case "DELETE":
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // ✅ 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content
      }
    });
  };

  // ✅ 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content
      }
    });
  };

  // ✅ 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <div className="App">
          {/* 테스트용 버튼 (개발 끝나면 삭제해도 OK) */}
          <button onClick={() => {
            onCreate(new Date().getTime(), 3, "Hello");
          }}>일기 추가</button>

          <button onClick={() => {
            onUpdate(1, new Date().getTime(), 3, "수정된 일기입니다");
          }}>일기 수정</button>

          <button onClick={() => {
            onDelete(1);
          }}>일기 삭제</button>

          <div>
            <Link to="/">Home</Link>
            <Link to="/new">New</Link>
            <Link to="/detail">Detail</Link>
            <Link to="/edit">Edit</Link>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/*" element={<div>잘못된 페이지입니다</div>} />
          </Routes>
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
