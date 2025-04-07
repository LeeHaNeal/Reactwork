import React, { useState } from "react";  

function Counter() {
  const [count, setCount] = useState(0);  

  return (
    <div>
      <h2>카운트: {count}</h2>
      <button onClick={() => setCount(count + 1)}>증가</button>
      <button onClick={() => setCount(count - 1)}>감소</button>
    </div>
  );
}

export default Counter;
