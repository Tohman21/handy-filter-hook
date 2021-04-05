import { useCallback, useMemo, useState } from 'react';
import Filter, { Condition, CheckableValue } from 'handy-filter';

import { JOIN_FUNC_MAP } from './constants';
import { HookOptions } from './types';

export default (initData: CheckableValue[] = [], options: HookOptions = {}) => {
  const [conditions, setConditions] = useState<{ [key: string]: Condition }>({});
  const [data, setData] = useState(initData);

  const filteredData = useMemo(() => {
    const mergeFunc = JOIN_FUNC_MAP[options.join || 'and'];
    const condition = mergeFunc(...Object.values(conditions));

    return new Filter(condition).filter(data);
  }, [conditions, data, options.join]);

  const setCondition = useCallback((condition: Condition, key: string = '__default__') => {
    setConditions((prevState) => ({ ...prevState, [key]: condition }));
  }, []);

  return [filteredData, setCondition, setData] as const;
};
