import { renderHook, act } from '@testing-library/react-hooks';
import { eq, gt, lt } from 'handy-filter';

import useFilter from '../index';
import * as fixtures from './lib/fixtures';

describe('useFilter tests', () => {
  let result: any;
  let setCondition: any;
  let setData: any;
  let fixture: any;

  beforeEach(() => {
    fixture = fixtures.DATA;
    ({ result } = renderHook(() => useFilter(fixture)));
    setCondition = result.current[1];
    setData = result.current[2];
  });

  describe('setData tests', () => {
    it('should set data as hook parameter', () => {
      expect(result.current[0]).toStrictEqual(fixture);
    });

    it('should change filtered data when setting new data', () => {
      const newData = [fixture[1], fixture[3]];

      act(() => {
        setData(newData);
      });

      expect(result.current[0]).toStrictEqual(newData);
    });

    it('should apply set filters to new data', () => {
      const newData = [fixture[4], fixture[4], fixture[3]];

      act(() => {
        setCondition(gt('num', 200));
        setData(newData);
      });

      expect(result.current[0]).toStrictEqual([fixture[4], fixture[4]]);
    });
  });

  describe('setCondition tests', () => {
    it('should change the filtered data when setting a new condition', () => {
      act(() => {
        setCondition(gt('num', 200));
      });

      expect(result.current[0]).toStrictEqual([fixture[4]]);

      act(() => {
        setCondition(gt('num', 100));
      });

      expect(result.current[0]).toStrictEqual([fixture[3], fixture[4]]);
    });

    it('should filter the data when different conditions are set with a key', () => {
      act(() => {
        setCondition(gt('num', 100), 'key1');
      });

      expect(result.current[0]).toStrictEqual([fixture[3], fixture[4]]);

      act(() => {
        setCondition(lt('num', 400), 'key2');
      });

      expect(result.current[0]).toStrictEqual([fixture[3]]);
    });

    it('should filter the data when changing only one condition which was set with a key', () => {
      act(() => {
        setCondition(gt('num', 100), 'key1');
        setCondition(gt('num', 200), 'key2');
      });

      expect(result.current[0]).toStrictEqual([fixture[4]]);

      act(() => {
        setCondition(gt('num', '__any__'), 'key2');
      });

      expect(result.current[0]).toStrictEqual([fixture[3], fixture[4]]);
    });
  });

  describe('options tests', () => {
    describe('join tests', () => {
      it('should join data with logical "and" by default', () => {
        act(() => {
          setCondition(gt('num', 100), 'key1');
        });

        expect(result.current[0]).toStrictEqual([fixture[3], fixture[4]]);

        act(() => {
          setCondition(lt('num', 400), 'key2');
        });

        expect(result.current[0]).toStrictEqual([fixture[3]]);
      });

      it('should join data with logical "and" when option is set to "and"', () => {
        ({ result } = renderHook(() => useFilter(fixture, { join: 'and' })));
        setCondition = result.current[1];

        act(() => {
          setCondition(gt('num', 100), 'key1');
        });

        expect(result.current[0]).toStrictEqual([fixture[3], fixture[4]]);

        act(() => {
          setCondition(lt('num', 400), 'key2');
        });

        expect(result.current[0]).toStrictEqual([fixture[3]]);
      });

      it('should join data with logical "or" when option is set to "or"', () => {
        ({ result } = renderHook(() => useFilter(fixture, { join: 'or' })));
        setCondition = result.current[1];

        act(() => {
          setCondition(gt('num', 200), 'key1');
        });

        expect(result.current[0]).toStrictEqual([fixture[4]]);

        act(() => {
          setCondition(eq('num', 1), 'key2');
        });

        expect(result.current[0]).toStrictEqual([fixture[0], fixture[4]]);
      });
    });
  });
});
