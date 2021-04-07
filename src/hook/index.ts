import { useCallback, useMemo, useState } from 'react';
import Filter, { Condition } from 'handy-filter';

import { JOIN_FUNC_MAP } from './constants';
import { HookProps } from './types';

export default ({ init = [], options = {} }: HookProps) => {
  const [conditions, setConditions] = useState<{ [key: string]: Condition }>({});
  const [data, setData] = useState(init);

  const filteredData = useMemo(() => {
    const mergeFunc = JOIN_FUNC_MAP[options.join || 'and'];
    const condition = mergeFunc(...Object.values(conditions));

    return new Filter(condition).filter(data);
  }, [conditions, data, options.join]);

  const setCondition = useCallback((condition: Condition, key: string | number = '__default__') => {
    setConditions((prevState) => ({ ...prevState, [key]: condition }));
  }, []);

  return [filteredData, setCondition, setData] as const;
};
