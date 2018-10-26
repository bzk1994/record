## prototype

> 将方法挂载到 lodash 的 prototype 对象上。

```js
// Add chain sequence methods to the `lodash` wrapper.
lodash.prototype.at = wrapperAt;
lodash.prototype.chain = wrapperChain;
lodash.prototype.commit = wrapperCommit;
lodash.prototype.next = wrapperNext;
lodash.prototype.plant = wrapperPlant;
lodash.prototype.reverse = wrapperReverse;
lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
```