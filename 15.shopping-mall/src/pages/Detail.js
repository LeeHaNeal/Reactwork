import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Detail(props) {
  let { pindex } = useParams();
  let product = props.clothes[pindex];

  const [alert, setAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!product) {
    return <div>존재하지 않는 상품입니다.</div>
  }

  return (
    <div className='detail'>
      {
        alert && <div>3초 이내 구매시 30% 할인!</div>
      }
      <div className='detail_img'>
        <img src={`${process.env.PUBLIC_URL}/img/f${product.id}.png`} width="60%" />
      </div>
      <div className='detail_text'>
        <h4>{product.title}</h4>
        <p>{product.content}</p>
        <p>{product.price}원</p>
        <Button variant="outline-info">주문하기</Button>
      </div>
    </div>
  );
}

export default Detail;
