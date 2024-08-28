import { useState, useEffect, useRef } from 'react';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import Even from './components/Even';
import './App.css';

function App() {
  const [ count, setCount ] = useState(0);
  const [ text, setText ] = useState('');

  // 레퍼런스 변수 didMountRef를 만들고 초기값 지정
  const didMountRef = useRef(false);
  
  const handleSetCount = (value) => {
    setCount(count + value);
  }

  const handleSetText = (e) => {
    setText(e.target.value)
  }
  
  // 상태변수 count, text 값이 변경될 때 컴포넌트 업데이트 발생
  // 이때 useEffect를 이용해서 콜백함수 실행 : 상태변수가 변경될 때 콘솔에 출력
  useEffect(() => {
    console.log(`업데이트 ${text}, ${count}`);
  }, [count, text])

  // 두번째 인자인 의존성 배열이 기재되지 않았다면 
  // 컴포넌트가 렌더링(마운트 + 업데이트) 될 때마다 항상 실행
  // useEffect(() => {
  //   console.log('업데이트');
  // })
  
  // deps 값으로 빈 배열이 들어갈 경우
  // 마운트 시점에만 실행 가능
  useEffect(() => {
    console.log('마운트');
  }, [])

  // 언마운트 시점에 실행
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('깜빡');
    }, 1000)
    return () => {
      console.log('클린업');
      clearInterval(intervalId)
    }
  })
  
  // 컴포넌트가 마운트될 때 didMountRef가 false -> 이 때는 콘솔에 출력하지 않음
  // 컴포넌트가 업데이트될 때 didMountRef가 true -> 이 때는 콘솔에 출력함
  useEffect(() => {
    if (!didMountRef.current) { // didMountRef.current는 현재의 didMountRef 값. 고로 값이 true가 아니라면.
      // 마운트 시점에 실행
      didMountRef.current = true;
      return;
    } else {
      // 컴포넌트 마운트 후에 실행
      console.log('컴포넌트 업데이트');
    }
  })

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input type="text" style={{textAlign: 'center'}} value={text} onChange={handleSetText} />
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 && <Even />}
      </section>
      <section>
        <Controller handleSetCount={handleSetCount} />
      </section>
    </div>
  );
}

export default App;
