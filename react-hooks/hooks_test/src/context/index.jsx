import React, { useState } from 'react';
import MyContext from './context';

const ContextPlay = () => {
    const [name, setName] = useState('ybq');
    return (
        <MyContext.Provider value={{ name, setName }}>
            <MyContext.Consumer>
                {
                    ({ name, setName }) =>
                    (
                        <div>
                            <h1>name:{name}</h1>
                            <button onClick={() => name === 'ybq' ? setName('yyy') : setName('ybq')}>修改名字</button>
                        </div>
                    )
                }

            </MyContext.Consumer>
        </MyContext.Provider>
    )
}
export default ContextPlay;