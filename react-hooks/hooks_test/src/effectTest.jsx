/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2023-02-06 21:17:11
 * @LastEdiTime: 
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: ybq
 * @Date: 2023-02-06 21:17:11
 * @LastEdiTime: 
 */
// useEffect 清除effect执行时机
import { useEffect, useState } from 'react';

const EffectTest = () => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        console.log('effect run!');
        return () => {
            // 重新渲染的时候，清除effect会先触发
            console.log('delete effect!')
        }
    })
    const add = () => {
        const now = counter;
        setCounter(now + 1);
    };
    return (
        <div>
            <h1>计数器{counter}</h1>
            <button onClick={() => add()}>加一</button>
        </div>
    )
}
export default EffectTest;
