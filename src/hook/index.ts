import { useCallback, useMemo, useState } from 'react';
import Filter, { CheckableValue, Condition } from 'handy-filter';

import { JOIN_FUNC_MAP } from './constants';
import { HookProps } from './types';

export default <InitType extends CheckableValue>({ init, options = {} }: HookProps<InitType> = {}) => {
  const [conditions, setConditions] = useState<{ [key: string]: Condition }>({});
  const [data, setData] = useState(init);

  const filteredData = useMemo(() => {
    if (Array.isArray(data)) {
      const mergeFunc = JOIN_FUNC_MAP[options.join || 'and'];
      const condition = mergeFunc(...Object.values(conditions));

      return new Filter(condition).filter(data);
    }

    return data;
  }, [conditions, data, options.join]);

  const setCondition = useCallback((condition: Condition, key: string | number = '__default__') => {
    setConditions((prevState) => ({ ...prevState, [key]: condition }));
  }, []);

  return [filteredData, setCondition, setData] as const;
};
