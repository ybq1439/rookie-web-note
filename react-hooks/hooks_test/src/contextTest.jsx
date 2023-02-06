import React, { useContext } from "react";

const info = {
    name: 'ybq',
    age: 21
}
const Context = React.createContext(info);//传递进去的是默认值，只有在没有找到上层Provider时，获取默认值
const Person = () => {
    const p = useContext(Context);
    return (
        <div>name:{p.name}-age:{p.age}</div>
    )
}
const ContextTest = () => {
    return (
        <div>
            <Context.Provider value={{ name: 'yyy', age: 22 }}>
                <Person></Person>
            </Context.Provider>
            <Person></Person>
        </div>

    )
};
export default ContextTest;