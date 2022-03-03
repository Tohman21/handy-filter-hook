import { CheckableValue } from 'handy-filter';

export interface HookOptions {
  join?: 'and' | 'or';
}

export interface HookProps<InitType extends CheckableValue> {
  init?: InitType[];
  options?: HookOptions
}
