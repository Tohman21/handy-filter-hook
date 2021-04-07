# Handy Filter Hook [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Tohman21/handy-filter-hook/blob/master/LICENSE)


## Overview
Handy Filter Hook is a react hook for [Handy Filter](https://github.com/Tohman21/js-handy-filter).

## Installation
npm:

    npm install handy-filter handy-filter-hook
    
yarn:

    yarn add handy-filter handy-filter-hook

### Peer Dependencies
Handy Filter Hook does not depend on the specific version of `react` or `handy-filter`. You only need to install them.
> **NOTE**: The minimum supported version of `handy-filter` is `1.0.9`

## Table of Contents  
* [Usage](#usage)
  * [With async data](#with-async-data)
  * [Multiple conditions](#multiple-conditions)
* [Hook options](#hook-options)
  * [join](#join)

<a name="usage"></a>
## Usage
Handy Filter Hook is fully compatible with [handy-filter conditions](https://github.com/Tohman21/js-handy-filter#conditions).

```jsx
import React from 'react';
import { eq } from 'handy-filter';
import useFilter from 'handy-filter-hook';

const MyComponent = (data) => {
  const [filteredData, setCondition] = useFilter({ init: data });
  
  const onChangeHandler = (newValue) => {
    setCondition(eq('nesded.someProp', newValue));
  };

  return <SomeComponent values={filteredData} onChange={onChangeHandler}/>;
};
```
<a name="with-async-data"></a>
### With async data
If you receive data asynchronously you can use the third function that is returned from 
useFilter to set the received data:
```jsx
import React, { useEffect } from 'react';
import { ne } from 'handy-filter';
import useFilter from 'handy-filter-hook';

const MyComponent = () => {
  const [filteredData, setCondition, setData] = useFilter();
  
  const onChangeHandler = (newValue) => {
    setCondition(ne('nesded.someProp', newValue));
  };

  useEffect(() => {
    const getData = async () => {
      const data = await myFetch();
      setData(data);
    };
  });

  return <SomeComponent values={filteredData} onChange={onChangeHandler}/>;
};
```

> **NOTE**: the setCondition and setData are stable and won’t change on re-renders.

<a name="multiple-conditions"></a>
### Multiple conditions
If you want to set multiple conditions, for example when you have more than one 
component that change your data, you need to use a key as the second parameter of setCondition:
```jsx
import React, { useEffect } from 'react';
import { icnt, eq } from 'handy-filter';
import useFilter from 'handy-filter-hook';

const MyComponent = (data) => {
  const [filteredData, setCondition] = useFilter({ init: data });
  
  const onChangeHandler = (newValue) => {
    setCondition(icnt('nesded.someProp', newValue), 'foo');
  };

  const onClickHandler = (newValue) => {
    setCondition(eq('prop', newValue), 'bar');
  };

  return (
    <>
      <Foo onChange={onChangeHandler}/>
      <Bar onClick={onClickHandler}/>
      <DataViewer data={filteredData}/>
    </>
  );
};
```
> The key can be any value you want, all you need is for the key to be unique within one component.

**By default**, conditions with different keys are joined with logical "and". If you want to change this 
behavior see [hook options](#hook-options).

<a name="hook-options"></a>
## Hook options
If you want to change the default hook behavior, you need to pass `options` object to useFilter:
```jsx
useFilter({ options: yourOptions })
```

<a name="join"></a>
### join
Sets how the conditions with different keys will be joined.

|Valid values|Default|
|:----------:|:-----:|
|   and, or  |  and  |

For example:
```jsx
import { gte, ne } from 'handy-filter';
import useFilter from 'handy-filter-hook';

const init = [
  { foo: 10, bar: null },
  { foo: 20, bar: true },
  { foo: 50, bar: null },
  { foo: 100, bar: false },
  { foo: 5, bar: true },
];

const [filteredData, setCondition] = useFilter({ init, options: { join: /* 'and' or 'or' */ } });

setCondition(gte('foo', 20), 'key1');
setCondition(ne('bar', null), 'key2');

// if the join option is 'and' result will be
// [{ foo: 20, bar: true }, { foo: 100, bar: false }]

// if the join option is 'or' result will be
// [{ foo: 20, bar: true }, { foo: 50, bar: null }, { foo: 100, bar: false }, { foo: 5, bar: true }] 
```
