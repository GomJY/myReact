# 6-2.setTimeout 여러 번 사용하기


# 비동기에서 발생하는 클로저 
```javascript
for(let i = 0; ... ) { ... }
```
ES5까지는 비동기에서 위와 같이 for문에 선언을 한경우에는 클로저 문제가 발생하였지만 ES6부터 위에 문제가 사라졌다.


# 앞으로 사라지는 라이프 사이클
- componentWillMount
- componentWillRecievveProps
- componentWillUpdate

대신 아래에 라이프 사이클 사용
```javascript
componentWillUnmount() { ... }
```
부모 컨포넌트가 자신을 삭제할때 발생