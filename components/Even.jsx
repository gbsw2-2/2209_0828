import { useEffect } from 'react';

const Even = () => {
  console.log('Even 컴포넌트 마운트');
  useEffect(() => {
    return () => {
      console.log('Even 컴포넌트 언마운트');
    }
  }, [])
  
  return (
    <div>현재 카운트는 짝수입니다.</div>
  )
}

export default Even;
